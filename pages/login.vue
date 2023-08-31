<script lang="ts" setup>
import { useProfileStore } from "store/profile";
import { z } from "zod";

definePageMeta({
  title: "Login",
  description: "Login to your account",
  middleware: ["auth"],
});

const form = ref();
const state = ref({
  email: "",
  password: "",
  confirmPassword: "",
});

const { auth } = useSupabaseClient();
const profileStore = useProfileStore();
async function emailAuth() {
  await form.value!.validate();
  const res = await auth.signInWithPassword({
    email: state.value.email,
    password: state.value.password,
  });
  if (!res.error) {
    profileStore.fetchProfile();
    navigateTo("/");
  }
}
async function gitHubAuth() {
  const res = await auth.signInWithOAuth({
    provider: "github",
    options: {
      redirectTo: "http://localhost:3000/login",
    },
  });
  if (!res.error) {
    profileStore.fetchProfile();
    navigateTo("/");
  }
}
</script>

<template>
  <div class="h-screen w-full bg-white/75 dark:bg-gray-900/75">
    <UContainer class="flex h-full items-center justify-center"
      ><UCard
        class="flex h-full w-full shadow-none ring-0 sm:h-auto sm:w-1/3"
        :ui="{
          background: 'bg-transparent sm:bg-white sm:dark:bg-gray-900',
          ring: 'ring-0 sm:ring-1 ring-gray-200 dark:ring-gray-800',
          body: {
            base: 'w-full h-full',
          },
        }"
        ><div class="flex h-full w-full flex-col items-center justify-center">
          <h1 class="text-4xl font-bold tracking-tighter">Login</h1>
          <UForm
            ref="form"
            :schema="
              z.object({
                email: z.string().email({ message: 'Invalid email' }),
                password: z
                  .string()
                  .min(1, { message: 'Please provide a password to login' }),
              })
            "
            :state="state"
            class="mt-8 flex w-full flex-col items-center justify-center space-y-8"
            @submit.prevent="emailAuth()"
          >
            <UFormGroup
              :ui="{
                wrapper: 'w-full',
              }"
              label="Email"
              name="email"
              required
              ><UInput
                v-model="state.email"
                placeholder="E-Mail"
                size="xl"
                :ui="{
                  wrapper: 'w-full',
                }"
              ></UInput></UFormGroup
            ><UFormGroup
              :ui="{
                wrapper: 'w-full',
              }"
              label="Password"
              name="password"
              required
              ><UInput
                v-model="state.password"
                placeholder="Password"
                hidden
                type="password"
                size="xl"
                :ui="{
                  wrapper: 'w-full',
                }"
              ></UInput
            ></UFormGroup>
            <UButton type="submit" block>Login</UButton>
          </UForm>
          <UDivider class="mt-4"><template #icon>or</template></UDivider>
          <UButton
            class="mt-4 h-12"
            leading-icon="i-mdi-github"
            variant="solid"
            color="gray"
            block
            @click="gitHubAuth()"
            >Sign in with Github</UButton
          >
        </div></UCard
      ></UContainer
    >
  </div>
</template>

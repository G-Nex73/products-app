<script lang="ts" setup>
import { useProfileStore } from "store/profile";
import { z } from "zod";

definePageMeta({
  title: "Register",
  description: "Register a new account",
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
  const res = await auth.signUp({
    email: state.value.email,
    password: state.value.password,
    options: {
      emailRedirectTo: "http://localhost:3000/me",
    },
  });
  if (!res.error) {
    profileStore.fetchProfile();
  }
}
async function gitHubAuth() {
  const res = await auth.signInWithOAuth({
    provider: "github",
    options: {
      redirectTo: "http://localhost:3000/me",
    },
  });
  if (!res.error) {
    profileStore.fetchProfile();
  }
}
</script>

<template>
  <div class="h-screen w-full bg-white/75 dark:bg-gray-900/75">
    <UContainer class="flex h-full items-center justify-center"
      ><UCard
        class="flex h-full w-full shadow-none ring-0 sm:h-auto sm:w-2/5"
        :ui="{
          background: 'bg-transparent sm:bg-white sm:dark:bg-gray-900',
          ring: 'ring-0 sm:ring-1 ring-gray-200 dark:ring-gray-800',
          body: {
            base: 'w-full h-full',
          },
        }"
        ><div class="flex h-full w-full flex-col items-center justify-center">
          <h1 class="text-4xl font-bold tracking-tighter">Register</h1>
          <UForm
            ref="form"
            class="mt-8 flex w-full flex-col items-center justify-center space-y-8"
            :state="state"
            :schema="
              z.object({
                email: z.string().email({ message: 'Invalid email' }),
                password: z.string().min(8, {
                  message: 'Password must be at least 8 characters long',
                }),
                confirmPassword: z.literal(state.password, {
                  errorMap: () => ({ message: 'Passwords do not match' }),
                }),
              })
            "
            @submit.prevent="emailAuth()"
            ><UFormGroup
              label="Email"
              name="email"
              :ui="{
                wrapper: 'w-full',
              }"
            >
              <UInput
                v-model="state.email"
                placeholder="E-Mail"
                size="xl"
                :ui="{
                  wrapper: 'w-full',
                }"
              ></UInput></UFormGroup
            ><UFormGroup
              label="Password"
              name="password"
              :ui="{
                wrapper: 'w-full',
              }"
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
            <UFormGroup
              label="Confirm Password"
              name="confirmPassword"
              :ui="{
                wrapper: 'w-full',
              }"
              ><UInput
                v-model="state.confirmPassword"
                placeholder="Confirm Password"
                type="password"
                size="xl"
                :ui="{
                  wrapper: 'w-full',
                }"
              ></UInput
            ></UFormGroup>
            <UButton type="submit" block>Register</UButton>
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

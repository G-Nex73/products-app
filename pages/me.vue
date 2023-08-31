<script lang="ts" setup>
import { FormError } from "@nuxthq/ui/dist/runtime/types/form";
import { useProfileStore } from "store/profile";
definePageMeta({ middleware: ["auth"] });

const client = useSupabaseClient();
const profileStore = useProfileStore();
const profile = profileStore.profile;

const form = ref();
const state = ref({
  name: profile?.name ?? "",
  username: profile?.user_name ?? "",
});

async function validate(s: typeof state.value): Promise<FormError[]> {
  const errors: FormError[] = [];

  if (!s.name) errors.push({ path: "name", message: "Required" });
  if (!s.username) errors.push({ path: "username", message: "Required" });

  const { data: uniqueUsername } = await client
    .from("profiles")
    .select("user_name")
    .eq("user_name", s.username);

  if (uniqueUsername?.length)
    errors.push({
      path: "username",
      message: "This username is not available",
    });
  return errors;
}

async function submit() {
  await form.value!.validate();
  profileStore.setProfile({
    name: state.value.name,
    user_name: state.value.username,
  });
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
            :validate="validate"
            :state="state"
            class="mt-8 flex w-full flex-col items-center justify-center space-y-8"
            @submit.prevent="submit()"
          >
            <UFormGroup
              :ui="{
                wrapper: 'w-full',
              }"
              label="Name"
              name="name"
              required
              ><UInput
                v-model="state.name"
                placeholder="Name"
                size="xl"
                :ui="{
                  wrapper: 'w-full',
                }"
              ></UInput></UFormGroup
            ><UFormGroup
              :ui="{
                wrapper: 'w-full',
              }"
              label="Username"
              name="username"
              required
              ><UInput
                v-model="state.username"
                placeholder="Username"
                hidden
                size="xl"
                :ui="{
                  wrapper: 'w-full',
                }"
              ></UInput
            ></UFormGroup>
            <UButton type="submit" block>Login</UButton>
          </UForm>
        </div></UCard
      ></UContainer
    >
  </div>
</template>

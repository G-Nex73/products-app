<script lang="ts" setup>
import { FormError } from "@nuxthq/ui/dist/runtime/types/form";
import z from "zod";

const client = useSupabaseClient();

const form = ref();
const state = ref({
  name: "",
  username: "",
});

const validate = async (s: typeof state.value): Promise<FormError[]> => {
  const errors: FormError[] = [];
  if (!s.name) errors.push({ path: "name", message: "Required" });
  if (!s.username) errors.push({ path: "username", message: "Required" });
  const { data: uniqueUsername } = await client
    .from("profiles")
    .select("user_name")
    .eq("user_name", s.username);
  console.log(uniqueUsername);
  if (uniqueUsername?.length)
    errors.push({ path: "username", message: "This username is not avlable" });
  return errors;
};

const submit = async () => {
  await form.value!.validate();
  const { data, status } = await useFetch("/api/me", {
    method: "POST",
    headers: useRequestHeaders(["cookie"]),
    body: JSON.stringify(state.value),
  });
};
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
          <UDivider class="mt-4"><template #icon>or</template></UDivider>
          <UButton
            class="mt-4 h-12"
            leading-icon="i-mdi-github"
            variant="solid"
            color="gray"
            block
            >Sign in with Github</UButton
          >
        </div></UCard
      ></UContainer
    >
  </div>
</template>

<script lang="ts" setup>
import { useProfileStore } from "store/profile";

const profileStore = useProfileStore();
const profile = profileStore.profile;
</script>

<template>
  <div class="absolute h-full w-full">
    <header
      class="sticky top-0 w-full flex-none border-b border-gray-200 bg-white/75 backdrop-blur dark:border-gray-800 dark:bg-gray-900/75"
    >
      <UContainer>
        <div class="flex h-16 items-center justify-between">
          <NuxtLink class="flex items-center justify-between space-x-2" to="/">
            <UIcon
              name="i-solar-cart-5-bold"
              class="text-primary-500 h-9 w-9 sm:h-10 sm:w-10"
            ></UIcon>
            <h1 class="text-4xl font-bold tracking-tighter">Products</h1>
          </NuxtLink>
          <div>
            <div v-if="profile">
              <UAvatar :alt="profile.name"></UAvatar>
            </div>
            <div v-else class="flex space-x-4">
              <UButton to="/register">Sign Up</UButton>
              <UButton to="/login" color="gray" variant="solid">Login</UButton>
            </div>
          </div>
        </div>
      </UContainer>
    </header>
    <div class="flex w-full">
      <slot />
    </div>
    <footer
      class="border-t border-gray-200 bg-white/75 dark:border-gray-800 dark:bg-gray-900/75"
    >
      <UContainer
        ><div class="flex h-16 items-center justify-between gap-3"></div>
      </UContainer>
    </footer>
  </div>
</template>

<style scoped></style>

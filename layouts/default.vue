<script lang="ts" setup>
const user = useSupabaseUser();
const { auth } = useSupabaseAuthClient();
</script>

<template>
  <div class="absolute h-full w-full">
    <header
      class="sticky top-0 z-50 w-full flex-none border-b border-gray-200 bg-white/75 backdrop-blur dark:border-gray-800 dark:bg-gray-900/75"
    >
      <UContainer>
        <div class="flex h-16 items-center justify-between">
          <NuxtLink class="flex items-center justify-between space-x-2" to="/">
            <UIcon
              name="i-solar-cart-5-bold"
              class="text-primary-500 h-10 w-10"
            ></UIcon>
            <h1>Products</h1>
          </NuxtLink>
          <div>
            <div v-if="user"><UAvatar></UAvatar></div>
            <div v-else class="flex space-x-4">
              <UButton to="/login">Sign Up</UButton>
              <UButton to="/login" color="gray" variant="solid">Login</UButton>
            </div>
          </div>
        </div>
      </UContainer>
    </header>
    <slot></slot>
    <footer
      class="border-t border-gray-200 bg-white/75 dark:border-gray-800 dark:bg-gray-900/75"
    >
      <UContainer
        ><div class="flex h-16 items-center justify-between gap-3"></div>
      </UContainer>
    </footer>
  </div>
</template>

<style scoped>
h1 {
  @apply text-4xl font-bold;
}
h2 {
  @apply text-2xl font-bold;
}
h3 {
  @apply text-xl font-bold;
}
h4 {
  @apply text-lg font-bold;
}
p {
  @apply text-base;
}
</style>

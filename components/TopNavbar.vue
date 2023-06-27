<script lang="ts" setup>
import TopNavbarElement from "types/TopNavbarElement";

const { width } = useWindowSize();

const open = ref(false);
const viewPortWidth = computed(() => {
  if (width.value < 1024) return false;
  open.value = false;
  return true;
});

defineProps<{
  menuItems: TopNavbarElement[];
}>();
</script>

<template>
  <ClientOnly>
    <div v-if="viewPortWidth" class="flex items-center space-x-4">
      <NuxtLink
        v-for="(menuItem, index) in menuItems"
        :key="index"
        :to="menuItem.link"
        >{{ menuItem.name }}</NuxtLink
      >
    </div>
    <div v-else>
      <UButton
        v-if="!open"
        square
        icon="i-fa6-solid-bars"
        @click="open = !open"
      ></UButton>
      <USlideover v-model="open">
        <div
          class="mx-auto flex h-16 w-full items-center justify-between border-b border-gray-200 px-4 dark:border-gray-700 sm:px-6"
        >
          <span class="text-xl font-bold">Navigation</span>
          <UButton
            square
            icon="i-fa6-solid-xmark"
            @click="open = !open"
          ></UButton>
        </div>
        <UContainer class="mt-4 flex w-full flex-col space-y-2">
          <NuxtLink
            v-for="(menuItem, index) in menuItems"
            :key="index"
            :to="menuItem.link"
            class="w-fit text-lg"
            @click="open = false"
            >{{ menuItem.name }}</NuxtLink
          >
          <UDivider class="pt-4"></UDivider>
          <div class="space-y-4 pt-4">
            <UButton block to="/" @click="open = false">Sign Up</UButton>
            <UDivider class="text-gray-500">
              <template #icon>or</template>
            </UDivider>
            <UButton
              color="gray"
              variant="solid"
              block
              to="/"
              @click="open = false"
              >Sign In</UButton
            >
          </div>
        </UContainer>
      </USlideover>
    </div>
  </ClientOnly>
</template>

<style scoped>
.side-navbar {
  @apply absolute right-0 top-0 z-0 flex w-3/4 flex-col items-start bg-white dark:bg-gray-900;
}
</style>

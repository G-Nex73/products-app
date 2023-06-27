<template>
  <div class="flex w-full flex-col bg-white/75 dark:bg-gray-900/75">
    <UContainer
      ><div class="flex items-center justify-center">
        <NuxtIcon filled name="morphing"></NuxtIcon>
      </div>
    </UContainer>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
.nuxt-icon:deep(svg) {
  @apply h-24 w-36 sm:h-32 sm:w-48 md:h-40 md:w-56 lg:h-48 lg:w-64 xl:h-56 xl:w-72;
}
</style>

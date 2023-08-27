<script lang="ts" setup>
const slots = useSlots();
const hasIcon = computed(() => {
  return !!slots.icon;
});

const classObject = computed(() => {
  return {
    "w-full before:flex before:flex-auto before:items-center before:justify-center before:border-b before:border-gray-500":
      !hasIcon.value,
    "w-full flex flex-nowrap items-center justify-start before:mr-2 before:flex before:flex-auto before:border-b before:border-gray-500 after:ml-2 after:flex after:flex-auto after:border-b after:border-gray-500":
      hasIcon.value,
  };
});
</script>

<template>
  <div :class="classObject">
    <slot name="icon"></slot>
  </div>
</template>

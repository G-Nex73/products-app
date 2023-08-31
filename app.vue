<script lang="ts" setup>
import { useProfileStore } from "store/profile";

await useProfileStore().useProfile();
</script>

<template>
  <NuxtLayout name="default"><NuxtPage /></NuxtLayout>
</template>

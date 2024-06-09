<script setup lang="ts">
import { useAuthStore } from "~/stores/auth";

const { authenticated } = storeToRefs(useAuthStore());

const isOpen = ref(false);

watch(() => authenticated.value, (value) => {
  if (!value) {
    isOpen.value = false;
  }
});
</script>

<template>
  <div class="flex flex-col min-h-screen">
    <AppHeader @menuClick="isOpen = true" />
    <AppSlideover v-if="authenticated" v-model="isOpen" />
    <AppMain>
      <slot />
    </AppMain>
  </div>
</template>

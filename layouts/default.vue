<script setup lang="ts">
import { useAuthStore } from "~/stores/auth";

const authStore = useAuthStore();
const isOpen = ref(false);

watch(() => authStore.user, (value) => {
  if (!value) {
    isOpen.value = false;
  }
});
</script>

<template>
  <div class="flex flex-col min-h-screen">
    <AppHeader @menuClick="isOpen = true" />
    <AppSlideover
      v-if="authStore.user"
      v-model="isOpen"
    />
    <AppMain>
      <slot />
    </AppMain>
  </div>
</template>

<script setup lang="ts">
const { user } = storeToRefs(useAuthStore());

const isOpen = ref(false);

watch(() => user.value, (value) => {
  if (!value) {
    isOpen.value = false;
  }
});
</script>

<template>
  <div class="flex flex-col min-h-screen">
    <AppHeader @menuClick="isOpen = true" />
    <AppSlideover v-if="user" v-model="isOpen" />
    <AppMain>
      <slot />
    </AppMain>
  </div>
</template>

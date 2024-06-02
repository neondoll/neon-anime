<script setup lang="ts">
import { ref } from "#imports";

const isOpen = ref(false);
</script>

<template>
  <div>
    <AppHeader @menuClick="isOpen = true" />
    <AppSlideover v-model="isOpen" />
    <slot />
  </div>
</template>

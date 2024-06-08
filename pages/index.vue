<script setup lang="ts">
import type { HorizontalNavigationLink } from "#ui/types";

const appLinks = useAppLinks();

const links = computed<HorizontalNavigationLink[]>(() => {
  return [appLinks.value.list, appLinks.value.calendar];
});
</script>

<template>
  <UContainer class="flex py-4">
    <UHorizontalNavigation class="justify-center" :links="links">
      <template #default="{ link }">
        <span class="group-hover:text-primary relative">{{ link.label }}</span>
      </template>
    </UHorizontalNavigation>
  </UContainer>
</template>
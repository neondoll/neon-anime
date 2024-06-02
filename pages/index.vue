<script setup lang="ts">
const appLinks = useAppLinks();

const links = computed(() => [appLinks.value.list, appLinks.value.calendar]);
</script>

<template>
  <UContainer class="flex py-4">
    <UHorizontalNavigation :links="links" :ui="{ wrapper: 'inline-flex w-auto mx-auto' }">
      <template #default="{ link }">
        <span class="group-hover:text-primary relative">{{ link.label }}</span>
      </template>
    </UHorizontalNavigation>
  </UContainer>
</template>
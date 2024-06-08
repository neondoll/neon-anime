<script setup lang="ts">
const appLinks = useAppLinks();

const links = computed(() => {
  return [appLinks.value.list, appLinks.value.calendar];
});
</script>

<template>
  <UContainer class="flex flex-wrap justify-center gap-4 py-4">
    <UCard
        v-for="(link, linkIndex) in links"
        class="relative z-0 w-full max-w-xs pointer-events-none has-[:hover]:ring-2 has-[:hover]:ring-primary-500 dark:has-[:hover]:ring-primary-400 has-[:hover]:bg-gray-100/50 dark:has-[:hover]:bg-gray-800/50"
        :key="`link-${linkIndex}`"
        :ui="{ body: { base: 'flex gap-6 items-center' } }"
    >
      <UIcon class="w-10 h-10 text-primary" :name="link.icon" />
      <ULink
          class="text-base font-semibold text-gray-900 dark:text-white truncate focus-visible:outline-none pointer-events-auto before:absolute before:inset-0 before:-z-[1]"
          :to="link.to"
      >
        {{ link.label }}
      </ULink>
    </UCard>
  </UContainer>
</template>
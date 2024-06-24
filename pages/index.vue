<script setup lang="ts">
import { useAppLinks } from "~/composables/useAppLinks";

const appLinks = useAppLinks();

const links = computed(() => {
  return [appLinks.value.list, appLinks.value.calendar];
});
</script>

<template>
  <ClientOnly>
    <UContainer class="flex flex-wrap justify-center gap-4 py-4">
      <UCard
        v-for="(link, linkIndex) in links"
        :key="`link-${linkIndex}`"
        :ui="{
          base: 'relative z-0 w-full max-w-xs text-gray-900 dark:text-white pointer-events-none',
          background: 'has-[a:hover]:bg-gray-100/50 dark:has-[a:hover]:bg-gray-800/50',
          ring: [
            'ring-1 has-[a:hover]:ring-2 ring-gray-200 has-[a:hover]:ring-primary-500 dark:ring-gray-800',
            'dark:has-[a:hover]:ring-primary-400'
          ],
          body: { base: 'flex gap-6 items-center' }
        }"
      >
        <UIcon class="w-10 h-10 text-primary" :name="link.icon"/>
        <ULink
          :class="[
            'text-base font-semibold truncate focus-visible:outline-none pointer-events-auto before:absolute',
            'before:inset-0 before:-z-[1]'
          ]"
          :to="link.to"
        >
          {{ link.label }}
        </ULink>
      </UCard>
    </UContainer>
  </ClientOnly>
</template>
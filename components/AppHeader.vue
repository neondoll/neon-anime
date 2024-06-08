<script setup lang="ts">
const appConfig = useAppConfig();
const appLinks = useAppLinks();
const emit = defineEmits<{ menuClick: [event: Event] }>();
const { user } = storeToRefs(useAuthStore());

const menuClick = (event: Event) => emit('menuClick', event);

const AppTitle = () => {
  const titleArr = (appConfig.title as string).split(' ');

  return h('span', [titleArr[0], h('span', { class: 'text-primary' }, [titleArr[1]])]);
};
</script>

<template>
  <header class="sticky top-0 z-50 -mb-px bg-white/75 dark:bg-gray-900/75 border-b border-gray-200 dark:border-gray-800 backdrop-blur">
    <UContainer class="flex justify-between items-center gap-3 py-4">
      <div class="lg:flex-1 flex items-center gap-1.5">
        <ULink
            class="flex-shrink-0 flex items-end gap-1.5 text-xl font-bold text-gray-900 dark:text-white"
            :to="appLinks.index.to"
        >
          <AppTitle />
        </ULink>
      </div>
      <div class="lg:flex-1 flex justify-end items-center gap-1.5">
        <AppColorModeButton />
        <UButton v-if="user" color="gray" icon="i-heroicons-bars-3-20-solid" variant="ghost" @click="menuClick" />
      </div>
    </UContainer>
  </header>
</template>

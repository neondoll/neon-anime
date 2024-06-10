<script setup lang="ts">
import useAppLinks from "~/composables/useAppLinks";
import { useAnimeListStore } from "~/stores/anime-list";
import type { BreadcrumbLink } from "#ui/types";
import type { Sort } from "~/types/types";

const appLinks = useAppLinks();
const { animeList, animeListLoading } = storeToRefs(useAnimeListStore());
const { getAnimeList, labels } = useAnimeListStore();

const animeListFiltered = computed(() => {
  if (!filter.name) {
    return animeList.value;
  }

  return animeList.value.filter((animeItem) => {
    return animeItem.name.toLowerCase().replace('ё', 'е').includes(filter.name.toLowerCase().replace('ё', 'е'));
  });
});
const breadcrumbs = computed<BreadcrumbLink[]>(() => [
  appLinks.value.index,
  { label: appLinks.value.list.label, icon: appLinks.value.list.icon }
]);

const filter = reactive({ name: '' });
const modalAnimeAddIsOpen = ref(false);
const sort = ref<Sort>({ column: 'date_release', direction: 'asc' });

const dateFormat = (value: string | undefined) => {
  if (value) {
    const date = new Date(value);

    return `${ String(date.getDate()).padStart(2, '0') }.${ String(date.getMonth() + 1).padStart(2, '0') }.${ date.getFullYear() }`;
  }

  return undefined;
};

watch(() => sort.value, (value) => {
  getAnimeList(value);
}, { immediate: true });
</script>

<template>
  <ClientOnly>
    <UContainer class="py-4 space-y-4">
      <UBreadcrumb :links="breadcrumbs" />
      <UCard
          class="sticky top-[72px] z-50 -mx-2 bg-white/75 dark:bg-gray-900/75 backdrop-blur"
          :ui="{ body: { base: 'flex gap-4' } }"
      >
        <UButton icon="i-heroicons-plus-20-solid" @click="modalAnimeAddIsOpen = true" />
        <UInput v-model="filter.name" class="flex-1" input-class="pe-9" placeholder="Фильтр названий...">
          <template #trailing v-if="filter.name">
            <UButton
                class="pointer-events-auto"
                color="gray"
                icon="i-heroicons-x-mark-20-solid"
                :padded="false"
                size="xs"
                variant="ghost"
                @click="filter.name = ''"
            />
          </template>
        </UInput>
      </UCard>
      <UCard
          v-if="animeListLoading"
          :ui="{ body: { base: 'flex flex-col items-center justify-center flex-1', padding: 'px-6 py-14 sm:px-14' } }"
      >
        <UIcon
            class="w-6 h-6 mb-4 mx-auto text-gray-400 dark:text-gray-500 animate-spin"
            name="i-heroicons-arrow-path-20-solid"
        />
        <p class="text-sm text-gray-900 dark:text-white text-center">Загрузка...</p>
      </UCard>
      <div v-else class="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        <UCard
            v-for="animeItem in animeListFiltered"
            :key="`anime-${animeItem.id}`"
            :ui="{
            base: 'flex flex-col justify-between text-gray-900 dark:text-white',
            divide: 'divide-y-0',
            body: { base: 'flex justify-between items-end gap-x-2' },
            header: { base: 'flex justify-between items-start gap-x-2', padding: 'pb-0' }
          }"
        >
          <template #header>
            <h2 class="text-lg/tight font-semibold">{{ animeItem.name }}</h2>
            <UBadge
                v-if="animeItem.episodes"
                class="text-sm/none"
                :label="animeItem.episodes"
                :ui="{ rounded: 'rounded-full' }"
            />
          </template>
          <div>
            <p v-if="animeItem.date_release">
              <span class="font-medium text-primary-700 dark:text-primary-300">{{ labels.date_release }}:</span>
              {{ dateFormat(animeItem.date_release) }}
            </p>
            <p v-if="animeItem.date_finish">
              <span class="font-medium text-primary-700 dark:text-primary-300">{{ labels.date_finish }}:</span>
              {{ dateFormat(animeItem.date_finish) }}
            </p>
          </div>
          <span class="text-gray-400 dark:text-gray-600">#{{ animeItem.id }}</span>
        </UCard>
      </div>
      <ModalAnimeAdd v-model="modalAnimeAddIsOpen" @success="getAnimeList(sort)" />
    </UContainer>
  </ClientOnly>
</template>

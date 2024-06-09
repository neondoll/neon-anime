<script setup lang="ts">
import useAppLinks from "~/composables/useAppLinks";
import { useAnimeListStore } from "~/stores/anime-list";
import type { BreadcrumbLink } from "#ui/types";
import type { Sort } from "~/types/types";

const appLinks = useAppLinks();
const { animeList, animeListLoading } = storeToRefs(useAnimeListStore());
const { getAnimeList, labels } = useAnimeListStore();

const pageCount = 10;

const animeListColumns = computed(() => {
  return [
    { key: 'id', label: labels.id },
    { key: 'name', label: labels.name, sortable: true },
    { key: 'episodes', label: labels.episodes },
    { key: 'date_release', label: labels.date_release, sortable: true },
    { key: 'date_finish', label: labels.date_finish, sortable: true }
  ];
})
const animeListFiltered = computed(() => {
  if (!filter.name) {
    return animeList.value;
  }

  return animeList.value.filter((animeItem) => {
    return animeItem.name.toLowerCase().replace('ё', 'е').includes(filter.name.toLowerCase().replace('ё', 'е'));
  });
});
const animeListRows = computed(() => animeListFiltered.value.slice((page.value - 1) * pageCount, (page.value) * pageCount));
const breadcrumbs = computed<BreadcrumbLink[]>(() => [
  appLinks.value.index,
  { label: appLinks.value.list.label, icon: appLinks.value.list.icon }
]);

const filter = reactive({ name: '' });
const modalAnimeAddIsOpen = ref(false);
const page = ref(1);
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
  <UContainer class="py-4">
    <UBreadcrumb :links="breadcrumbs" />
    <UCard class="mt-4" :ui="{ body: { padding: '' }, header: { base: 'flex gap-4' } }">
      <template #header>
        <UButton icon="i-heroicons-plus" @click="modalAnimeAddIsOpen = true" />
        <UInput v-model="filter.name" class="flex-1" placeholder="Фильтр названий..." />
      </template>
      <UTable
          v-model:sort="sort"
          :columns="animeListColumns"
          :loading="animeListLoading"
          :rows="animeListRows"
          sort-asc-icon="i-heroicons-arrow-up-20-solid"
          :sort-button="{ icon: 'i-heroicons-sparkles-20-solid', color: 'primary', variant: 'outline', size: '2xs', square: false, ui: { rounded: 'rounded-full' } }"
          sort-desc-icon="i-heroicons-arrow-down-20-solid"
          sort-mode="manual"
      >
        <template #date_release-data="{ row }">{{ dateFormat(row.date_release) }}</template>
        <template #date_finish-data="{ row }">{{ dateFormat(row.date_finish) }}</template>
      </UTable>
      <template v-if="animeListFiltered.length > pageCount" #footer>
        <div class="flex justify-end">
          <UPagination v-model="page" :page-count="pageCount" :total="animeListFiltered.length" />
        </div>
      </template>
    </UCard>
    <ModalAnimeAdd v-model="modalAnimeAddIsOpen" @success="getAnimeList(sort)" />
  </UContainer>
</template>

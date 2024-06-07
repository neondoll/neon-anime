<script setup lang="ts">
import type { BreadcrumbLink } from "#ui/types";

const appLinks = useAppLinks();
const { animeList, animeListLoading } = storeToRefs(useAnimeListStore());
const { getAnimeList } = useAnimeListStore();

const animeListColumns = [
  { key: 'id', label: '#' },
  { key: 'name', label: 'Название', sortable: true },
  { key: 'episodes', label: 'Эпизоды' },
  { key: 'date_release', label: 'Дата выпуска', sortable: true },
  { key: 'date_finish', label: 'Дата окончания', sortable: true }
];
const cardUi = { body: { padding: '' } };
const pageCount = 10;

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
const page = ref(1);
const sort = ref<{ column: string; direction: "asc" | "desc" }>({ column: 'date_release', direction: 'asc' });

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
    <UBreadcrumb divider="i-heroicons-chevron-right-20-solid" :links="breadcrumbs" />
    <UCard class="mt-4" :ui="cardUi">
      <template #header>
        <UInput v-model="filter.name" placeholder="Фильтр названий..." />
      </template>
      <UTable v-model:sort="sort"
              :columns="animeListColumns"
              :loading="animeListLoading"
              :rows="animeListRows"
              sort-asc-icon="i-heroicons-arrow-up-20-solid"
              :sort-button="{ icon: 'i-heroicons-sparkles-20-solid', color: 'primary', variant: 'outline', size: '2xs', square: false, ui: { rounded: 'rounded-full' } }"
              sort-desc-icon="i-heroicons-arrow-down-20-solid"
              sort-mode="manual">
        <template #date_release-data="{ row }">{{ dateFormat(row.date_release) }}</template>
        <template #date_finish-data="{ row }">{{ dateFormat(row.date_finish) }}</template>
      </UTable>
      <template v-if="animeListFiltered.length > pageCount" #footer>
        <div class="flex justify-end">
          <UPagination v-model="page" :page-count="pageCount" :total="animeListFiltered.length" />
        </div>
      </template>
    </UCard>
  </UContainer>
</template>

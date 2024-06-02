<script setup lang="ts">
const appLinks = useAppLinks();
const {
  pending,
  data: animeListData
} = await useLazyAsyncData('animeList', () => $fetch('/api/anime-list', { method: 'get' }));

const animeListColumns = [
  { key: 'id', label: '#' },
  { key: 'name', label: 'Название', sortable: true },
  { key: 'episodes', label: 'Эпизоды' },
  { key: 'releaseDate', label: 'Дата выпуска', sortable: true },
  { key: 'finishDate', label: 'Дата окончания', sortable: true }
];
const cardUi = { body: { padding: '' } };
const filter = reactive({ name: '' });
const page = ref(1);
const pageCount = 10;

const animeList = computed(() => animeListData.value || []);
const animeListFiltered = computed(() => {
  if (!filter.name) {
    return animeList.value;
  }

  return animeList.value.filter((animeItem) => {
    return animeItem.name.toLowerCase().replace('ё', 'е').includes(filter.name.toLowerCase().replace('ё', 'е'));
  });
});
const animeListRows = computed(() => animeListFiltered.value.slice((page.value - 1) * pageCount, (page.value) * pageCount));
const breadcrumbs = computed(() => [
  appLinks.value.index,
  { label: appLinks.value.list.label, icon: appLinks.value.list.icon }
]);

const dateFormat = (value: string | undefined) => {
  if (value) {
    const date = new Date(value);

    return `${ String(date.getDate()).padStart(2, '0') }.${ String(date.getMonth() + 1).padStart(2, '0') }.${ date.getFullYear() }`;
  }

  return undefined;
};
</script>

<template>
  <UContainer class="py-4">
    <UBreadcrumb divider="i-heroicons-chevron-right-20-solid" :links="breadcrumbs" />
    <UCard class="mt-4" :ui="cardUi">
      <template #header>
        <UInput v-model="filter.name" placeholder="Фильтр названий..." />
      </template>
      <UTable :columns="animeListColumns" :loading="pending" :rows="animeListRows">
        <template #releaseDate-data="{ row }">{{ dateFormat(row.releaseDate) }}</template>
        <template #finishDate-data="{ row }">{{ dateFormat(row.finishDate) }}</template>
      </UTable>
      <template v-if="animeListFiltered.length > pageCount" #footer>
        <div class="flex justify-end">
          <UPagination v-model="page" :page-count="pageCount" :total="animeListFiltered.length" />
        </div>
      </template>
    </UCard>
  </UContainer>
</template>

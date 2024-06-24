<script setup lang="ts">
import dateFormat from "~/utils/dateFormat";
import LoadingCard from "~/components/LoadingCard.vue";
import ModalAnimeForm from "~/components/ModalAnimeForm.vue";
import { useAnimeListStore } from "~/stores/anime-list";
import { useAnimeStatusesStore } from "~/stores/anime-statuses";
import { useAnimeUserStatusesStore } from "~/stores/anime-user-statuses";
import { useAppLinks } from "~/composables/useAppLinks";
import type { AnimeItem as BaseAnimeItem, AnimeStatus } from "~/types/types";
import type { BreadcrumbLink } from "#ui/types";

interface AnimeItem extends BaseAnimeItem {
  status?: AnimeStatus;
}

type AnimeFilter = { name: string; statuses: AnimeStatus[]; statusesHide: boolean };

const appLinks = useAppLinks();
const { animeList: baseAnimeList, animeListLoading } = storeToRefs(useAnimeListStore());
const { animeStatuses } = storeToRefs(useAnimeStatusesStore());
const { animeUserStatuses, animeUserStatusesLoading } = storeToRefs(useAnimeUserStatusesStore());
const { getAnimeList, labels } = useAnimeListStore();
const { getAnimeStatuses } = useAnimeStatusesStore();
const { getAnimeUserStatuses } = useAnimeUserStatusesStore();

const animeList = computed<AnimeItem[]>(() => {
  return baseAnimeList.value.map((animeItem) => {
    const animeUserStatus = animeUserStatuses.value.find((animeUserStatus) => animeUserStatus.anime_id === animeItem.id);

    return {
      ...animeItem,
      status: animeUserStatus
        ? animeStatuses.value.find((animeStatus) => animeStatus.id === animeUserStatus.status_id)
        : undefined
    };
  });
});
const animeListFiltered = computed<AnimeItem[]>(() => {
  let filteredData = animeList.value;

  if (filter.name) {
    filteredData = filteredData.filter((animeItem) => {
      return animeItem.name.toLowerCase().replace('ё', 'е').includes(filter.name.toLowerCase().replace('ё', 'е'));
    });
  }

  if (filter.statuses.length) {
    filteredData = filteredData.filter((animeItem) => {
      if (filter.statusesHide) {
        return !animeItem.status || !filter.statuses.includes(animeItem.status);
      } else {
        return animeItem.status && filter.statuses.includes(animeItem.status);
      }
    });
  }

  return filteredData;
});
const breadcrumbLinks = computed<BreadcrumbLink[]>(() => {
  return [
    appLinks.value.index,
    { label: appLinks.value.list.label, icon: appLinks.value.list.icon }
  ];
});

const filter = reactive<AnimeFilter>({ name: '', statuses: [], statusesHide: false });
const modalAnimeFormIsOpen = ref(false);

onMounted(async () => {
  await getAnimeList();
  await getAnimeStatuses();
  await getAnimeUserStatuses();
});

const Paragraph = (props: { label: string; value: any }) => {
  return h('p', [
    h('span', { class: 'font-medium text-primary-700 dark:text-primary-300' }, props.label + ': '),
    props.value
  ]);
};
</script>

<template>
  <ClientOnly>
    <UContainer class="py-4 space-y-4">
      <UBreadcrumb :links="breadcrumbLinks"/>
      <UCard class="sticky top-[72px] z-50 -mx-2 bg-white/75 dark:bg-gray-900/75 backdrop-blur"
             :ui="{ body: { base: 'flex gap-4' } }">
        <UButton icon="i-heroicons-plus-20-solid" @click="modalAnimeFormIsOpen = true"/>
        <div class="flex-1 grid sm:grid-cols-1" style="gap:inherit">
          <UInput v-model="filter.name" class="flex-1" input-class="pe-9" placeholder="Фильтр названий...">
            <template #trailing v-if="filter.name">
              <UButton class="pointer-events-auto" color="gray" icon="i-heroicons-x-mark-20-solid" :padded="false"
                       size="xs" variant="ghost" @click="filter.name = ''"/>
            </template>
          </UInput>
          <div class="flex items-center" style="gap:inherit">
            <USelectMenu v-model="filter.statuses" class="flex-1" multiple option-attribute="value"
                         :options="animeStatuses">
              <template #label>
                <span v-if="filter.statuses.length" class="truncate">
                  {{ filter.statuses.map((item) => item.value).join(', ') }}
                </span>
                <span v-else class="text-gray-400 dark:text-gray-500">Фильтр статусов...</span>
              </template>
              <template #option="{ option }">
                <span v-if="option.color" class="w-3 h-3 rounded-full"
                      :class="`bg-${option.color}-500 dark:bg-${option.color}-400`"/>
                <span class="truncate">{{ option.value }}</span>
              </template>
            </USelectMenu>
            <UToggle v-model="filter.statusesHide" off-icon="i-heroicons-eye-solid"
                     on-icon="i-heroicons-eye-slash-solid" size="lg"
                     :aria-label="filter.statusesHide ? 'Показать статусы' : 'Скрыть статусы'"/>
          </div>
        </div>
      </UCard>
      <LoadingCard v-if="animeListLoading && animeUserStatusesLoading"/>
      <div v-else class="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        <UChip v-for="animeItem in animeListFiltered" :key="`anime-${animeItem.id}`" :color="animeItem.status?.color"
               :show="Boolean(animeItem.status)" size="lg">
          <UCard :ui="{
            base: [
              'relative z-0 flex flex-col justify-between w-full h-full text-gray-900 dark:text-white',
              'pointer-events-none'
            ],
            background: 'has-[a:hover]:bg-gray-100/50 dark:has-[a:hover]:bg-gray-800/50',
            divide: 'divide-y-0',
            ring: [
              'ring-1 has-[a:hover]:ring-2 ring-gray-200 has-[a:hover]:ring-primary-500 dark:ring-gray-800',
              'dark:has-[a:hover]:ring-primary-400'
            ],
            body: { base: 'flex justify-between items-end gap-x-2' },
            header: { base: 'flex justify-between items-start gap-x-2', padding: 'pb-0' }
          }">
            <template #header>
              <h2 class="text-lg/tight font-semibold line-clamp-2">
                <ULink
                  class="focus-visible:outline-none pointer-events-auto before:absolute before:inset-0 before:-z-[1]"
                  :to="{ name: 'list-id', params: { id: animeItem.id } }"
                >
                  {{ animeItem.name }}
                </ULink>
              </h2>
              <UBadge v-if="animeItem.episodes" class="text-sm/none" :label="animeItem.episodes"
                      :ui="{ rounded: 'rounded-full' }"/>
            </template>
            <div>
              <Paragraph v-if="animeItem.date_release" :label="labels.date_release"
                         :value="dateFormat(animeItem.date_release)"/>
              <Paragraph v-if="animeItem.date_finish" :label="labels.date_finish"
                         :value="dateFormat(animeItem.date_finish)"/>
            </div>
            <span class="text-gray-400 dark:text-gray-600">#{{ animeItem.id }}</span>
          </UCard>
        </UChip>
      </div>
      <ModalAnimeForm v-model="modalAnimeFormIsOpen" @success="getAnimeList"/>
    </UContainer>
  </ClientOnly>
</template>
<script setup lang="ts">
import dateFormat from "~/utils/dateFormat";
import LoadingCard from "~/components/LoadingCard.vue";
import ModalAnimeForm from "~/components/ModalAnimeForm.vue";
import { useAnimeListStore } from "~/stores/anime-list";
import { useAnimeStatusesStore } from "~/stores/anime-statuses";
import { useAnimeUserStatusesStore } from "~/stores/anime-user-statuses";
import { useAppLinks } from "~/composables/useAppLinks";
import type { AnimeStatus } from "~/types/types";
import type { BreadcrumbLink, DropdownItem } from "#ui/types";

const appLinks = useAppLinks();
const route = useRoute();
const {
  addAnimeUserStatus, clearAnimeUserStatus, editAnimeUserStatus, getAnimeUserStatus
} = useAnimeUserStatusesStore();
const { animeItem, animeItemLoading } = storeToRefs(useAnimeListStore());
const { animeStatuses } = storeToRefs(useAnimeStatusesStore());
const { animeUserStatus, animeUserStatusLoading } = storeToRefs(useAnimeUserStatusesStore());
const { getAnimeItem, labels } = useAnimeListStore();
const { getAnimeStatuses } = useAnimeStatusesStore();

const animeItemStatus = computed<AnimeStatus | undefined>(() => {
  return animeStatuses.value.find((animeStatus) => animeStatus.id === animeUserStatus.value?.status_id);
});
const breadcrumbLinks = computed<BreadcrumbLink[]>(() => {
  return [
    appLinks.value.index,
    appLinks.value.list,
    animeItemLoading.value
      ? { label: 'Загрузка...' }
      : { label: animeItem.value ? animeItem.value.name : '(Неизвестно)' }
  ];
});
const modalAnimeFormIsOpen = ref(false);
const statusesDropdown = computed<DropdownItem[][]>(() => {
  return [
    animeStatuses.value.map((animeStatus) => ({
      label: animeStatus.value,
      disabled: animeStatus.id === animeUserStatus.value?.status_id,
      click: () => {
        setAnimeItemStatus(animeStatus.id);
      },
      color: animeStatus.color
    }))
  ];
});

const setAnimeItemStatus = async (statusId: AnimeStatus['id']) => {
  if (animeItem.value) {
    const result = animeUserStatus.value
      ? await editAnimeUserStatus(animeItem.value.id, statusId)
      : await addAnimeUserStatus(animeItem.value.id, statusId);

    if (result) {
      await getAnimeUserStatus(animeItem.value.id);
    }
  }
};

onMounted(async () => {
  await getAnimeStatuses();
});
watch(() => route.params.id, async (value) => {
  clearAnimeUserStatus();
  await getAnimeItem(Number(value));

  if (animeItem.value) {
    await getAnimeUserStatus(animeItem.value.id);
  }
}, { immediate: true });

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
      <LoadingCard v-if="animeItemLoading && animeUserStatusLoading"/>
      <template v-else-if="animeItem">
        <UCard :ui="{
          divide: 'divide-y-0',
          header: { base: 'flex justify-between items-start gap-2', padding: 'pb-0' }
        }">
          <template #header>
            <h1 class="text-xl/tight font-semibold">{{ animeItem.name }}</h1>
            <div class="flex items-start" style="gap:inherit">
              <UDropdown :items="statusesDropdown">
                <UBadge :color="animeItemStatus ? animeItemStatus.color : 'black'"
                        :label="animeItemStatus ? animeItemStatus.value : 'Неуказанно'"/>
                <template #item="{ item }">
                  <span v-if="item.color" class="w-3 h-3 rounded-full"
                        :class="`bg-${item.color}-500 dark:bg-${item.color}-400`"/>
                  <span>{{ item.label }}</span>
                </template>
              </UDropdown>
              <UButton icon="i-heroicons-pencil-solid" @click="modalAnimeFormIsOpen = true"/>
            </div>
          </template>
          <div>
            <Paragraph v-if="animeItem.episodes" :label="labels.episodes" :value="animeItem.episodes"/>
            <Paragraph v-if="animeItem.date_release" :label="labels.date_release"
                       :value="dateFormat(animeItem.date_release)"/>
            <Paragraph v-if="animeItem.date_finish" :label="labels.date_finish"
                       :value="dateFormat(animeItem.date_finish)"/>
          </div>
        </UCard>
        <ModalAnimeForm v-model="modalAnimeFormIsOpen" :item="animeItem"
                        @success="getAnimeItem(Number(route.params.id))"/>
      </template>
      <UAlert v-else title="Неизвестное аниме"/>
    </UContainer>
  </ClientOnly>
</template>

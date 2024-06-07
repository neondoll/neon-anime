<script setup lang="ts">
import { useScreens } from "vue-screen-utils";
import type { BreadcrumbLink } from "#ui/types";

const appLinks = useAppLinks();
const { animeList } = storeToRefs(useAnimeListStore());
const { getAnimeList } = useAnimeListStore();
const { mapCurrent } = useScreens({ xs: '0px', sm: '534px', md: '800px', lg: '1066px' });

const calendar = ref();
const calendarColors = ['blue', /*'gray',*/ 'green', 'indigo', 'orange', 'pink', 'purple', 'red', 'teal', 'yellow'];
const calendarColumns = mapCurrent({ sm: 2, md: 3, lg: 4 }, 1);

const breadcrumbs = computed<BreadcrumbLink[]>(() => [
  appLinks.value.index,
  { label: appLinks.value.calendar.label, icon: appLinks.value.calendar.icon }
]);
const calendarAttributes = computed(() => [
  { key: 'today', content: { color: 'green', style: { fontStyle: 'italic' } }, dates: new Date() },
  ...animeList.value
      .filter((animeItem) => Boolean(animeItem.date_release || animeItem.date_finish))
      .map((animeItem, animeIndex) => ({
        key: `anime-${ animeItem.id }`,
        highlight: calendarColors[animeIndex % calendarColors.length],
        popover: { label: animeItem.name },
        dates: {
          start: new Date((animeItem.date_release || animeItem.date_finish) as string),
          end: new Date((animeItem.date_finish || animeItem.date_release) as string)
        }
      }))
]);

const calendarMoveToday = () => {
  if (calendar.value) {
    calendar.value.move(new Date());
  }
};

onMounted(() => {
  getAnimeList();
});
</script>

<template>
  <UContainer class="py-4">
    <UBreadcrumb divider="i-heroicons-chevron-right-20-solid" :links="breadcrumbs" />
    <ClientOnly>
      <div class="flex mt-4">
        <VCalendar :attributes="calendarAttributes" class="mx-auto" :columns="calendarColumns" ref="calendar">
          <template #footer>
            <div class="w-full px-4 pb-3">
              <UButton block @click="calendarMoveToday">Сегодня</UButton>
            </div>
          </template>
        </VCalendar>
      </div>
    </ClientOnly>
  </UContainer>
</template>

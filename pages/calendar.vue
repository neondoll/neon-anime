<script setup lang="ts">
import { ref } from '#imports';
import { useScreens } from "vue-screen-utils";

const appLinks = useAppLinks();
const { data: animeListData } = await useLazyAsyncData('animeList', () => $fetch('/api/anime-list', { method: 'get' }));
const { mapCurrent } = useScreens({ xs: '0px', sm: '534px', md: '800px', lg: '1066px' });

const calendar = ref(null);
const calendarColors = ['blue', /*'gray',*/ 'green', 'indigo', 'orange', 'pink', 'purple', 'red', 'teal', 'yellow'];
const calendarColumns = mapCurrent({ sm: 2, md: 3, lg: 4 }, 1);

const animeList = computed(() => animeListData.value || []);
const breadcrumbs = computed(() => [
  appLinks.value.index,
  { label: appLinks.value.calendar.label, icon: appLinks.value.calendar.icon }
]);
const calendarAttributes = computed(() => [
  { key: 'today', content: { color: 'green', style: { fontStyle: 'italic' } }, dates: new Date() },
  ...animeList.value
      .filter((animeItem) => Boolean(animeItem.releaseDate || animeItem.finishDate))
      .map((animeItem, animeIndex) => ({
        key: `anime-${ animeItem.id }`,
        highlight: calendarColors[animeIndex % calendarColors.length],
        popover: { label: animeItem.name },
        dates: {
          start: new Date(animeItem.releaseDate || animeItem.finishDate),
          end: new Date(animeItem.finishDate || animeItem.releaseDate)
        }
      }))
]);

const calendarMoveToday = () => {
  if (calendar.value) {
    calendar.value.move(new Date());
  }
};
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

import { defineStore } from "pinia";
import type { AnimeStatus } from "~/types/types";

export const useAnimeStatusesStore = defineStore(
  'anime-statuses',
  () => {
    const supabase = useSupabaseClient();

    const animeStatuses = ref<AnimeStatus[]>([]);
    const animeStatusesLoading = ref(true);

    const getAnimeStatuses = async () => {
      animeStatusesLoading.value = true;

      const { data } = await supabase
        .from('anime_statuses')
        .select();
      animeStatuses.value = data || [];

      animeStatusesLoading.value = false;
    };

    return { animeStatuses, animeStatusesLoading, getAnimeStatuses };
  }
);
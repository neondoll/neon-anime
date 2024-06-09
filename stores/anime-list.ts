import { defineStore } from "pinia";
import type { AnimeItem, Sort } from "~/types/types";

export const useAnimeListStore = defineStore('anime-list', () => {
  const supabase = useSupabaseClient();

  const animeList = ref<AnimeItem[]>([])
  const animeListLoading = ref(false);

  const getAnimeList = async ({ column, direction }: Sort = { column: 'id', direction: 'asc' }) => {
    animeListLoading.value = true;
    const { data } = await supabase.from('anime_list').select().order(column, { ascending: direction === 'asc' });
    animeList.value = data || [];
    animeListLoading.value = false;
  };

  return { animeList, animeListLoading, getAnimeList };
});
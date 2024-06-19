import { defineStore } from "pinia";
import type { AddedAnimeItem, AnimeItem } from "~/types/types";

export const useAnimeListStore = defineStore('anime-list', () => {
  const supabase = useSupabaseClient();

  const animeList = ref<AnimeItem[]>([])
  const animeListLoading = ref(false);
  const labels = {
    date_finish: 'Дата окончания',
    date_release: 'Дата выпуска',
    episodes: 'Эпизоды',
    id: '#',
    name: 'Название'
  };

  const addAnimeItem = async (value: AddedAnimeItem) => {
    const { data, error } = await supabase
      .from('anime_list')
      .insert([value] as never[])
      .select();

    if (error) {
      console.error(error);

      return false;
    }

    console.log('Added anime item', data);

    return true;
  };
  const getAnimeList = async () => {
    animeListLoading.value = true;

    const { data } = await supabase
      .from('anime_list')
      .select()
      .order('date_release', { ascending: true })
      .order('date_finish', { ascending: true });
    animeList.value = data || [];

    animeListLoading.value = false;
  };

  return { addAnimeItem, animeList, animeListLoading, getAnimeList, labels };
});
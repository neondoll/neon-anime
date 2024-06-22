import { defineStore } from "pinia";
import type { AddedAnimeItem, AnimeItem } from "~/types/types";

export const useAnimeListStore = defineStore(
  'anime-list',
  () => {
    const supabase = useSupabaseClient();

    const animeItem = ref<AnimeItem>();
    const animeItemLoading = ref(true);
    const animeList = ref<AnimeItem[]>([]);
    const animeListLoading = ref(true);
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
        console.error('addAnimeItem', error);

        return false;
      }

      console.log('addAnimeItem', data);

      return true;
    };
    const getAnimeItem = async (id: AnimeItem['id']) => {
      animeItemLoading.value = true;

      const { data } = await supabase
        .from('anime_list')
        .select()
        .eq('id', id);
      animeItem.value = data ? data[0] : undefined;

      animeItemLoading.value = false;
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

    return {
      addAnimeItem, animeItem, animeItemLoading, animeList, animeListLoading, getAnimeItem,
      getAnimeList, labels
    };
  }
);
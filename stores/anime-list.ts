import { defineStore } from "pinia";

interface AnimeItem {
  id: number;
  name: string;
  episodes?: number;
  date_release?: string;
  date_finish?: string;
}

export const useAnimeListStore = defineStore('anime-list', () => {
  const supabase = useSupabaseClient();

  const animeList = ref<AnimeItem[]>([])
  const animeListLoading = ref(false);

  const getAnimeList = async ({ column, direction }: { column: string; direction: "asc" | "desc" } = {column:'id', direction:'asc'}) => {
    animeListLoading.value = true;
    const { data } = await supabase.from('anime_list').select().order(column, { ascending: direction === 'asc' });
    animeList.value = data || [];
    animeListLoading.value = false;
  };

  return { animeList, animeListLoading, getAnimeList };
});
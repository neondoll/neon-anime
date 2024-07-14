import { defineStore } from "pinia";
import { useAuthStore } from "~/stores/auth";
import type { AnimeUserStatus } from "~/types/types";

export const useAnimeUserStatusesStore = defineStore(
  'anime-user-statuses',
  () => {
    const supabase = useSupabaseClient();
    const { user } = storeToRefs(useAuthStore());

    const animeUserStatus = ref<AnimeUserStatus>();
    const animeUserStatusLoading = ref(true);
    const animeUserStatuses = ref<AnimeUserStatus[]>([]);
    const animeUserStatusesLoading = ref(true);

    const addAnimeUserStatus = async (animeId: AnimeUserStatus['anime_id'], statusId: AnimeUserStatus['status_id']) => {
      const { data, error } = await supabase
        .from('anime_user_statuses')
        .insert([{ anime_id: animeId, user_id: user.value?.id, status_id: statusId }] as never[])
        .select();

      if (error) {
        console.error('addAnimeUserStatus', error);

        return false;
      }

      console.log('addAnimeUserStatus', data);

      return true;
    };
    const clearAnimeUserStatus = () => {
      animeUserStatusLoading.value = true;
      animeUserStatus.value = undefined;
    };
    const editAnimeUserStatus = async (animeId: AnimeUserStatus['anime_id'], statusId: AnimeUserStatus['status_id']) => {
      const { data, error } = await supabase
        .from('anime_user_statuses')
        .update({ status_id: statusId } as never)
        .eq('anime_id', animeId)
        .eq('user_id', user.value?.id as string)
        .select()

      if (error) {
        console.error('editAnimeUserStatus', error);

        return false;
      }

      console.log('editAnimeUserStatus', data);

      return true;
    };
    const getAnimeUserStatus = async (animeId: AnimeUserStatus['anime_id']) => {
      animeUserStatusLoading.value = true;

      if (user.value) {
        const { data } = await supabase
          .from('anime_user_statuses')
          .select('anime_id, status_id')
          .eq('anime_id', animeId)
          .eq('user_id', user.value.id);
        animeUserStatus.value = data ? data[0] : undefined;
      }

      animeUserStatusLoading.value = false;
    };
    const getAnimeUserStatuses = async () => {
      animeUserStatusesLoading.value = true;

      if (user.value) {
        const { data } = await supabase
          .from('anime_user_statuses')
          .select('anime_id, status_id')
          .eq('user_id', user.value.id);
        animeUserStatuses.value = data || [];
      }

      animeUserStatusesLoading.value = false;
    };

    return {
      addAnimeUserStatus, animeUserStatus, animeUserStatusLoading, animeUserStatuses,
      animeUserStatusesLoading, clearAnimeUserStatus, editAnimeUserStatus,
      getAnimeUserStatus, getAnimeUserStatuses
    };
  }
);
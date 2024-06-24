<script setup lang="ts">
import { number, object, string } from 'yup';
import { useAnimeListStore } from "~/stores/anime-list";
import type { AnimeItem, AnimeItemForm } from "~/types/types";
import type { FormSubmitEvent } from '#ui/types';
import type { InferType } from 'yup';

const emit = defineEmits(['success']);
const modelValue = defineModel({ default: false });
const props = withDefaults(defineProps<{ item?: AnimeItem }>(), { item: undefined });
const schema = object({
  name: string().required('Required'),
  episodes: number(),
  date_release: string(),
  date_finish: string()
});
const { addAnimeItem, editAnimeItem, labels } = useAnimeListStore();

type Schema = InferType<typeof schema>;

const state = reactive<AnimeItemForm>({
  name: '',
  episodes: undefined,
  date_release: undefined,
  date_finish: undefined
});

const onSubmit = async (event: FormSubmitEvent<Schema>) => {
  const result = props.item
    ? await editAnimeItem(props.item.id, event.data as AnimeItemForm)
    : await addAnimeItem(event.data as AnimeItemForm);

  if (result) {
    modelValue.value = false;
    emit('success');
  }
};

watch(() => modelValue.value, (value) => {
  if (value) {
    if (props.item) {
      state.name = props.item.name;
      state.episodes = props.item.episodes;
      state.date_release = props.item.date_release;
      state.date_finish = props.item.date_finish;
    }
  } else {
    state.name = '';
    state.episodes = undefined;
    state.date_release = undefined;
    state.date_finish = undefined;
  }
});
</script>

<template>
  <UModal v-model="modelValue" prevent-close>
    <UCard :ui="{ ring: '' }">
      <template #header>
        <div class="flex justify-between items-center">
          <h2 class="text-base/6 font-semibold text-gray-900 dark:text-white"
              v-text="props.item ? 'Отредактировать аниме' : 'Добавить аниме'"/>
          <UButton class="-my-1" color="gray" icon="i-heroicons-x-mark-20-solid" variant="ghost"
                   @click="modelValue = false"/>
        </div>
      </template>
      <UForm class="space-y-4" :schema="schema" :state="state" @submit="onSubmit">
        <UFormGroup :label="labels.name" name="name">
          <UInput v-model="state.name"/>
        </UFormGroup>
        <UFormGroup :label="labels.episodes" name="episodes">
          <UInput v-model="state.episodes" type="number" min="1"/>
        </UFormGroup>
        <UFormGroup :label="labels.date_release" name="date_release">
          <UInput v-model="state.date_release" type="date"/>
        </UFormGroup>
        <UFormGroup :label="labels.date_finish" name="date_finish">
          <UInput v-model="state.date_finish" type="date"/>
        </UFormGroup>
        <UButton label="Сохранить" type="submit"/>
      </UForm>
    </UCard>
  </UModal>
</template>

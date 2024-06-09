<script setup lang="ts">
import { number, object, string } from 'yup';
import { useAnimeListStore } from "~/stores/anime-list";
import type { AddedAnimeItem } from "~/types/types";
import type { FormSubmitEvent } from '#ui/types';
import type { InferType } from 'yup';

const emit = defineEmits(['success']);
const modelValue = defineModel({ default: false });
const schema = object({
  name: string().required('Required'),
  episodes: number(),
  date_release: string(),
  date_finish: string()
});
const { addAnimeItem, labels } = useAnimeListStore();

type Schema = InferType<typeof schema>;

const state = reactive({
  name: undefined,
  episodes: undefined,
  date_release: undefined,
  date_finish: undefined
});

const onSubmit = async (event: FormSubmitEvent<Schema>) => {
  const result = await addAnimeItem(event.data as AddedAnimeItem);

  if (result) {
    modelValue.value = false;
    emit('success');
  }
};

watch(() => modelValue.value, (value) => {
  if (!value) {
    state.name = undefined;
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
          <h2 class="text-base/6 font-semibold text-gray-900 dark:text-white">Добавить аниме</h2>
          <UButton
              class="-my-1"
              color="gray"
              icon="i-heroicons-x-mark-20-solid"
              variant="ghost"
              @click="modelValue = false"
          />
        </div>
      </template>
      <UForm class="space-y-4" :schema="schema" :state="state" @submit="onSubmit">
        <UFormGroup :label="labels.name" name="name">
          <UInput v-model="state.name" />
        </UFormGroup>
        <UFormGroup :label="labels.episodes" name="episodes">
          <UInput v-model="state.episodes" type="number" min="1" />
        </UFormGroup>
        <UFormGroup :label="labels.date_release" name="date_release">
          <UInput v-model="state.date_release" type="date" />
        </UFormGroup>
        <UFormGroup :label="labels.date_finish" name="date_finish">
          <UInput v-model="state.date_finish" type="date" />
        </UFormGroup>
        <UButton label="Добавить" type="submit" />
      </UForm>
    </UCard>
  </UModal>
</template>

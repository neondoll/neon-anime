<script setup lang="ts">
import { useAppLinks } from "~/composables/useAppLinks";
import { useAuthStore } from "~/stores/auth";
import type { VerticalNavigationLink } from "#ui/types";

const appLinks = useAppLinks();
const authStore = useAuthStore();
const modelValue = defineModel({ default: false });

const links = computed<VerticalNavigationLink[]>(() => {
  return [appLinks.value.index, appLinks.value.list, appLinks.value.calendar];
});
</script>

<template>
  <USlideover v-model="modelValue">
    <UCard
      :ui="{
        base: 'flex flex-col flex-1',
        body: { base: 'flex-1' },
        ring: '',
        divide: 'divide-y divide-gray-100 dark:divide-gray-800'
      }"
    >
      <template #header>
        <div class="flex justify-between items-center">
          <div class="flex items-center gap-4">
            <UIcon
              class="w-5 h-5 text-primary"
              name="i-heroicons-user-circle-16-solid"
            />
            <p class="text-base/5 font-semibold text-gray-900 dark:text-white">
              {{ authStore.user?.email }}
            </p>
          </div>
          <UButton
            class="-my-1"
            color="gray"
            icon="i-heroicons-x-mark-20-solid"
            variant="ghost"
            @click="modelValue = false"
          />
        </div>
      </template>
      <UVerticalNavigation :links="links">
        <template #default="{ link }">
          <span class="group-hover:text-primary relative">{{ link.label }}</span>
        </template>
      </UVerticalNavigation>
      <UButton
        v-if="authStore.user"
        block
        class="mt-4"
        label="Выход"
        @click="authStore.signOut"
      />
    </UCard>
  </USlideover>
</template>

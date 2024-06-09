<script setup lang="ts">
import useAppLinks from "~/composables/useAppLinks";
import { useAuthStore } from "~/stores/auth";
import type { VerticalNavigationLink } from "#ui/types";

const appLinks = useAppLinks();
const modelValue = defineModel({ default: false });
const router = useRouter();
const { authenticated, user } = storeToRefs(useAuthStore());
const { signOut } = useAuthStore();

const links = computed<VerticalNavigationLink[]>(() => {
  return [appLinks.value.index, appLinks.value.list, appLinks.value.calendar];
});

const logout = async () => {
  await signOut();
  await router.push(appLinks.value.login.to);
}
</script>

<template>
  <USlideover v-model="modelValue">
    <UCard
        class="flex flex-col flex-1"
        :ui="{ body: { base: 'flex-1' }, ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800' }"
    >
      <template #header>
        <div class="flex justify-between items-center">
          <div class="flex items-center gap-4">
            <UIcon class="w-5 h-5 text-primary" name="i-heroicons-user-circle-16-solid" />
            <p class="text-base/5 font-semibold text-gray-900 dark:text-white">{{ user?.email }}</p>
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
      <UButton v-if="authenticated" block class="mt-4" label="Выход" @click="logout" />
    </UCard>
  </USlideover>
</template>

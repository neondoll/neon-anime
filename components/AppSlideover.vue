<script setup lang="ts">
import type { VerticalNavigationLink } from "#ui/types";

const appLinks = useAppLinks();
const modelValue = defineModel({ default: false });
const router = useRouter();
const user = useSupabaseUser();
const { authenticated } = storeToRefs(useAuthStore());
const { signOut } = useAuthStore();

const links = computed<VerticalNavigationLink[]>(() => {
  return [
    ...(user.value !== null ? [{ label: user.value?.email as string, icon: 'i-heroicons-user-circle-16-solid' }] : []),
    appLinks.value.index,
    appLinks.value.list,
    appLinks.value.calendar
  ];
});

const logout = () => {
  signOut().then(() => {
    router.push(appLinks.value.login.to);
    modelValue.value = false;
  });
};
</script>

<template>
  <USlideover v-model="modelValue">
    <div class="p-4 flex-1">
      <UVerticalNavigation :links="links">
        <template #default="{ link }">
          <span class="group-hover:text-primary relative">{{ link.label }}</span>
        </template>
      </UVerticalNavigation>
      <UButton v-if="authenticated" block class="mt-4" label="Выход" @click="logout" />
    </div>
  </USlideover>
</template>

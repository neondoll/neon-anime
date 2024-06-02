<script setup lang="ts">
import { useAuthStore } from "~/store/auth";

const appConfig = useAppConfig();
const appLinks = useAppLinks();
const emit = defineEmits<{ menuClick: [event: Event] }>();
const router = useRouter();
const { authenticated } = storeToRefs(useAuthStore());
const { logUserOut } = useAuthStore();

const logout = () => {
  logUserOut();
  router.push('/login');
};
const menuClick = (event: Event) => emit('menuClick', event);
</script>

<template>
  <header>
    <UContainer class="flex items-center gap-x-4 py-4">
      <UButton v-if="authenticated"
               color="primary"
               icon="i-mdi-menu"
               size="sm"
               square
               variant="ghost"
               @click="menuClick" />
      <ULink active-class="text-primary" :to="appLinks.index.to">{{ appConfig.title }}</ULink>
      <UButton v-if="authenticated" class="ml-auto" @click="logout">Выход</UButton>
    </UContainer>
  </header>
</template>

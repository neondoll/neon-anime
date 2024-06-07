<script setup lang="ts">
import { object, string, type InferType } from 'yup';
import { useAuthStore } from "~/stores/auth";
import type { FormSubmitEvent } from '#ui/types';

const appLinks = useAppLinks();
const router = useRouter();
const schema = object({
  email: string().email('Invalid email').required('Required'),
  password: string().min(8, 'Must be at least 8 characters').required('Required')
});
const { authenticated } = storeToRefs(useAuthStore());
const { signInWithPassword } = useAuthStore();

type Schema = InferType<typeof schema>;

const state = reactive({ email: undefined, password: undefined });

const onSubmit = async (event: FormSubmitEvent<Schema>) => {
  await signInWithPassword(await event.data);

  if (authenticated.value) {
    await router.push(appLinks.value.index.to);
  }
};
</script>

<template>
  <UContainer class="py-4">
    <UCard class="max-w-lg mx-auto">
      <h1 class="text-2xl font-bold text-center text-primary">Авторизация</h1>
      <UForm :schema="schema" :state="state" class="mt-6 space-y-4" @submit="onSubmit">
        <UFormGroup label="Email" name="email">
          <UInput v-model="state.email" />
        </UFormGroup>
        <UFormGroup label="Пароль" name="password">
          <UInput v-model="state.password" type="password" />
        </UFormGroup>
        <UButton block type="submit">Войти</UButton>
      </UForm>
    </UCard>
  </UContainer>
</template>

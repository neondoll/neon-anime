<script setup lang="ts">
import { object, string, type InferType } from 'yup';
import { useAuthStore } from "~/store/auth";
import type { FormSubmitEvent } from '#ui/types';

const appLinks = useAppLinks();
const router = useRouter();
const schema = object({
  email: string().email('Invalid email').required('Required'),
  password: string().min(8, 'Must be at least 8 characters').required('Required')
});
const { authenticated } = storeToRefs(useAuthStore());
const { authenticateUser } = useAuthStore();

type Schema = InferType<typeof schema>;

const state = reactive({ email: undefined, password: undefined });

const onSubmit = async (event: FormSubmitEvent<Schema>) => {
  console.log(event.data);

  await authenticateUser(await event.data);

  console.log('authenticated', authenticated.value);

  if (authenticated.value) {
    await router.push(appLinks.value.index.to);
  }
}
</script>

<template>
  <UContainer class="py-4">
    <UCard>
      <UForm :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">
        <UFormGroup label="Email" name="email">
          <UInput v-model="state.email" />
        </UFormGroup>
        <UFormGroup label="Пароль" name="password">
          <UInput v-model="state.password" type="password" />
        </UFormGroup>
        <UButton type="submit">Войти</UButton>
      </UForm>
    </UCard>
  </UContainer>
</template>

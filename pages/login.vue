<script setup lang="ts">
import { object, string } from 'yup';
import { useAuthStore } from "~/stores/auth";
import type { FormSubmitEvent } from '#ui/types';
import type { InferType } from 'yup';

type Schema = InferType<typeof schema>;

const { signIn } = useAuthStore();
const { signInLoading } = storeToRefs(useAuthStore());

const schema = object({
  email: string().email('Invalid email').required('Required'),
  password: string().min(8, 'Must be at least 8 characters').required('Required')
});
const state = reactive({ email: undefined, password: undefined });

const onSubmit = async (event: FormSubmitEvent<Schema>) => {
  await signIn(event.data);
};
</script>

<template>
  <ClientOnly>
    <UContainer class="py-4">
      <UCard class="max-w-lg mx-auto">
        <h1 class="text-2xl font-bold text-center text-primary">
          Авторизация
        </h1>
        <UForm
          class="mt-6 space-y-4"
          :schema="schema"
          :state="state"
          @submit="onSubmit"
        >
          <UFormGroup
            label="Email"
            name="email"
          >
            <UInput v-model="state.email" />
          </UFormGroup>
          <UFormGroup
            label="Пароль"
            name="password"
          >
            <UInput
              v-model="state.password"
              type="password"
            />
          </UFormGroup>
          <UButton
            block
            label="Войти"
            :loading="signInLoading"
            type="submit"
          />
        </UForm>
      </UCard>
    </UContainer>
  </ClientOnly>
</template>

<template>
  <UCard
    :ui="{
      body: {
        base: 'flex flex-col items-center justify-center flex-1',
        padding: 'px-6 py-14 sm:px-14'
      }
    }"
  >
    <UIcon
      class="w-6 h-6 mb-4 mx-auto text-gray-400 dark:text-gray-500 animate-spin"
      name="i-heroicons-arrow-path-20-solid"
    />
    <p class="text-sm text-gray-900 dark:text-white text-center">
      Загрузка...
    </p>
  </UCard>
</template>

<script setup lang="ts">
const appLinks = useAppLinks();
const emit = defineEmits<{ "update:modelValue": [value: boolean] }>();
const props = withDefaults(defineProps<{ modelValue?: boolean }>(), { modelValue: false });

const links = computed(() => [appLinks.value.index, appLinks.value.list, appLinks.value.calendar]);

const updateModelValue = (value: boolean) => emit('update:modelValue', value);
</script>

<template>
  <USlideover :model-value="props.modelValue" side="left" @update:modelValue="updateModelValue">
    <div class="p-4 flex-1">
      <UVerticalNavigation :links="links">
        <template #default="{ link }">
          <span class="group-hover:text-primary relative">{{ link.label }}</span>
        </template>
      </UVerticalNavigation>
    </div>
  </USlideover>
</template>

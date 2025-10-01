<script setup lang="ts">

const route = useRoute();
const pageTitle = computed(() => {
  if (route.path.includes('register')) return 'Register';
  if (route.path.includes('login')) return 'Login';
  return 'on Air';
});

const formTitle = computed(() => {
  if (route.path.includes('register')) return 'Create Account';
  if (route.path.includes('login')) return 'Login';
  return 'Form';
});

provide('formTitle', formTitle);
</script>

<template>
  <UApp>
    <div class="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      <!-- Top Header (page) -->
      <div class="flex justify-between items-center px-6 py-3 border-b border-gray-200 dark:border-gray-800">
        <div class="text-lg font-semibold">XCS APP</div>
        <div class="text-sm font-medium text-gray-600 dark:text-gray-400">{{ pageTitle }}</div>
      </div>

      <!-- Form Content -->
      <div class="flex-1 flex items-center justify-center px-4 py-8">
        <!-- dynamic width depending on the form type -->
        <div :class="['w-full', route.path.includes('register') ? 'max-w-2xl' : 'max-w-md']">
         <!-- register.vue form will go below sustituting the slot tag--> 
          <UCard>
            <slot />
          </UCard>
        </div>
      </div>
    </div>
  </UApp>
</template>
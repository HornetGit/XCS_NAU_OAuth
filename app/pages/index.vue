<script setup lang="ts">
definePageMeta({
  middleware: ['auth'],
  //layout: "default"
})
</script>

<template>
  <div class="p-10">
    <h1 class="text-3xl text-center font-bold">PROTECTED PAGE: Page access ONLY IF logged in</h1>
  </div>
</template>
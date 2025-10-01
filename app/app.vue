<script lang="ts" setup>
const session = useUserSession();
async function logout(){
  await session.clear();
  await navigateTo('/auth/login');
}
</script>

<template>
    <UApp>
      <NuxtLayout>
        <nav class="h-14 px-5 flex align-center justify-between">
             <NuxtLink to="/">XCS APP</NuxtLink>
            <AuthState>
              <template #default="{ loggedIn }">
                <div class="scale-95 origin-center">
                  <UButton color="neutral" size="xs" variant="outline" v-if="loggedIn" @click="logout">Logout</UButton>
                </div>
              </template>
            </AuthState>
        </nav>
        <NuxtPage />
      </NuxtLayout>
    </UApp>
</template>
<template>
  <UApp>
    <div class="min-h-screen flex flex-col">
      <!-- Header -->
      <header class="border-b border-gray-200 dark:border-gray-800">
        <div class="container mx-auto px-6 py-4 flex items-center justify-between">
          <!-- Left: Logo and Title -->
          <div class="flex items-center gap-4">
            <AppLogo class="h-8 w-auto" />
            <span class="text-xl font-semibold">XCS OAuth</span>
          </div>

          <!-- Right: Navigation Buttons -->
          <nav class="flex items-center gap-3">
            <UButton to="/" variant="ghost" color="gray">Home</UButton>
            <UButton to="/features" variant="ghost" color="gray">Features</UButton>
            <UButton to="/pricing" variant="ghost" color="gray">Pricing</UButton>
            <UButton to="/auth/login" variant="soft" color="primary">Login</UButton>
            <UButton to="/auth/register" color="primary">Sign Up</UButton>
          </nav>
        </div>
      </header>

      <!-- Main Content -->
      <main class="flex-1">
        <slot />
      </main>

      <!-- Footer -->
      <footer class="border-t border-gray-200 dark:border-gray-800 mt-auto">
        <div class="container mx-auto px-6 py-8">
          <div class="flex flex-col md:flex-row justify-between items-center gap-4">
            <div class="text-sm text-gray-600 dark:text-gray-400">
              © {{ new Date().getFullYear() }} XCS OAuth. All rights reserved.
            </div>
            <div class="flex gap-6">
              <NuxtLink to="/privacy" class="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100">
                Privacy Policy
              </NuxtLink>
              <NuxtLink to="/terms" class="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100">
                Terms of Service
              </NuxtLink>
              <NuxtLink to="/contact" class="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100">
                Contact
              </NuxtLink>
            </div>
          </div>
        </div>
      </footer>
    </div>
  </UApp>
</template>
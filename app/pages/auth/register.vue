<script lang="ts" setup>
import type { FormSubmitEvent } from '@nuxt/ui';
import {z} from 'zod/v4';

definePageMeta({
  layout: "form"
})

const formTitle = inject('formTitle', ref('Create Account'))

const schema = z.object({
    name: z.string().min(1, 'required'),
    email: z.email('invalid email address'),
    password: z.string().min(8, 'min 8 chars long'),
    passwordConfirm: z.string()
}).check((data) => {
    if (data.value.password !== data.value.passwordConfirm) {
        data.issues.push({
            code: 'custom',
            path: ['passwordConfirm'],
            message: 'passwords does not match',
            input: data.value.passwordConfirm
        })
    }
})

type Schema = z.output<typeof schema>;
const state = reactive({
    name: '',
    email: '',
    password:'',
    passwordConfirm: ''
})

const toast = useToast(); // nuxt/ui element
const loading = ref(false);
const session = useUserSession();

// debug
async function onRegister(event: FormSubmitEvent<Schema>){
    //debug
    console.log(event.data);
    try {
        loading.value = true;
        const response = await $fetch('/api/auth/register', {
            method: 'POST',
            body: {
                name: event.data.name,
                email: event.data.email,
                password: event.data.password
            }
        })
        // set session to avoid landing to the "login" page once registered
        await session.fetch();

        // redirect to the protected homepage if successfully registered
        await navigateTo('/');
        
        if (!response.success){
            throw new Error('Registration: failed')
        }
    }
    catch {
        toast.add({
            color: 'error',
            title: 'Failed to create account',
            description: 'Pls check your details and retry',
        })
    } finally {
        loading.value=false;
    }
}

</script>

<template>
    <div>
        <!-- form Title, just about inputs -->
        <h2 class="text-2xl font-bold text-left mb-5">{{ formTitle }}</h2>

        <UForm :schema :state @submit="onRegister">
            <!-- Form and Image Layout -->
            <div class="flex gap-4">
                <!-- Form Section -->
                <div class="flex-3 space-y-4">
                    <UFormField name="name" label="Name">
                        <UInput v-model="state.name"  placeholder="enter your name" required/>
                    </UFormField>
                    <UFormField name="email" label="Email Address">
                        <UInput v-model="state.email" type="email" placeholder="enter your email address" required/>
                    </UFormField>
                   <UFormField name="password" label="Password">
                        <UInput v-model="state.password" type="password" placeholder="enter your password" required/>
                    </UFormField>
                   <UFormField name="passwordConfirm" label="Password Confirmation">
                        <UInput v-model="state.passwordConfirm" type="password"  placeholder="confirm your password" required/>
                    </UFormField>
                </div>

                <!-- Image Frame Section -->
                <div class="hidden md:flex flex-col items-center justify-left w-90 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg bg-gray-100 dark:bg-gray-800">
                    <div class="text-gray-400 dark:text-gray-600 text-sm text-center px-4">
                        Image Placeholder
                    </div>
                </div>
            </div>

            <!-- Register Button (full width below) -->
            <UButton :loading type="submit" block class="mt-6">Register</UButton>

            <div class="mt-4 text-center text-sm">
                <span class="text-gray-600 dark:text-gray-400">Already have an account? </span>
                <NuxtLink to="/auth/login" class="text-primary-600 hover:text-primary-700">Login</NuxtLink>
            </div>
        </UForm>
    </div>
</template>
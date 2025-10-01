<script lang="ts" setup>
import { toast } from '#build/ui';
import type { FormSubmitEvent } from '@nuxt/ui';
import {z} from 'zod/v4';

definePageMeta({
  layout: "form"
})

const formTitle = inject('formTitle', ref('Login'))

const schema = z.object({
    email: z.email('invalid email address'),
    password: z.string().min(8, 'min 8 chars long'),
})

type Schema = z.output<typeof schema>;
const state = reactive({
    email: '',
    password:'',
})


const mytoast = useToast();
const session = useUserSession();
async function onLogin(event: FormSubmitEvent<Schema>){
    console.log(event.data);
    try {
        const response = await $fetch('/api/auth/login', {
            method: 'POST',
            body:{
                email: event.data.email,
                password: event.data.password,
            }
        })

        if (!response.success) {
            throw new Error('login failed');
            // added for the case of a failed github OAuth
            session.clear;
        }

        await navigateTo('/');
    }
    catch {
        mytoast.add({
            color: 'error',
            title: 'Failed to log in',
            description: 'try again'
        })
    }
    
}

</script>

<template>
    <div>
        <h2 class="text-2xl font-bold mb-6 text-left">{{ formTitle }}</h2>
        <UForm :schema :state class="space-y-4" @submit="onLogin">
            <UFormField name="email" label="Email Address">
                <UInput v-model="state.email" class="w-full" placeholder="enter your email address" required/>
            </UFormField>
           <UFormField name="password" label="Password">
                <UInput v-model="state.password" type="password" class="w-full" placeholder="enter your password" required/>
            </UFormField>
            <UButton type="submit" block>Login</UButton>
            
            <!-- add more login options , routes defined in : server/routes/oauth -->
            <div class="grid grid-cols-4 gap-2 mt-2">
                <UButton leading-icon="ph-google-logo-duotone" color="secondary" variant="outline" size="xs">Google</UButton>
                <UButton leading-icon="ph-linkedin-logo-duotone" color="secondary" variant="outline" size="xs">LinkedIn</UButton>
                <UButton leading-icon="ph-facebook-logo-duotone" color="secondary" variant="outline" size="xs">Facebook</UButton>
                <UButton leading-icon="ph-github-logo-duotone" color="secondary" variant="outline" size="xs" to="http://localhost:3000/oauth/github">GitHub</UButton>
            </div>
        </UForm>

        <div class="mt-4 text-center text-sm">
            <span class="text-gray-600 dark:text-gray-400">Don't have an account? </span>
            <NuxtLink to="/auth/register" class="text-primary-600 hover:text-primary-700">Register</NuxtLink>
        </div>
    </div>
</template>
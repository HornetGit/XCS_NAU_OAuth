export default defineNuxtRouteMiddleware(async() => {
    const session = useUserSession()
    if (!session.loggedIn.value){
        await session.fetch()
        if (!session.loggedIn.value){
            return navigateTo('/auth/login')
        }
    }

// set user in store etc
// getting this info from:
// const user = session.user
})
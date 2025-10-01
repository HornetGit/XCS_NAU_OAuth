export default defineOAuthGitHubEventHandler ({
    config: {
        emailRequired: true
    },
    async onSuccess(event, {user, tokens}) {
        // optional: here the user to set in local db
        await setUserSession(event, {
            user: {
                githubId : user.id,
            }
        })
        return sendRedirect(event, '/')
    },
    // optional: to return a json error and 401 status code by default
    onError(event, error) {
        console.error('GitHub OAuth error: ', error)
        return sendRedirect(event, '/')
    }
})
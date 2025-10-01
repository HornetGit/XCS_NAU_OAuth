import { user } from '#build/ui'
import { hashPassword } from '#imports'
import { z } from 'zod/v4'

// restrict to email / password login 
const loginSchema = z.object({
    email: z.email(),
    password: z.string().min(8, 'pwd: min 8 chars long')
})

// fetch user in db
export default defineEventHandler(async (event) => {
    const body = await readValidatedBody(event, loginSchema.parse)
    const user = await db.query.users.findFirst({
        where: eq(tables.users.email, body.email),
    })

// check if user found in the db
if (!user) {
    throw createError({
        statusCode: 401,
        statusMessage: 'Unauthorized'
    })
}

// check if hashed passwords from body and db are matching 
const result = await verifyPassword(user.passwordHash, body.password)
if (!result){
        throw createError({
        statusCode: 401,
        statusMessage: 'Unauthorized'
    })
}

// set or renew the user session
await setUserSession(event, {
    user: {
        id: user.id,
        name: user.name,
    },
    lastLoggedIn: new Date(),
})

// finally return true if all passed succesfully
return { success: true }
})
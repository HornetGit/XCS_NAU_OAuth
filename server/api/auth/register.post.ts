import { user } from '#build/ui'
import { hashPassword } from '#imports'
import { z } from 'zod/v4'

const registerSchema = z.object({
    email: z.email(),
    name: z.string().min(1, 'Name is required').max(255),
    password: z.string().min(8, 'pwd: min 8 chars long')
})

export default defineEventHandler(async (event) => {
    const body = await readValidatedBody(event, registerSchema.parse)
    const hashedPassword = await hashPassword(body.password)
    const[user] = await db.insert(tables.users).values({
        email: body.email,
        name: body.name,
        passwordHash: hashedPassword,
    }).returning()

    await setUserSession(event , {
        user: {
            id: user.id,
            name: user.name,
        },
        lastLoggedIn: new Date(),
    })
    return { success: true }
})


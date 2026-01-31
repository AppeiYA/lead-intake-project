import {email, z} from 'zod'

export const LeadFormSchema = z.object({
    name: z.string(),
    email: z.email(),
    website: z.string().optional()
})
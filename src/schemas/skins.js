import z from 'zod'

const skinSchema = z.object({
  id: z.string(),
  name: z.string(),
  owner: z.string(),
  type: z.string(),
  price: z.number().positive(),
  color: z.string(),
  available: z.boolean()
})

// Validation
export function validateSkin(object) {
  return skinSchema.safeParse(object)
}

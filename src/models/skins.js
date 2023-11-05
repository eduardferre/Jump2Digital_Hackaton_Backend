const z = require('zod')

const skinModel = z.object({
  id: z.string(),
  name: z.string(),
  owner: z.string(),
  type: z.string(),
  price: z.number().positive(),
  color: z.string(),
  available: z.boolean()
})

// Validation
function validateSkin(object) {
  return skinModel.safeParse(object)
}

module.exports = {
  validateSkin
}

import { validateSkin } from '../schemas/skins.js'
import { SkinModel } from '../models/skin.js'

export class SkinController {
  static async getAvailable(req, res) {
    const skins = await SkinModel.getAvailable()
    if (skins === 204) {
      return res
        .status(204)
        .json({ message: 'There are no skins available right now' })
    }
    return res.json(skins)
  }

  static async getUserSkins(req, res) {
    const { username } = req.params
    const skins = await SkinModel.getUserSkins({ username })
    if (skins === 204) {
      return res.status(204).json({ message: 'The user has no skins yet' })
    }
    return res.json(skins)
  }

  static async getById(req, res) {
    const { id } = req.params
    const skin = await SkinModel.getById({ id })
    if (skin === 404) {
      return res.status(404).json({ message: 'Skin not found' })
    }
    return res.json(skin)
  }

  static async buy(req, res) {
    const result = validateSkin(req.body)

    if (!result.success) {
      return res.status(400).json({ error: result.error.message })
    }

    const skin = await SkinModel.buy({ body: result.data })

    if (skin === 404) {
      return res.status(404).json({ message: 'Skin not found' })
    }
    if (skin === 403) {
      return res
        .status(403)
        .json({ message: 'The skin is no longer available for purchase' })
    }

    res.json(skin)
  }

  static async update(req, res) {
    const result = validateSkin(req.body)

    if (!result.success) {
      return res.status(400).json({ error: result.error.message })
    }

    const skinUpdated = await SkinModel.update({ body: result.data })

    if (skinUpdated === 404) {
      return res.status(404).json({ message: 'Skin not found' })
    }

    res.json(skinUpdated)
  }

  static async deleteById(req, res) {
    const { id } = req.params
    const isDeleted = await SkinModel.deleteById({ id })

    if (isDeleted === 404) {
      res.status(404).json({ message: 'Skin not found' })
    }
    return res.json({ message: 'Skin deleted' })
  }
}

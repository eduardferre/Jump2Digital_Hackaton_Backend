import { readJSON } from '../../utils/json.js'

const skins = readJSON('../src/skins.json')

export class SkinModel {
  static async getAvailable() {
    const skinsAvailable = skins.filter((skin) => skin.available === true)
    if (skinsAvailable.length > 0) return skinsAvailable
    return 204
  }

  static async getUserSkins({ username }) {
    const userSkins = skins.filter((skin) => skin.owner.includes(username))
    if (userSkins.length > 0) return userSkins
    return 204
  }

  static async getById({ id }) {
    const skin = skins.find((skin) => skin.id === id)
    if (skin) return skin
    return 404
  }

  static async buy({ body }) {
    const skinIndex = skins.findIndex((skin) => skin.id === body.id)

    if (skinIndex === -1) return 404
    if (!skins[skinIndex].available) return 403
    const skin = {
      ...body,
      available: false
    }
    skins[skinIndex] = skin
    skins.push(skin)

    return skin
  }

  static async update({ body }) {
    const skinIndex = skins.findIndex((skin) => skin.id === body.id)

    if (skinIndex === -1) return 404

    skins[skinIndex] = { ...body }
    return skins[skinIndex]
  }

  static async deleteById({ id }) {
    const skinIndex = skins.findIndex((skin) => skin.id === id)
    if (skinIndex === -1) return 404

    skins.splice(skinIndex, 1)
    return 0
  }
}

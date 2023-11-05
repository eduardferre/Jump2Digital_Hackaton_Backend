import mysql from 'mysql2/promise'

const config = {
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'skinsdb'
}

const connection = mysql.createConnection(config)

export class SkinModel {
  static async getAvailable() {
    const [skinsAvailable] = (await connection).query(
      'SELECT BIN_TO_UUID(id) id, name, owner, type, price, color, available FROM skins WHERE available = true;'
    )
    if (skinsAvailable.length > 0) return skinsAvailable
    return 204
  }

  static async getUserSkins({ username }) {
    const userSkins = await (
      await connection
    ).query(
      `SELECT BIN_TO_UUID(id) id, name, owner, type, price, color, available 
         FROM skins 
         WHERE owner = ?;`,
      [username]
    )
    if (userSkins.length > 0) return userSkins
    return 204
  }

  static async getById({ id }) {
    const skin = await (
      await connection
    ).query(
      `SELECT BIN_TO_UUID(id) id, name, owner, type, price, color, available 
         FROM skins 
         WHERE id = UUID_TO_BIN(?);`,
      [id]
    )
    if (skin) return skin
    return 404
  }

  static async buy({ body }) {
    const { name, owner, type, price, color, available } = body

    const [uuidResult] = (await connection).query('SELECT UUID() uuid;')
    const [{ uuid }] = uuidResult

    try {
      await connection.query(
        `INSERT INTO skins (id, name, owner, type, price, color, available)
        VALUES (UUID_TO_BIN(?), ?, ?, ?, ?, ?, ?);`,
        [uuid, name, owner, type, price, color, available]
      )
    } catch (e) {
      throw new Error('Error creating skin')
    }

    const [skin] = (await connection).query(
      `SELECT BIN_TO_UUID(id) id, name, owner, type, price, color, available 
        FROM skins 
        WHERE id = UUID_TO_BIN(?);`,
      [uuid]
    )

    if (!skin[0]) return 404
    if (!skin[0].available) return 403

    return skin[0]
  }

  static async update({ body }) {
    try {
      await connection.query(
        `UPDATE skins SET name = ?, owner = ?, type = ?, price = ?, color = ?, available = ? 
            WHERE id = ?;`,
        [
          body.name,
          body.owner,
          body.type,
          body.price,
          body.color,
          body.available,
          body.id
        ]
      )
    } catch (e) {
      throw new Error('Error creating skin')
    }

    const [skin] = (await connection).query(
      `SELECT BIN_TO_UUID(id) id, name, owner, type, price, color, available 
        FROM skins 
        WHERE id = UUID_TO_BIN(?);`,
      [body.id]
    )

    if (!skin[0]) return 404
    return skin[0]
  }

  static async deleteById({ id }) {
    try {
      await connection.query(
        `DELETE FROM skins 
        WHERE id = UUID_TO_BIN(?);`,
        [id]
      )
    } catch (e) {
      throw new Error('Error creating skin')
    }

    const [skin] = (await connection).query(
      `SELECT BIN_TO_UUID(id) id, name, owner, type, price, color, available 
          FROM skins 
          WHERE id = UUID_TO_BIN(?);`,
      [id]
    )

    if (!skin[0]) return 404
    return 0
  }
}

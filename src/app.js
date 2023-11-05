const express = require('express')
const pc = require('picocolors')
const cors = require('cors')

const skins = require('./skins.json')
const skinsBuy = require('./skinsBuy.json')
const { validateSkin } = require('./models/skins')

const PORT = process.env.PORT ?? 3000

const app = express()
app.disable('x-powered-by')

// Middlewares
app.use(express.json())
app.use(
  cors({
    origin: (origin, callback) => {
      const ACCEPTED_ORIGINS = [
        'http://localhost:8080',
        'http://localhost:3000'
      ]

      if (ACCEPTED_ORIGINS.includes(origin)) {
        return callback(null, true)
      }

      if (!origin) {
        return callback(null, true)
      }

      return callback(new Error('Not allowed by CORS'))
    }
  })
)
app.use((req, res, next) => {
  console.log(
    pc.blue(req.method + ' http://' + req.hostname + ':' + PORT + req.url)
  )
  next()
})

app.get('/skins/available', (req, res) => {
  const skinsAvailable = skins.filter((skin) => skin.available === true)
  if (skinsAvailable.length > 0) res.json(skinsAvailable)
  else {
    res.status(204).json({ message: 'There are no skins available right now' })
  }
})

app.post('/skins/buy', (req, res) => {
  const result = validateSkin(req.body)

  if (!result.success) {
    return res.status(400).json({ error: result.error.message })
  }

  const skinIndex = skins.findIndex((skin) => skin.id === result.data.id)

  if (skinIndex === -1) {
    return res.status(404).json({ message: 'Skin not found' })
  }

  if (!skins[skinIndex].available) {
    return res
      .status(403)
      .json({ message: 'The skin is no longer available for purchase' })
  }

  const skin = { ...result.data, available: false }
  skins[skinIndex] = skin
  skinsBuy.push(skin)

  res.json(skin)
})

app.get('/skins/myskins/:username', (req, res) => {
  const { username } = req.params
  const userSkins = skins.filter((skin) => skin.owner.includes(username))
  if (userSkins.length > 0) res.json(userSkins)
  else res.status(204).json({ message: 'The user has no skins yet' })
})

app.put('/skins/color', (req, res) => {
  const result = validateSkin(req.body)

  if (!result.success) {
    return res.status(400).json({ error: result.error.message })
  }

  const skinIndex = skins.findIndex((skin) => skin.id === result.data.id)

  if (skinIndex === -1) {
    return res.status(404).json({ message: 'Skin not found' })
  }

  const skin = { ...result.data }
  skins[skinIndex] = skin

  res.json(skin)
})

app.delete('/skins/delete/:id', (req, res) => {
  const { id } = req.params
  const skinIndex = skins.findIndex((skin) => skin.id === id)

  if (skinIndex === -1) {
    res.status(404).json({ message: 'Skin not found' })
  }

  skins.splice(skinIndex, 1)

  return res.json({ message: 'Skin deleted' })
})

app.get('/skins/getskin/:id', (req, res) => {
  const { id } = req.params
  const skin = skins.find((skin) => skin.id === id)
  if (skin) return res.json(skin)

  res.status(404).json({ message: 'Skin not found' })
})

app.use((req, res) => {
  res.status(404).send('404 - Not Found')
})

// Server listening
app.listen(PORT, () => {
  console.log(`Server listening on port http://localhost:${PORT}`)
})

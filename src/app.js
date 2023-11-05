import express, { json } from 'express'
import morgan from 'morgan'
import { skinsRouter } from './routes/skins.js'
import { corsMiddleware } from './middlewares/cors.js'

const PORT = process.env.PORT ?? 3001

const app = express()
app.disable('x-powered-by')

// Middlewares
app.use(json())
app.use(corsMiddleware())
app.use(morgan('dev'))

// Routes
app.use('/skins', skinsRouter)

app.use((req, res) => {
  res.status(404).send('404 - Not Found')
})

// Server listening
app.listen(PORT, () => {
  console.log(`Server listening on port http://localhost:${PORT}`)
})

import { Router } from 'express'
import { SkinController } from '../controllers/skins.js'

export const skinsRouter = Router()

skinsRouter.get('/available', SkinController.getAvailable)
skinsRouter.post('/buy', SkinController.buy)
skinsRouter.get('/myskins/:username', SkinController.getUserSkins)
skinsRouter.put('/color', SkinController.update)
skinsRouter.delete('/delete/:id', SkinController.deleteById)
skinsRouter.get('/getskin/:id', SkinController.getById)

skinsRouter.use((req, res) => {
  res.status(404).send('404 - Not Found')
})

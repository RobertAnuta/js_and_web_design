import express from 'express'
import { login, register, logout, deleteUser } from '../controllers/auth.js'

const router = express.Router()

router.post('/login', login)
router.post('/register', register)
router.post('/logout', logout)
router.delete('/delete/:id', deleteUser)

export default router

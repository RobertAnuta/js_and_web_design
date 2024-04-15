import bcrypt from 'bcrypt'
import { db } from '../connect.js'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()
import fs from 'fs'

export const register = (req, res) => {
  // Check user if exists
  const query = 'SELECT * FROM users WHERE username = ?'

  db.query(query, [req.body.username], (err, data) => {
    if (err) return res.status(500).json(err)
    if (data.length) return res.status(409).json('User already exists')

    // Create a new userand has the password
    const salt = bcrypt.genSaltSync()
    const hashedPassword = bcrypt.hashSync(req.body.password, salt)

    // const defaultProfilePicPath = '../profilePic/defaultPicture.jpg'

    // const defaultProfilePic = fs.readFileSync(defaultProfilePicPath)

    const insertQuery =
      'INSERT INTO users (`username`, `email`, `password`, `name`) VALUES (?, ?, ?, ?)'
    const values = [
      req.body.username,
      req.body.email,
      hashedPassword,
      req.body.name
    ]
    db.query(insertQuery, values, (err, data) => {
      if (err) return res.status(500).json(err)
      return res.status(200).json('User has been created')
    })
  })
}

export const login = (req, res) => {
  // Implement login logic
  const query = 'SELECT * FROM users WHERE username = ?'

  db.query(query, [req.body.username], (err, data) => {
    if (err) return res.status(500).json(err)
    if (data.length === 0) return res.status(404).json('User not found')
    const checkPassword = bcrypt.compareSync(
      req.body.password,
      data[0].password
    )
    if (!checkPassword)
      return res.status(400).json('Wrong password or username!')

    const token = jwt.sign({ id: data[0].id }, `${process.env.JWT_SECRET}`)

    const { password, ...other } = data[0]
    res
      .cookie('accessToken', token, {
        httpOnly: true
      })
      .status(200)
      .json(other)
  })
}

export const logout = (req, res) => {
  res
    .clearCookie('accessToken', {
      secure: true,
      sameSite: 'none'
    })
    .status(200)
    .json('You have been logged out')
}

export const deleteUser = async (req, res) => {
  const userId = req.params.id

  const query = `SELECT * FROM users WHERE id = ${userId}`
  try {
    const user = await db.query(query)
    if (user.length === 0) {
      return res.status(404).json('User not found')
    }
  } catch (err) {
    return res.status(500).json(err)
  }

  // Delete user
  const deleteQuery = `DELETE FROM users WHERE id = ${userId}`
  try {
    await db.query(deleteQuery)
    return res.status(200).json('User deleted successfully')
  } catch (err) {
    return res.status(500).json(err)
  }
}

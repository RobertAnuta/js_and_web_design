import { db } from '../connect.js'
import jwt from 'jsonwebtoken'
import moment from 'moment'

export const getComments = (req, res) => {
  const query = `SELECT c.*, u.id AS userId, name, profilePic FROM comments AS c JOIN users AS u ON (u.id = c.userId)
  WHERE c.postId = ? ORDER BY c.createdAt DESC`

  db.query(query, [req.query.postId], (err, data) => {
    if (err) return res.status(500).json({ error: 'Internal Server Error' })
    return res.status(200).json(data)
  })
}

export const addComments = (req, res) => {
  const token = req.cookies.accessToken
  if (!token) return res.status(401).json('Not logged in!')

  jwt.verify(token, `${process.env.JWT_SECRET}`, (err, userInfo) => {
    if (err) return res.status(403).json({ error: 'Token is not valid!' })

    const query =
      'INSERT INTO comments (`desc`, `createdAt`, `userId`, `postId`) VALUES (?)'

    const values = [
      req.body.desc,
      moment(Date.now()).format('YYYY_MM_DD HH:mm:ss'),
      userInfo.id,
      req.body.postId
    ]

    db.query(query, [values], (err, data) => {
      if (err) return res.status(500).json({ error: 'Internal Server Error' })
      return res.status(200).json('Comment has been created!')
    })
  })
}

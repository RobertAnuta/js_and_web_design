import { db } from '../connect.js'
import jwt from 'jsonwebtoken'

export const getUser = (req, res) => {
  const userId = req.params.userId
  const query = 'SELECT * FROM users WHERE id=?'

  db.query(query, [userId], (err, data) => {
    if (err) {
      return res.status(500).json({ error: 'Internal Server Error' })
    }

    if (data.length === 0) {
      return res.status(404).json({ error: 'User not found' })
    }

    const { password, ...info } = data[0]
    return res.json(info)
  })
}

import mysql from 'mysql'

export const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'db_password",
  database: 'db_groupomania'
})

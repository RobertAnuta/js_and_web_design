// authContext.js

import axios from 'axios'
import { createContext, useEffect, useState } from 'react'

export const AuthContext = createContext()

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem('user')) || null
  )

  const login = async inputs => {
    const res = await axios.post(
      'http://localhost:8800/api/auth/login',
      inputs,
      {
        withCredentials: true
      }
    )
    setCurrentUser(res.data)
  }

  const logout = async () => {
    try {
      await axios.post(
        'http://localhost:8800/api/auth/logout',
        {},
        {
          withCredentials: true
        }
      )
      setCurrentUser(null)
    } catch (error) {
      console.error('Logout failed:', error)
    }
  }

  const deleteUser = async userId => {
    try {
      await axios.delete(`http://localhost:8800/api/auth/delete/${userId}`)
      setCurrentUser(null)
    } catch (error) {
      console.error('Delete user failed:', error)
    }
  }

  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(currentUser))
  }, [currentUser])

  return (
    <AuthContext.Provider value={{ currentUser, login, logout, deleteUser }}>
      {children}
    </AuthContext.Provider>
  )
}

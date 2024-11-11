import axios from 'axios'
import { useState } from 'react'
import { UserContext } from './UserContext'

const url = process.env.REACT_APP_API_URL

export default function UserProvider({children}) {
    const userFromSessionStorage = sessionStorage.getItem('user')
    const [user, setUser] = useState(userFromSessionStorage ? JSON.parse(userFromSessionStorage): {email: '', password: ''})

    const signUp = async() => {
        const json = JSON.stringify(user)
        const headers = {headers: {'Content-Type':'application/json'}}
        try {
            await axios.post(url + '/user/register', json, headers)
            setUser({email: '', password: ''})
        } catch (error) {
            throw error
        }
    }

    const signIn = async() => {
        const json = JSON.stringify(user)
        const headers = {headers: {'Content-Type':'application/json'}}
        try {
            const response = await axios.post(url + '/user/login', json, headers)
            const token = response.data.token
            setUser(response.data)
            sessionStorage.setItem("user", JSON.stringify(response.data))
        } catch(error) {
            setUser({email: '', password: ''})
            throw error
        }
    }

    return (
        <UserContext.Provider value={{user, setUser, signUp, signIn}}>
            { children }
        </UserContext.Provider>
    )
}

export { UserProvider }
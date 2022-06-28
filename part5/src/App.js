import {useState, useEffect} from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import React from 'react';

const App = () => {
    const [blogs, setBlogs] = useState([])
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [user, setUser] = useState(null)

    useEffect(() => {
        blogService.getAll().then(blogs =>
            setBlogs(blogs)
        )
    }, [])

    const handleLogin = async (event) => {
        event.preventDefault()
        try {
            const user = await loginService.login({username, password})
            setUser(user)
            setUsername('')
            setPassword('')
        } catch (exception) {
            console.error('Wrong credentials')
        }
    }

    const loginForm = () => (
        <React.Fragment>
            <h2>Login</h2>

            <form onSubmit={handleLogin}>
                <div>
                    username
                    <input
                        type="text"
                        value={username}
                        name="Username"
                        onChange={({target}) => setUsername(target.value)}
                    />
                </div>
                <div>
                    password
                    <input
                        type="password"
                        value={password}
                        name="Password"
                        onChange={({target}) => setPassword(target.value)}
                    />
                </div>
                <button type="submit">login</button>
            </form>
        </React.Fragment>
    )

    const blogForm = () => (
        blogs.map(blog =>
            <Blog key={blog.id} blog={blog}/>
        )
    )

    return (
        <div>
            {user === null
                ? loginForm()
                : <p>{user.name} logged-in</p>
            }

            <h2>blogs</h2>
            {blogForm()}
        </div>
    )
}

export default App

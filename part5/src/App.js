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

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            setUser(user)
            blogService.setToken(user.token)
        }
    }, [])

    const handleLogin = async (event) => {
        event.preventDefault()
        try {
            const user = await loginService.login({
                username, password
            })
            window.localStorage.setItem(
                'loggedBlogAppUser', JSON.stringify(user)
            )
            blogService.setToken(user.token)
            setUser(user)
            setUsername('')
            setPassword('')
        } catch (exception) {
            console.error('Wrong credentials')
        }
    }

    const loginForm = () => (
        <React.Fragment>
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

    const loggedInForm = () => (
        <div>
            <p>{user.name} logged-in</p>
            <button onClick={() => {
                window.localStorage.clear()
                setUser(null)
            }}>
                logout
            </button>
        </div>
    )

    return (
        <div>
            <h2>Login</h2>

            {user === null
                ? loginForm()
                : loggedInForm()
            }

            <h2>blogs</h2>

            {blogForm()}
        </div>
    )
}

export default App

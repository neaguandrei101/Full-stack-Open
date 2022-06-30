import {useState, useEffect} from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import React from 'react';
import Notification from "./components/Notification";

const App = () => {
    const [blogs, setBlogs] = useState([])
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [user, setUser] = useState(null)
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')
    const [message, setMessage] = useState(null)

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

    const blogAll = () => (
        blogs.map(blog =>
            <Blog key={blog.id} blog={blog}/>
        )
    )

    const loggedIn = () => (
        <div>
            <p>{user.name} logged-in</p>
            <button onClick={() => {
                window.localStorage.clear()
                setUser(null)
            }}>
                logout
            </button>
            <form onSubmit={handleCreateNew}>
                <div>
                    title
                    <input
                        type="text"
                        value={title}
                        name="Title"
                        onChange={({target}) => setTitle(target.value)}
                    />
                </div>
                <div>
                    author
                    <input
                        type="text"
                        value={author}
                        name="Author"
                        onChange={({target}) => setAuthor(target.value)}
                    />
                </div>
                <div>
                    url
                    <input
                        type="text"
                        value={url}
                        name="Url"
                        onChange={({target}) => setUrl(target.value)}
                    />
                </div>
                <button type="submit">create</button>
            </form>
        </div>
    )

    const handleCreateNew = async (event) => {
        event.preventDefault()
        try {
            const returnedBlog = await blogService.create({
                title,
                author,
                url
            })
            setTitle('')
            setAuthor('')
            setUrl('')
            setMessage('New blog added')
            setTimeout(() => {
                setMessage(null)
            }, 5000)

        } catch (e) {
            console.error('cant create new blog', e.message)
            setMessage('cant create new blog')
            setTimeout(() => {
                setMessage(null)
            }, 5000)
        }

    }

    return (
        <div>
            <Notification message={message}/>
            <h2>Login</h2>

            {user === null
                ? loginForm()
                : loggedIn()
            }

            <h2>blogs</h2>

            {blogAll()}
        </div>
    )
}

export default App

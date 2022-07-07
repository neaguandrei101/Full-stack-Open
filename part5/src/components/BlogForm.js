import React, { useState } from "react";

const BlogForm = ({setMessage, create}) => {

    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

    const handleAddBlog = async (event) => {
        event.preventDefault()
        try {
            create({
                title,
                author,
                url
            });
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
            <h2>Create new</h2>

            <form onSubmit={handleAddBlog}>
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
}

export default BlogForm

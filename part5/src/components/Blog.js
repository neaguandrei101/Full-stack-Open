const Blog = ({blog, user, remove, update}) => {

    const handleDelete = async (blog, token) => {
        if (window.confirm("Do you really want to remove this?")) {
            await remove(blog, token)
            update()
        }
    }

    if (user.username === blog.user.username) {
        return (
            <div style={{display: 'flex', justifyContent: 'flex-start'}}>
                {blog.title} {blog.author}
                <button onClick={() => handleDelete(blog, user.token)}>remove</button>
            </div>
        )
    }

    return (
        <div style={{display: 'flex', justifyContent: 'flex-start'}}>
            {blog.title} {blog.author}
        </div>
    )
}

export default Blog
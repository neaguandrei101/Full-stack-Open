const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require("../models/user");
const jwt = require("jsonwebtoken");

blogRouter.get('/', async (request, response) => {
    const blogs = await Blog
        .find({}).populate('user', {username: 1, name: 1})
    response.json(blogs)
})

blogRouter.post('/', async (request, response) => {
    const body = request.body
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!decodedToken.id) {
        return response.status(401).json({error: 'token missing or invalid'})
    }
    const user = await User.findById(decodedToken.id)

    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        user: user._id,
        likes: body.likes,
    })

    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)

    await user.save()

    response.status(201).json(savedBlog)

})

blogRouter.delete('/:id', async (request, response) => {
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!decodedToken.id) {
        return response.status(401).json({error: 'token missing or invalid'})
    }

    const blogId = request.params.id
    const blog = await Blog.findById(blogId)

    if(!(decodedToken.id.toString() ===  blog.user.toString())) {
        return response.status(401).json({error: 'the user cannot delete the blog'})
    }

    const deletedBlog = await blog.remove()

    response.json(deletedBlog)
})

blogRouter.put('/:id', async (request, response) => {
    const id = request.params.id
    const blog = {
        likes: request.body.likes,
    }

    const updatedBlog = await Blog.findByIdAndUpdate(id, blog)

    updatedBlog
        ? response.json(updatedBlog)
        : response.status(404).end()
})

module.exports = blogRouter
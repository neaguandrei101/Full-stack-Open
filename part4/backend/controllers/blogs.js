const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require("../models/user");

blogRouter.get('/api/blogs', async (request, response) => {
  const blogs = await Blog
      .find({}).populate('user', {username: 1, name: 1})
  response.json(blogs)
})

blogRouter.post('/api/blogs', async (request, response) => {
  const body = request.body
  const user = await User.findOne()

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

blogRouter.delete('/api/blogs/:id', async (request, response) => {
  const id = request.params.id

  const deleteMe = await Blog.deleteOne({ _id: id })
  response.json(deleteMe)
})

blogRouter.put('/api/blogs/:id', async (request, response) => {
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
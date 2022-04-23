const blogRouter = require('express').Router()
const Blog = require('../models/blog')

blogRouter.get('/api/blogs', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

blogRouter.post('/api/blogs', (request, response) => {
  const blog = new Blog(request.body)

  blog
    .save()
    .then(result => {
      response.status(201).json(result)
    })
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
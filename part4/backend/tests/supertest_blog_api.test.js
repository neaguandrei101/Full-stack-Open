const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const User = require("../models/user");
const helper = require("../utils/helper");

const api = supertest(app)

const initialBlogs = [
    {
        title: "Canonical string reduction",
        author: "Edsger W. Dijkstra",
        url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
        likes: 12
    },
    {
        title: "First class tests",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
        likes: 10
    }
]

describe('blogs', () => {
    beforeEach(async () => {
        await Blog.deleteMany({})
        let blogObject = new Blog(initialBlogs[0])
        await blogObject.save()
        blogObject = new Blog(initialBlogs[1])
        await blogObject.save()
    })

    test('correct amount of blogposts', async () => {
        const response = await api.get('/api/blogs')
            .expect(200)

        expect(response.body).toHaveLength(initialBlogs.length)
    })

    test('add a blog with post', async () => {
        const newBlog = {
            title: "First class tests",
            author: "Robert C. Martin",
            url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
            likes: 10
        }

        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const blogsAtEnd = await api.get('/api/blogs')
        expect(blogsAtEnd.body).toHaveLength(initialBlogs.length + 1)
    })

    test('delete a blog', async () => {
        const fistBlogArr = await Blog.find({title: "Canonical string reduction"})
        const id = fistBlogArr[0]._id

        await api
            .delete(`/api/blogs/${id}`)
            .expect(200)
            .expect('Content-Type', /application\/json/)

        const blogsAtEnd = await api.get('/api/blogs')
        expect(blogsAtEnd.body).toHaveLength(initialBlogs.length - 1)
    })
})

describe('when there is initially one user in db', () => {
    beforeEach(async () => {
        await User.deleteMany({})

        const passwordHash = await bcrypt.hash('sekret', 10)
        const user = new User({ username: 'root', passwordHash })

        await user.save()
    })

    test('desired behaviour for adding a new user', async () => {
        const usersAtStart = await helper.usersInDb()

        const newUser = {
            username: 'mluukkai',
            name: 'Matti Luukkainen',
            password: 'salainen',
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect({error: 'username must be unique'})

        const usersAtEnd = await helper.usersInDb()

        const sameName = usersAtEnd.filter(user => user.username === 'mluukkai')
        expect(sameName).toHaveLength(1)

        const badNewUser = {
            username: 'ab',
            name: 'Bad User',
            password: '12',
        }

        await api
            .post('/api/users')
            .send(badNewUser)
            .expect(400)
            .expect({error: 'username and password must be at least 3 characters long'})
    })
})

afterAll(() => {
    mongoose.connection.close()
})
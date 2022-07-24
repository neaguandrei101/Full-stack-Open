describe('Blog app', function () {
    beforeEach(function () {
        cy.request('POST', 'http://localhost:3003/api/testing/reset')
        cy.visit('http://localhost:3000')
    })

    describe('When logged in', function () {
        beforeEach(() => {
            cy.request('POST', 'http://localhost:3003/api/users', {
                'username': 'root',
                'name': 'Superuser',
                'password': 'saline'
            }).then(res => {
                expect(res.status).to.equal(201)
            })

            cy.login({username: 'root', password: 'saline'})
            cy.createBlog({title: 'cy test', author: 'bot', url: 'not in reality', likes: 0})
            cy.createBlog({title: 'another blog', author: 'anotherUser', url: 'not in reality2', likes: 0})

        })

        it('A blog can be created', function () {
            cy.contains('cy test')
        })

        it('users can like a blog',() => {
            cy.contains('cy test').find('button').filter(':contains("like")').click()
            cy.contains('1')
        })

        it('right user can delete a blog', () => {
            cy.contains('cy test').find('button').filter(':contains("remove")').click()
            cy.on('window:confirm', () => true)
            cy.contains('cy test').should('not.exist')

        })
    })

    describe('Login', function () {
        beforeEach(function () {
            cy.request('POST', 'http://localhost:3003/api/users', {
                'username': 'root',
                'name': 'Superuser',
                'password': 'saline'
            }).then(res => {
                expect(res.status).to.equal(201)
            })
        })

        it('succeeds with correct credentials', function () {
            cy.contains('login').click()
            cy.get('#username').type('root')
            cy.get('#password').type('saline')
            cy.get('#login-button').click()

            cy.contains('Superuser logged-in')
        })

        it('fails with wrong credentials', function () {
            cy.contains('login').click()
            cy.get('#username').type('wrong')
            cy.get('#password').type('user')
            cy.get('#login-button').click()

            cy.contains('login')
        })
    })
})
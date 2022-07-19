describe('Blog app', function () {
    beforeEach(function () {
        cy.request('POST', 'http://localhost:3003/api/testing/reset')
        cy.visit('http://localhost:3000')
    })

    it('Login form is shown', function () {
        cy.visit('http://localhost:3000')
        cy.contains('login')
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
const { test: base, expect, beforeAll } = require('@playwright/test')

const { SignUp } = require('./actions/signup/Signup')
const { Login } = require('./actions/login/Login')

const { Api } = require('./api/signup')

const test = base.extend({
    page: async ({ page }, use) => {
        const context = page

        context['signup'] = new SignUp (page)
        context['login'] = new Login(page)

        await use(context)
    },

    request: async ({ request }, use) => {
        const context = request

        context['api'] = new Api(request)

        await use(context)
    }
})

export { test, expect, beforeAll }    
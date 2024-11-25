const { test: base, expect, beforeAll } = require('@playwright/test')

const { SignUp } = require('./actions/signup/Signup')
const { Login } = require('./actions/login/Login')
const { Menu } = require('./actions/components/Menu')
const { Products } = require('./actions/products/Products')

const { Api } = require('./api/signup')

const test = base.extend({
    page: async ({ page }, use) => {
        const context = page

        context['signup'] = new SignUp (page)
        context['login'] = new Login(page)
        context['menu'] = new Menu(page)
        context['products'] = new Products(page)

        await use(context)
    },

    request: async ({ request }, use) => {
        const context = request

        context['api'] = new Api(request)

        await use(context)
    }
})

export { test, expect, beforeAll }    
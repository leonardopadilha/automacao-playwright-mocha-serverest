const { expect } = require('@playwright/test')

export class Login {
    constructor(page) {
        this.page = page
    }

    async visit(url) {
        await this.page.goto(url);
    }

    async formHaveText(name) {
        const nameForm = await this.page.locator('h1')
        await expect(nameForm).toHaveText(name)
    }

    async form(user) {
        await this.page.locator('input[placeholder$="email"]').type(user.email)
        await this.page.getByPlaceholder('Digite sua senha').type(user.password)
        await this.page.getByRole('button', { type: 'submit'}).click()
    }

    async alertHaveText(text) {
        const alert = await this.page.locator('.alert-dismissible button+span')
        await expect(alert).toHaveText(text)
    }

    async isLoggedIn() {
        const loggedUser = await this.page.getByTestId('logout')
        await expect(loggedUser).toBeVisible({ timeout: 7000 })
        await expect(loggedUser).toHaveText(`Logout`)
    }

    async showProducts() {
        const productTitle = await this.page.locator('.jumbotron h4')
        await expect(productTitle).toHaveText('Produtos')

        const productList = await this.page.locator('.container-fluid .espacamento')
        await expect(productList).toBeVisible()
    }
}
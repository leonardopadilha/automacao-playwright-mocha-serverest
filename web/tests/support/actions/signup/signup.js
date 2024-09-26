const { expect } = require('@playwright/test')

export class SignUp {
    constructor(page) {
        this.page = page
    }

    async visit(url) {
        await this.page.goto(url);
    }

    async register(user) {
        await this.form(user)
        await this.isAdmin(user)
        await this.submit()
    }

    async form(user) {
        await this.page.getByPlaceholder(/nome/).fill(user.nome)
        await this.page.getByPlaceholder('Digite seu email').fill(user.email)
        await this.page.getByPlaceholder('Digite sua senha').fill(user.password)
    }

    async isAdmin(user) {
        if (user.administrador) {
            await this.page.locator('#administrador').check()
        }
    }

    async submit() {
        await this.page.getByRole('button', { name: 'Cadastrar' }).click()
    }

    async alertHaveText(text) {
        const message = await this.page.locator('.alert-link')
        expect(message).toHaveText(text)
    }

    async alertError(text) {
        
    }
}
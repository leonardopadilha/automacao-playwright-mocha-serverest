const { expect } = require('@playwright/test')

export class Login {
    constructor(page) {
        this.page = page
    }

    async visit(url) {
        await this.page.goto(url);
    }

    async isLoggedIn() {
        const loggedUser = await this.page.getByTestId('logout')
        await expect(loggedUser).toBeVisible({ timeout: 7000 })
        await expect(loggedUser).toHaveText(`Logout`)
    }
}
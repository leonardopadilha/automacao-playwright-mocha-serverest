const { expect } = require('@playwright/test')

export class Products {
  constructor(page) {
    this.page = page
  }

  async productsScreen() {
    const text = await this.page.locator('h1')
    await expect(text).toHaveText('Cadastro de Produtos')
  }
}




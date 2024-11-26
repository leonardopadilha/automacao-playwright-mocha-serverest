const { expect } = require('@playwright/test')

export class Products {
  constructor(page) {
    this.page = page
  }

  async productsScreen() {
    const text = await this.page.locator('h1')
    await expect(text).toHaveText('Cadastro de Produtos')
  }

  async form(product) {
    await this.page.locator('input[placeholder$="nome do produto"]').type(product.nome)
    await this.page.getByTestId('preco').type(product.preco)
    await this.page.getByTestId('descricao').type(product.descricao)
    await this.page.getByTestId('quantity').type(product.quantidade)
  }

  async submit() {
    await this.page.getByTestId('cadastarProdutos').click()
  }

  async showProductList() {
    await expect(this.page).toHaveURL("https://front.serverest.dev/admin/cadastrarprodutos");

/*     const rows = await this.page.locator('.table-striped')
    await expect(rows).toContainText(product.nome) */
  }
}




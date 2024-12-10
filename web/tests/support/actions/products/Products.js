require('dotenv').config()
const path = require('path')

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

  async chooseImage() {
    const fileChooserPromise = this.page.waitForEvent('filechooser');
    await this.page.getByTestId('imagem').click();
    const fileChooser = await fileChooserPromise;
    await fileChooser.setFiles(path.join(__dirname, '../../../support/image/liga.jpg'));
  }

  async submit() {
    await this.page.getByTestId('cadastarProdutos').click()
  }

  async showProductList(product) {
    //const rows = await this.page.locator(`//*[contains(text(),'${product.nome}')]`)
    const rows = await this.page.locator('td', { hasText: product.nome})
    await expect(rows).toBeVisible()
    await expect(rows).toHaveText(product.nome)
  }

  async validImage(image) {
    const isImage = await this.page.locator('td', {hasText: image})
    //await expect(isImage).toHaveAttribute('src', image)
    await expect(isImage).toBeVisible()
  }

  async deleteProduct(product) {
    await this.page.locator(`//td[contains(text(), "${product.nome}")]/parent::tr//button[contains(text(), "Excluir")]`).click()

    await this.page.waitForLoadState('networkidle')
    const rows = await this.page.locator('td', { hasText: product.nome})
    await expect(rows).not.toBeVisible()
  }
}




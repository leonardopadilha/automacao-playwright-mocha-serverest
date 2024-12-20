const { test } = require('../../support')
const data = require('../../support/fixtures/users/users.json')
const buy = require('../../support/fixtures/products/products.json')

test.beforeEach(async ({ page }) => {
  await page.login.visit('/login')
  await page.login.formHaveText('Login')
})

test('Product without informations', async ({ request, page }) => {
  const user = data.admin_product_empty
  await request.api.deleteUser(user)
  await request.api.registerUser(user)
  await page.login.form(user)
  await page.login.isLoggedIn()

  const product = buy.empty
  await page.menu.clickOn('Cadastrar Produtos')
  await page.products.productsScreen()
  await page.products.form(product)
  await page.products.submit()
  await page.login.alertHaveText([
    'Nome é obrigatório',
    'Preco é obrigatório',
    'Descricao é obrigatório',
    'Quantidade é obrigatório'
  ])
})

test('Insert new product through the link and without image', async ({ request, page }) => {
  const user = data.admin_without_image
  await request.api.deleteUser(user)
  await request.api.registerUser(user)
  await page.login.form(user)
  await page.login.isLoggedIn()

  const product = buy.success
  await page.menu.clickOn('Cadastrar Produtos')
  await page.products.productsScreen()
  await page.products.form(product)
  await page.products.submit()
  await page.products.showProductList(product)
  await page.products.deleteProduct(product)
})

test('Insert new product through the link and with image', async ({ request, page }) => {
  const user = data.admin_with_image
  await request.api.deleteUser(user)
  await request.api.registerUser(user)
  await page.login.form(user)
  await page.login.isLoggedIn()

  const product = buy.success
  await page.menu.clickOn('Cadastrar Produtos')
  await page.products.productsScreen()
  await page.products.form(product)
  await page.products.chooseImage()
  await page.products.submit()
  await page.products.showProductList(product)
  await page.products.validImage('liga.jpg')
  await page.products.deleteProduct(product)
})
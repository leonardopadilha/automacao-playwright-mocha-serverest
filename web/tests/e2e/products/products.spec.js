const { test } = require('../../support')
const data = require('../../support/fixtures/users/users.json')
const buy = require('../../support/fixtures/products/products.json')

test('Insert new product through the link and without image', async ({ request, page }) => {
  await page.login.visit('/login')
  await page.login.formHaveText('Login')

  const user = data.admin
  const product = buy.success

  await request.api.deleteUser(user)
  await request.api.registerUser(user)
  await page.login.form(user)
  await page.login.isLoggedIn()

  await page.menu.clickOn('Cadastrar Produtos')
  await page.products.productsScreen()

  await page.products.form(product)
  await page.products.submit()
  await page.products.showProductList()
})
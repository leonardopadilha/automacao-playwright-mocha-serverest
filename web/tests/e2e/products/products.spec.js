const { test } = require('../../support')
const data = require('../../support/fixtures/users/users.json')

test('Insert new product through the link and without image', async ({ request, page }) => {
  await page.login.visit('/login')
  await page.login.formHaveText('Login')

  const user = data.admin
  await request.api.deleteUser(user)
  await request.api.registerUser(user)
  await page.login.form(user)
  await page.login.isLoggedIn()

  await page.menu.clickOn('Cadastrar Produtos')
  await page.products.productsScreen()
})
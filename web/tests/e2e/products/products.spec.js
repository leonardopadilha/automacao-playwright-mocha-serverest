const { test } = require('../../support')
const data = require('../../support/fixtures/users/users.json')
const buy = require('../../support/fixtures/products/products.json')

test.beforeEach(async ({ request, page }) => {
  await page.login.visit('/login')
  await page.login.formHaveText('Login')
})

test.only('Insert new product through the link and without image', async ({ request, page }) => {
  const user = data.admin
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

  const requestProduct = await request.get(`https://serverest.dev/produtos?nome=${product.nome}`)
  const bodyJson = await requestProduct.json()
  const id = bodyJson.produtos[0]._id
  const deleteProduct = await request.delete(`https://serverest.dev/produtos/${id}`)
  const responseDelete = await deleteProduct.json()
  console.log("Delete test" + JSON.stringify(responseDelete))
  //expect(deleteProduct.ok()).toBeTruthy()
})
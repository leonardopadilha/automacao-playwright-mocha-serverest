const { test } = require('../../support')
const data = require('../../support/fixtures/users/users.json')

test.beforeEach(async ({ page }) => {
  await page.login.visit('/login')
  await page.login.formHaveText('Login')
})

test('login empty', async ({  page }) => {
  const user = data.empty

  await page.login.form(user)
  await page.login.alertHaveText([
    'Email é obrigatório',
    'Password é obrigatório'
  ])
})

test('login with user non-admin', async ({ request, page }) => {
  const user = data.non_admin
  await request.api.deleteUser(user)
  await request.api.registerUser(user)

  await page.login.form(user)
  await page.login.isLoggedIn()
  await page.login.showProducts()
  await request.api.deleteUser(user)
})
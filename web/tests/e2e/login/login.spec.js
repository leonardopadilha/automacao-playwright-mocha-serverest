const { test } = require('../../support')
const data = require('../../support/fixtures/users/users.json')

test('login empty', async ({  page }) => {
  const user = data.empty

  await page.login.visit('/login')
  await page.login.formHaveText('Login')

  await page.login.form(user)
  await page.login.alertHaveText([
    'Email é obrigatório',
    'Password é obrigatório'
  ])

})
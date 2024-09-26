const { test } = require('../../support')
const data = require('../../support/fixtures/users/users.json')

test('Register non-admin user successfully', async ({ page, request }) => {  
  const user = data.non_admin

  await page.signup.visit('/cadastrarusuarios');
  await page.signup.register(user)
  await page.signup.alertHaveText('Cadastro realizado com sucesso')
  await page.login.isLoggedIn()

  await request.api.deleteUser(user)
});

test('Register admin user successfully', async ({ page, request }) => {  
  const user = data.admin

  await page.signup.visit('/cadastrarusuarios');
  await page.signup.register(user)
  await page.signup.alertHaveText('Cadastro realizado com sucesso')
  await page.login.isLoggedIn()

  await request.api.deleteUser(user)
});

const { expect } = require('@playwright/test')

export class Menu {
  constructor(page) {
    this.page = page
  }

  async clickOn(menu) {
    await this.page.locator('.text-light')
                      .filter({ hasText: menu})
                      .click()
  }
}
// @ts-check
const { test, expect } = require('@playwright/test');

test('has title', async ({ page }) => {
  await page.goto('/');

  // Expect a title "to contain" a substring.
  const title = page.locator(".font-robot")
  await expect(title).toHaveText("Loginn");
});

import {test, expect} from "@playwright/test";

test("has title", async ({page}) => {
  await page.goto("/");
  await expect(page).toHaveTitle(/Hulkastorus/);
});

test("shows hero headline and CTAs", async ({page}) => {
  await page.goto("/");
  const hero = page.getByTestId("hero");
  await expect(hero.getByTestId("headline")).toContainText(/Dev-Friendly Cloud Storage/i);
  await expect(hero.getByRole("link", {name: /Request Invite/i})).toBeVisible();
  await expect(hero.getByRole("link", {name: /Read the Docs/i})).toBeVisible();
});

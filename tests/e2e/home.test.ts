import {test, expect} from "@playwright/test";

test("has title", async ({page}) => {
  await page.goto("/");
  await expect(page).toHaveTitle(/Hulkastorus/);
});

test("shows hero headline and CTAs", async ({page}) => {
  await page.goto("/");
  await expect(page.getByTestId("headline")).toContainText(/Dev-Friendly Cloud Storage/i);
  await expect(page.getByRole("link", {name: /Request Invite/i})).toBeVisible();
  await expect(page.getByRole("link", {name: /Read the Docs/i})).toBeVisible();
});

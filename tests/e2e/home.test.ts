import {test, expect} from "@playwright/test";

test("has title", async ({page}) => {
  await page.goto("/");

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Hulkastorus/);
});

test("deploy now button", async ({page}) => {
  await page.goto("/");
  const deployNowButton = page.getByText("Deploy now");
  await expect(deployNowButton).toBeVisible();
});

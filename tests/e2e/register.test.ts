import {test as base, expect} from "@playwright/test";

// Only run when explicitly enabled to avoid env flakiness
const ENABLED = !!process.env.DATABASE_URL && process.env.E2E_REGISTER === "1";
const test = ENABLED ? base : base.skip;

test("registers a new user via form", async ({page}) => {
  const email = `user_${Date.now()}@example.com`;

  await page.goto("/register");

  await page.getByLabel("First Name").fill("Test");
  await page.getByLabel("Last Name").fill("User");
  await page.getByLabel("Email").fill(email);
  await page.getByLabel("Password").fill("password-123");
  await page.getByLabel("Confirm").fill("password-123");
  await page.getByLabel("Invite Code").fill("WELCOMETOTHEPARTYPAL");

  await page.getByRole("button", {name: /Create Account/i}).click();

  await expect(page.getByText(/Account created\. You can now log in\./i)).toBeVisible();
});

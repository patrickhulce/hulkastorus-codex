import {hashPassword, verifyPassword} from "@/lib/passwords";

describe("password hashing", () => {
  it("hashes and verifies correctly", async () => {
    const pw = "s3cret-123";
    const hashed = await hashPassword(pw);
    expect(hashed).toMatch(/^scrypt:[A-Za-z0-9+/=]+:[A-Za-z0-9+/=]+$/);
    await expect(verifyPassword(pw, hashed)).resolves.toBe(true);
    await expect(verifyPassword("wrong", hashed)).resolves.toBe(false);
  });
});


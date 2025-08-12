/** @jest-environment node */
import {GET} from "@/app/api/hello/route";

describe("hello", () => {
  it("should return hello", async () => {
    const response = await GET();
    expect(response.status).toBe(200);
    expect(await response.text()).toBe("Hello, world!");
  });
});

import {testApiHandler} from "next-test-api-route-handler";
import * as appHandler from "@/app/api/hello/route";

describe("hello", () => {
  it("should return hello", async () => {
    await testApiHandler({
      appHandler,
      test: async ({fetch}) => {
        const response = await fetch();
        expect(response.status).toBe(200);
        expect(await response.text()).toBe("Hello, world!");
      },
    });
  });
});

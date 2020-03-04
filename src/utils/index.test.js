import { apiUrlBase } from "./index";

describe("Utils functions", () => {
  describe("apiUrlBase()", () => {
    it("returns prod string", () => {
      expect(apiUrlBase).toEqual("https://api.jimsegal.com");
    });
  });
});

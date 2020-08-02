import { complementaryColor, randomHexColor, textColor } from "./color";

describe("UTILS - Color", () => {
  describe("randomHexColor", () => {
    // mocking math.random to not be random
    const mockMath = Object.create(global.Math);
    mockMath.random = () => 0.5;
    global.Math = mockMath;

    it("outputs hex value", () => {
      expect(randomHexColor()).toEqual("7fffff");
    });
  });

  describe("complementaryColor", () => {
    it("outputs oppisite hex code", () => {
      expect(complementaryColor("ffffff")).toEqual("000000");
    });
  });

  describe("textColor", () => {
    describe("when dark hex passed", () => {
      it("returns light color", () => {
        expect(textColor("000000")).toEqual("efefef");
      });
    });
    describe("when light hex passed", () => {
      it("returns dark color", () => {
        expect(textColor("ffffff")).toEqual("444444");
      });
    });
  });
});

const {
  chamberTitles,
  individualChamberTitle,
  otherChamber,
} = require("./utils");

describe("Congress - Utils", () => {
  describe("chamberTitles", () => {
    it("outputs mapped value", () => {
      expect(chamberTitles("house")).toEqual("Representatives");
      expect(chamberTitles("senate")).toEqual("Senators");
      expect(chamberTitles("other")).toEqual("Members");
    });
  });

  describe("individualChamberTitle", () => {
    it("outputs mapped value", () => {
      expect(individualChamberTitle("house")).toEqual("Representative");
      expect(individualChamberTitle("senate")).toEqual("Senator");
      expect(individualChamberTitle("other")).toEqual("Member");
    });
  });

  describe("otherChamber", () => {
    it("outputs other chamber name", () => {
      expect(otherChamber("house")).toEqual("senate");
      expect(otherChamber("senate")).toEqual("house");
      expect(otherChamber("other")).toEqual("house");
    });
  });
});

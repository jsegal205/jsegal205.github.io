const {
  chamberTitles,
  individualChamberTitle,
  partyName,
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

  describe("partyName", () => {
    it("outputs other chamber name", () => {
      expect(partyName("d")).toEqual("Democrat");
      expect(partyName("D")).toEqual("Democrat");
      expect(partyName("r")).toEqual("Republican");
      expect(partyName("R")).toEqual("Republican");
      expect(partyName("i")).toEqual("Independent");
      expect(partyName("I")).toEqual("Independent");
      expect(partyName("o")).toEqual("");
    });
  });
});

export const chamberTitles = (chamber) => {
  switch (chamber) {
    case "house":
      return "Representatives";
    case "senate":
      return "Senators";
    default:
      return "Members";
  }
};

export const individualChamberTitle = (chamber) => {
  const pluralTitle = chamberTitles(chamber);
  return pluralTitle.substring(0, pluralTitle.length - 1);
};

export const otherChamber = (chamber) =>
  chamber === "house" ? "senate" : "house";

export const partyName = (abbreviation) => {
  switch (abbreviation.toLowerCase()) {
    case "d":
      return "Democrat";
    case "r":
      return "Republican";
    case "i":
      return "Independent";
    default:
      return "";
  }
};

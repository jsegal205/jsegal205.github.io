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

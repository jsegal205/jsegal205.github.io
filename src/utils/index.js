export const apiUrlBase = "https://api.jimsegal.com";
// export const apiUrlBase = "http://localhost:8001";

export const projectInfo = [
  {
    absolute: true,
    link: "https://jimsegal.com",
    subtitle: "",
    title: "JimSegal.com",
  },
  {
    link: "/congress",
    subtitle: "Some fun data surrounding the current congressional sesssion",
    title: "Congress",
  },
  {
    link: "/isJimWearingShorts",
    subtitle: "A site to predict if Jim is wearing shorts or not",
    title: "Is Jim Wearing Shorts?",
  },
  {
    link: "mountaingoat",
    subtitle: "Digital game",
    title: "Mountain Goat Game",
  },
  {
    link: "/recipes",
    subtitle: "A bunch of recipes that I frequent and wanted to show off",
    title: "Recipes",
  },
  {
    link: "/spacex",
    subtitle: "A countdown timer until the next launch of a Space X rocket",
    title: "Space X",
  },
  {
    absolute: true,
    link: "https://jimsegal.com/IsChicagoColderThanAnchorage/",
    subtitle:
      "A way to quickly tell if Chicago, IL is colder than Anchorage, AK",
    title: "Is Chicago Colder Than Anchorage?",
  },
  {
    absolute: true,
    link: "https://jimsegal.com/readinglist/",
    subtitle: "Books I have read or listened to",
    title: "Reading List",
  },
  {
    absolute: true,
    link: "https://jimsegal.com/travel/",
    subtitle: "Places that I have traveled since graduating college in 2008",
    title: "Travels",
  },
  {
    absolute: true,
    link: "https://jimsegal.com/tabletop/",
    subtitle: "My collection of table top games",
    title: "Tabletop Games",
  },
  {
    link: "/dogetracker",
    subtitle:
      "Get the current price of the hottest LEGITIMATE cryptocurrency out there",
    title: "Dogecoin Price Tracker",
  },
].sort(function (a, b) {
  const titleA = a.title.toUpperCase();
  const titleB = b.title.toUpperCase();
  if (titleA === "JIMSEGAL.COM" || titleB === "JIMSEGAL.COM") {
    return 1;
  }
  if (titleA < titleB) {
    return -1;
  }
  if (titleA > titleB) {
    return 1;
  }

  return 0;
});

const prefix = "/courier";

export const courierRoutes = [
  {
    title: "Management",
    items: [
      {
        title: "Profile",
        url: `${prefix}`,
      },
      {
        title: "Assigned Shipments",
        url: `${prefix}/assigned-shipments`,
      },
      {
        title: "Stats",
        url: `${prefix}/stats`,
      },
    ],
  },
  {
    title: "App Settings",
    items: [
      {
        title: "Routing",
        url: "#",
      },
      {
        title: "Data Fetching",
        url: "#",
      },
    ],
  },
];

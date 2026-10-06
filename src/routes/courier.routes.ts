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
        title: "Assigned",
        url: `${prefix}/approve-courier`,
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

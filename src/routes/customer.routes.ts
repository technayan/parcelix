const prefix = "/customer";

export const customerRoutes = [
  {
    title: "Management",
    items: [
      {
        title: "Profile",
        url: `${prefix}`,
      },
      {
        title: "My Shipments",
        url: `${prefix}/shipments`,
      },
      {
        title: "My Transactions",
        url: `${prefix}/transactions`,
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

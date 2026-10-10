const prefix = "/dashboard";

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
        url: `${prefix}/my-transactions`,
      },
    ],
  },
];

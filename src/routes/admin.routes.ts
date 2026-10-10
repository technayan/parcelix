const prefix = "/admin";

export const adminRoutes = [
  {
    title: "Management",
    items: [
      {
        title: "Profile",
        url: `${prefix}`,
      },
      {
        title: "Courier Management",
        url: `${prefix}/courier-management`,
      },
      {
        title: "Shipment Management",
        url: `${prefix}/shipment-management`,
      },
      {
        title: "User Management",
        url: `${prefix}/user-management`,
      },
      {
        title: "Statistics",
        url: `${prefix}/statistics`,
      },
    ],
  },
];

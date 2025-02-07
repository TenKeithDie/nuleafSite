// config/site.ts
export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "NuLeaf",
  description: "Environmental, Landscape and Tourism Planning Services",
  navItems: [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "Our Services",
      href: "/services",
    },
    {
      label: "Meet The Team",
      href: "/team",
    },
    {
      label: "Our Clients",
      href: "/clients",
    },
    {
      label: "Downloads",
      href: "/downloads",
    },
    {
      label: "Contact",
      href: "/contact",
    },
    {
      label: "Admin",
      href: "/admin-login",
    }

  ],
  navMenuItems: [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "Our Services",
      href: "/services",
    },
    {
      label: "Meet The Team",
      href: "/team",
    },
    {
      label: "Our Clients",
      href: "/clients",
    },
    {
      label: "Downloads",
      href: "/downloads",
    },
    {
      label: "Contact",
      href: "/contact",
    },
    {
      label: "Admin",
      href: "/admin-login",
    }
  ]
};
export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "Next.js + HeroUI",
  description: "Make beautiful websites regardless of your design experience.",
  navItems: [
    {
      label: "Songs",
      href: "/songs",
    },
    {
      label: "Artists",
      href: "/artists",
    },
    {
      label: "Playlists",
      href: "/playlists",
    },
  ],
  navPersonal: [
    {
      label: "Login",
      href: "/login",
    },
    {
      label: "Register",
      href: "/register",
    },
    {
      label: "Upload",
      href: "/upload",
    },
    {
      label: "Profile",
      href: "/profile",
    },
  ],
  links: {
    github: "https://github.com/heroui-inc/heroui",
    discord: "https://discord.gg/9b6yyZKmH4",
  },
};

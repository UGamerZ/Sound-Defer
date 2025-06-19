import { siteConfig } from "@/config/site";
import { NavbarItem, NavbarMenuItem } from "@heroui/navbar";
import clsx from "clsx";
import NextLink from "next/link";
import { link as linkStyles } from "@heroui/theme";
import Link from "next/link";
import { memo } from "react";
import { observer } from "mobx-react-lite";
import { loggedState } from "@/store/is-logged-in";

export const NavPersonal = memo(
  observer(() => {
    return (
      <>
        <NavbarItem className="hidden lg:flex">
          <NextLink
            className={clsx(
              linkStyles({ color: "foreground" }),
              "data-[active=true]:text-primary data-[active=true]:font-medium",
            )}
            color="foreground"
            href={siteConfig.navPersonal[loggedState.isLogged ? 2 : 0].href}
          >
            {siteConfig.navPersonal[loggedState.isLogged ? 2 : 0].label}
          </NextLink>
        </NavbarItem>
        <NavbarItem className="hidden lg:flex">
          <NextLink
            className={clsx(
              linkStyles({ color: "foreground" }),
              "data-[active=true]:text-primary data-[active=true]:font-medium",
            )}
            color="foreground"
            href={siteConfig.navPersonal[loggedState.isLogged ? 3 : 1].href}
          >
            {siteConfig.navPersonal[loggedState.isLogged ? 3 : 1].label}
          </NextLink>
        </NavbarItem>
      </>
    );
  }),
);

export const NavPersonalMenu = memo(
  observer(() => {
    return (
      <>
        {siteConfig.navItems
          .concat(
            loggedState.isLogged
              ? siteConfig.navPersonal.slice(2)
              : siteConfig.navPersonal.slice(0, 2),
          )
          .map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
              <Link color="primary" href={item.href}>
                {item.label}
              </Link>
            </NavbarMenuItem>
          ))}
      </>
    );
  }),
);

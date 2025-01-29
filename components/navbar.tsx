import {
  Navbar as HeroUINavbar,
  NavbarContent,
  NavbarMenu,
  NavbarMenuToggle,
  NavbarBrand,
  NavbarItem,
  NavbarMenuItem,
} from "@heroui/navbar";
import { Button } from "@heroui/button";
import { Link } from "@heroui/link";
import { link as linkStyles } from "@heroui/theme";
import NextLink from "next/link";
import clsx from "clsx";
import { ThemeSwitch } from "@/components/theme-switch";
import { Leaf } from "lucide-react";
import { siteConfig } from "@/config/site";

export const Navbar = () => {
  return (
    <HeroUINavbar 
      maxWidth="xl" 
      position="sticky"
      className="bg-navbar backdrop-blur-md border-b border-primary/10"
    >
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand as="li" className="gap-3 max-w-fit">
          <NextLink className="flex justify-start items-center gap-2" href="/">
            <Leaf className="text-primary h-6 w-6" />
            <p className="font-bold text-inherit text-xl">NuLeaf</p>
          </NextLink>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent 
        className="hidden lg:flex basis-1/5 sm:basis-full" 
        justify="center"
      >
        <ul className="flex gap-8 justify-center">
          {siteConfig.navItems.map((item) => (
            <NavbarItem key={item.href}>
              <NextLink
                className={clsx(
                  linkStyles({ color: "foreground" }),
                  "data-[active=true]:text-primary data-[active=true]:font-medium hover:text-primary transition-colors",
                  " text-sm tracking-wide font-medium"
                )}
                color="foreground"
                href={item.href}
              >
                {item.label}
              </NextLink>
            </NavbarItem>
          ))}
        </ul>
      </NavbarContent>

      <NavbarContent className="sm:flex basis-1/5" justify="end">
        <NavbarItem>
          <ThemeSwitch />
        </NavbarItem>
        <NavbarItem className="hidden md:flex">
          <Button
            as={Link}
            className="text-sm font-normal bg-primary text-white"
            href="/contact"
            variant="flat"
          >
            Get In Touch
          </Button>
        </NavbarItem>
      </NavbarContent>

      <NavbarMenu className="bg-background/95 backdrop-blur-md">
        <div className="mx-4 mt-2 flex flex-col gap-2">
          {siteConfig.navMenuItems.map((item) => (
            <NavbarMenuItem key={item.href}>
              <Link
                className={clsx(
                  "w-full",
                  "data-[active=true]:text-primary data-[active=true]:font-medium",
                  "uppercase text-sm tracking-wide"
                )}
                href={item.href}
                size="lg"
              >
                {item.label}
              </Link>
            </NavbarMenuItem>
          ))}
        </div>
      </NavbarMenu>
    </HeroUINavbar>
  );
};
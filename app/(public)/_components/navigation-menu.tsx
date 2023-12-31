"use client"

import * as React from "react"
import Link from "next/link"

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import ListItem from "./nav-items"
import { BadgeDollarSign, Search } from "lucide-react"

const components: { title: string; href: string; description: string }[] = [
  {
    title: "Alert Dialog",
    href: "/docs/primitives/alert-dialog",
    description:
      "A modal dialog that interrupts the user with important content and expects a response.",
  },
  {
    title: "Hover Card",
    href: "/docs/primitives/hover-card",
    description:
      "For sighted users to preview content available behind a link.",
  },
  {
    title: "Progress",
    href: "/docs/primitives/progress",
    description:
      "Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.",
  },
  {
    title: "Scroll-area",
    href: "/docs/primitives/scroll-area",
    description: "Visually or semantically separates content.",
  },
  {
    title: "Tabs",
    href: "/docs/primitives/tabs",
    description:
      "A set of layered sections of content—known as tab panels—that are displayed one at a time.",
  },
  {
    title: "Tooltip",
    href: "/docs/primitives/tooltip",
    description:
      "A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.",
  },
]

export function NavMenu() {
  return (
    <div className=" justify-between   bg-background shadow
    dark:bg-[#1F1F1F] px-3 py-2 w-full flex items-center gap-x-4">
      <div>
        LOGO
      </div>
      <div>
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Investing</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                  <li className="row-span-3">
                    <NavigationMenuLink asChild>
                      <a
                        className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                        href="/"
                      >
                        <div className="h-6 w-6">
                            <BadgeDollarSign className="h-6 w-6" />
                        </div>
                        {/* <Icons.logo className="h-6 w-6" /> */}
                        <div className="mb-2 mt-4 text-lg font-medium">
                          Stocks
                        </div>
                        <p className="text-sm leading-tight text-muted-foreground  ">
                        Stocks, each unit of which is called a share, represent ownership of a company. 
                        </p>
                      </a>
                    </NavigationMenuLink>
                  </li>
                  <ListItem href="/docs" title="Bonds">
                    {/* Re-usable components built using Radix UI and Tailwind CSS. */}
                  </ListItem>
                  <ListItem href="/docs/installation" title="ETFs">
                    {/* How to install dependencies and structure your app. */}
                  </ListItem>
                  <ListItem href="/docs/primitives/typography" title="Options & Derivatives">
                    {/* Styles for headings, paragraphs, lists...etc */}
                  </ListItem>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
                <Link href="/docs" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    About us
                  </NavigationMenuLink>
                </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
             
                <NavigationMenuLink className="flex items-center justify-center cursor-pointer">
                  
                <input
                    className=" cursor-pointer flex-1 px-2 text-xs border rounded-l-md h-8
                      bg-muted truncate "
                    placeholder={"Search everything here"}
                    disabled
                />
                  <div className="h-8 w-8 flex items-center justify-center rounded-r px-1 bg-muted">
                    <Search className=" h-4 " />
                  </div>
                </NavigationMenuLink>
              
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
      <div>

      </div>
    </div>
  )
}



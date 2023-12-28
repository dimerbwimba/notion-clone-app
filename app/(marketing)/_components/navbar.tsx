"use client"

import { useConvexAuth } from "convex/react";
import { SignInButton, SignUpButton , UserButton } from "@clerk/clerk-react";
import Link from "next/link";


import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import { useScrollTop } from "@/hooks/use-scroll-top";
import { cn } from "@/lib/utils";
import { Logo } from "./logo";
import { Spinner } from "@/components/spinner";

const Navbar = () => {
    const { isAuthenticated, isLoading} = useConvexAuth()
    const scrolled = useScrollTop()    
    return ( 
        <div className={cn("z-50 bg-background dark:bg-[#1F1F1F] fixed top-0 flex items-center w-full p-6" , scrolled && "shadow-md")}>
            <Logo/>
            <div className="md:ml-auto md:justify-end justify-between w-full flex items-center gap-x-2">
                {
                    isLoading && (
                        <Spinner/>
                    )
                }
                {!isAuthenticated && !isLoading &&(
                    <>
                        <SignUpButton mode="modal">
                            <Button  size={"sm"}> 
                                Get Joition free
                            </Button>
                        </SignUpButton>
                        <SignInButton mode="modal">
                            <Button variant={"ghost"} size={"sm"}> 
                                Login
                            </Button>
                        </SignInButton>
                    </>
                )}
                {isAuthenticated && !isLoading && (
                    <>
                        <Button variant={"ghost"} size={"sm"}>
                            <Link href={"/documents"}>
                                Enter Joition
                            </Link>
                        </Button>
                        <UserButton afterSignOutUrl="/"/>
                    </>
                )}
            <ModeToggle/>
            </div>
        </div>
     );
}
 
export default Navbar;
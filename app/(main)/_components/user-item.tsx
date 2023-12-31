"use client"

import { Check, ChevronsLeftRight } from "lucide-react";
import { SignOutButton, useUser } from "@clerk/clerk-react";


import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { 
    DropdownMenu, 
    DropdownMenuContent ,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";


const UserItem = () => {
    const {user} = useUser()
    return ( 
        <div className="w-full  hover:bg-primary/5">
            <DropdownMenu>
                <DropdownMenuTrigger>
                    <div role="button" className="flex items-center text-sm p-3 
                    ">
                        <div className=" gap-x-2 flex items-center max-w-[150px]">
                            <Avatar className="h-5 w-5">
                                <AvatarImage src={user?.imageUrl}/>
                            </Avatar>
                            <span className=" text-start font-medium line-clamp-1">{user?.fullName}&apos;s Joition</span>
                        </div>
                        <ChevronsLeftRight className=" rotate-90 ml-2 text-muted-foreground h-4 w-4"/>
                    </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                 className=" w-80"
                 align="start"
                 alignOffset={11}
                 forceMount
                >
                    <div className=" flex flex-col space-y-4 p-2">
                        <p className=" text-xs font-medium leading-none text-muted-foreground">
                            {user?.emailAddresses[0].emailAddress}
                        </p>
                        <div className="flex justify-between items-center cursor-pointer hover:bg-primary/5 gap-x-2 rounded-md">
                            <div className="flex items-center">
                                <div className=" rounded-md bg-secondary p-1">
                                    <Avatar className="h-8 w-8">
                                        <AvatarImage src={user?.imageUrl}/>
                                    </Avatar>
                                </div>
                                <div className=" space-y-1 ">
                                    <p className=" text-sm line-clamp-1">
                                        {user?.fullName}&apos;s Joition
                                    </p>
                                    <p className=" text-xs text-muted-foreground line-clamp-1">
                                        Free Plan 1 Member
                                    </p>
                                </div>
                            </div>
                            <div className=" mr-2">
                                <Check className="w-4 h-4"/>
                            </div>
                        </div>
                    </div>
                    <DropdownMenuSeparator/>
                    <DropdownMenuItem className=" w-full cursor-pointer text-muted-foreground">
                        <SignOutButton>
                            Log out
                        </SignOutButton>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
     );
}
 
export default UserItem;
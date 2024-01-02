"use client";

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { cn } from "@/lib/utils";
import { useUser } from "@clerk/clerk-react";
import { useMutation } from "convex/react";
import { ChevronDown, ChevronRight, Globe, LucideIcon, MoreHorizontal, Plus, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "sonner";

interface ItemProps {
    id?:Id<"categories">;
    label:String;
    onClick? : ()=>void ;
    icon: LucideIcon
    isPublished? : boolean;
    documentIcon?:string;
    active?:boolean;
    expanded?:boolean;
    isSearch?:boolean;
    level?:number;
    onExpand?:()=>void
}



const Item = ({
    id,
    label, 
    onClick, 
    icon:Icon ,
    isPublished,
    documentIcon,
    active,
    expanded,
    isSearch,
    level=0,
    onExpand,
}: ItemProps) => {

    const {user} = useUser()
    const router = useRouter()
    const archive = useMutation(api.categories.archive)

    const onArchive = (event:React.MouseEvent<HTMLDivElement, MouseEvent>)=>{

        event.stopPropagation();

        if (!id) return;

        const  promise = archive({id})   

        toast.promise(promise,{
            loading:"Moving to trash...",
            success:"Note moved to trash !",
            error:"Fail to move note to trash !"
        });

        
    }

    const handleExpand = ( event: React.MouseEvent<HTMLDivElement, MouseEvent> )=>{
        event.stopPropagation();
        onExpand?.();
    }


    const ChevronIcon = expanded ? ChevronDown:ChevronRight

    return ( 
    <div 
        onClick={onClick} 
        role="button" 
        style={{ 
            paddingLeft: level ? `${(level * 12) + 12}px`: "12px"}}
        className={cn("group min-h-[27px] text-sm py-1 pr-3 w-full hover:bg-primary/5 text-muted-foreground flex items-center font-medium" , 
            active && "bg-primary/5 text-primary font-bold",
            isPublished  && "text-green-700"
        )}
    >
        {!!id &&(
            <div onClick={handleExpand} role="button" className=" h-full rounded-sm hover:bg-neutral-300 dark:bg-neutral-600 dark:hover:bg-neutral-500  mr-1">
                <ChevronIcon className="h-4 w-4 chrink-0 text-muted-foreground/50"/>
            </div>
        )}
        {
            documentIcon ? (
                <div className=" shrink-0 mr-2 text-[18px]">
                    {documentIcon}
                </div>
            ):(
                <Icon className=" shrink-0 h-[18px] w-[18px] mr-2 text-muted-foreground"/>
            )
        }
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger className=" truncate">
                    <span className=" truncate">
                        {label} 
                    </span>
                </TooltipTrigger>
                <TooltipContent className=" text-sm">
                    <p className=" text-sm">
                        {label} 
                    </p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
        {
            isSearch && (
                <kbd className=" ml-auto pointer-events-none  inline-flex 
                h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono 
                 text-[10px] font-medium text-muted-foreground opacity-100">
                    <span className=" text-xs">CTRL</span>k
                </kbd>
            )
        }
        {
            !!id && (
                <div className=" ml-auto flex items-center gap-x-2">
                    <DropdownMenu>
                        <DropdownMenuTrigger
                            onClick={(e)=>e.stopPropagation()}
                            asChild
                        >
                            <div role="button" className="  opacity-0 group-hover:opacity-100 
                    h-full ml-auto rounded-sm hover:bg-neutral-300 dark:hover:bg-neutral-600" >
                                <MoreHorizontal className="h-4 w-4 text-muted-foreground"/>
                            </div>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                            className="w-60"
                            align="start"
                            side="right"
                            forceMount
                        >
                            <DropdownMenuItem onClick={onArchive}>
                                <Trash className="h-4 w-4 mr-2"/>
                                Delete
                            </DropdownMenuItem>
                            <DropdownMenuSeparator/>
                            <div className=" text-xs text-muted-foreground p-2">
                                Last edited by : {user?.fullName}
                            </div>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            )
        }
    </div>  
    );
}
 
export default Item;

Item.Skeleton = function ItemSkeleton({level}:{level?:number}){
    return (
        <div 
            style={{
                paddingLeft: level ? `${(level *12 ) + 25}px`:"12px"
            }}
            className="flex gap-x-2 py-[3px]"
        >   
            <Skeleton  className="h-4 w-4" />
            <Skeleton  className="h-4 w-[30%]" />
        </div>
    )
}
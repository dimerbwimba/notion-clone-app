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

interface DocumentProps {
    id?: Id<"documents">;
    label: String;
    onClick?: () => void;
    icon: LucideIcon
    isPublished?: boolean;
    documentIcon?: string;
    active?: boolean;
    expanded?: boolean;
    isSearch?: boolean;
    level?: number;
    onExpand?: () => void
}



const Document = ({
    id,
    label,
    onClick,
    icon: Icon,
    isPublished,
    documentIcon,
    active,
    expanded,
    isSearch,
    level = 0,
    onExpand,
}: DocumentProps) => {

    const { user } = useUser()
    const router = useRouter()
    const archive = useMutation(api.documents.archive)
    const update = useMutation(api.documents.update)
    
    const onArchive = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        event.stopPropagation();
        if (!id) return;
        const promise = archive({ id })
        toast.promise(promise, {
            loading: "Moving to trash...",
            success: "Note moved to trash !",
            error: "Fail to move note to trash !"
        });
    }

    const handleExpand = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        event.stopPropagation();
        onExpand?.();
    }

    const onPublish = () => {
       if (!isPublished) {
            const promise = update({
                id: id as Id<"documents">,
                isPublished:true
            })
            toast.promise(promise,{
                success:"Document published successfully !",
                loading:"Publishing...",
                error:"Fail to publish the document !"
            })
       }else{
           const promise = update({
               id: id as Id<"documents">,
               isPublished:false
           })
           toast.promise(promise,{
               success:"Document unpublished successfully !",
               loading:"Publishing...!",
               error:"Fail to unpublish the document !"
           })
       }


    }
    
    const ChevronIcon = expanded ? ChevronDown : ChevronRight

    return (
        <div
            onClick={onClick}
            role="button"
            style={{ paddingLeft: level ? `${(level * 12) + 12}px` : "12px" }}
            className={cn("group w-full min-h-[27px]  text-lg py-1 pr-3 hover:bg-primary/5 text-muted-foreground flex items-center font-medium",
                isPublished && "text-green-700"
            )}
        >
            {!!id && (
                <div onClick={handleExpand} role="button" className=" h-full rounded-sm hover:bg-neutral-300 dark:bg-neutral-600 dark:hover:bg-neutral-500  mr-1">
                    <ChevronIcon className="h-4 w-4 chrink-0 text-muted-foreground/50" />
                </div>
            )}
            {
                documentIcon ? (
                    <div className=" shrink-0 mr-2 text-[18px]">
                        {documentIcon}
                    </div>
                ) : (
                    <Icon className=" shrink-0 h-[18px] w-[18px] mr-2 text-muted-foreground" />
                )
            }
            
            <span className=" truncate">
                {label}
            </span>
             
            {!!id && (
                <div className=" ml-auto flex items-center gap-x-2">
                    <DropdownMenu>
                        <DropdownMenuTrigger
                            onClick={(e) => e.stopPropagation()}
                            asChild
                        >
                            <div role="button" className="  opacity-0 group-hover:opacity-100 
                    h-full ml-auto rounded-sm hover:bg-neutral-300 dark:hover:bg-neutral-600" >
                                <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
                            </div>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                            className="w-60"
                            align="start"
                            side="right"
                            forceMount
                        >
                            <DropdownMenuItem onClick={onArchive}>
                                <Trash className="h-4 w-4 mr-2" />
                                Delete
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={onPublish}>
                                <Trash className="h-4 w-4 mr-2" />
                                { !isPublished ? "Publish" : "Unpublished"}
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
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

export default Document;

Document.Skeleton = function ItemSkeleton({ level }: { level?: number }) {
    return (
        <div
            style={{
                paddingLeft: level ? `${(level * 12) + 25}px` : "12px"
            }}
            className="flex gap-x-2 py-[3px]"
        >
            <Skeleton className="h-4 w-4" />
            <Skeleton className="h-4 w-[30%]" />
        </div>
    )
}
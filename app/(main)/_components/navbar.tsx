"use client"

import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";

import { MenuIcon } from "lucide-react";
import { useQuery } from "convex/react";
import { useParams } from "next/navigation";
import Title from "./title";
import Banner from "./banner";
import {Menu} from "./menu";
import Publish from "./publish";

interface NavbarProps {
    isCollapsed:boolean;
    onResetWidth : ()=>void;
}

const Navbar = ({ isCollapsed, onResetWidth} : NavbarProps) => {

    const params = useParams()
    const category = useQuery(api.categories.getById,{
        Id : params.categoryId as Id<"categories">
    })
    
    if (category === undefined) {
        return (
            <nav className="bg-background dark:bg-[#1F1F1F] px-3 py-2 flex justify-between items-center gap-x-4 ">
                <Title.Skeleton/>
                <div className="flex  items-center gap-x-2">
                    <Menu.Skeleton/>
                </div>
            </nav>
        );
    }

    if (category === null) {
        return null;
    }

    return ( 
        <>
            <nav className=" bg-background dark:bg-[#1F1F1F] px-3 py-2 w-full flex items-center gap-x-4 ">
                {isCollapsed && ( 
                    <MenuIcon
                        role="button"
                        onClick={onResetWidth}
                        className="h-6 w-6 text-muted-foreground"
                    />                   
                )}
                <div className=" flex items-center justify-between w-full ">
                    <Title initialData={category} />
                    <div className="flex items-center gap-x-2">
                        <Publish initialData={category}/>
                        <Menu categoryId={category._id} />
                    </div>
                </div>
            </nav>

            {
                category.isArchived && (
                    <Banner categoryId = {category._id} />
                )
            }
        </>
     );
}
 
export default Navbar;
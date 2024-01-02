"use client"

import { api } from "@/convex/_generated/api";
import { Doc } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";
import Image from "next/image";
import Card from "./card";

const CardList = () => {
    const documents = useQuery(api.blog.blogDoc)
    if (documents === undefined) {
        return (
            <>
               Loading...
            </>
        )
    }
    return ( 
        <div className=" grid grid-cols-2 gap-4 text-start">
            {documents.map((document)=>(
                <>
                    <Card document={document}/>
                </>
            ))}
        </div>
     );
}
 
export default CardList;
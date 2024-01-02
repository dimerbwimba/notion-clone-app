"use client";

import Image from "next/image";
import { useUser } from "@clerk/clerk-react";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";

import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";
import { useParams, useRouter } from "next/navigation";
import { Id } from "@/convex/_generated/dataModel";
import DocumentList from "@/app/(main)/_components/document-list";

const CategoryIdPage = () => {
     const router = useRouter()
    const {user} = useUser()
    const params = useParams()
    const create = useMutation(api.documents.create)

    const onCreate = ()=>{
     const promise = create({
        title:"Untitled",
        categoryId: params.categoryId as  Id<"categories">
     });

     toast.promise(promise,{
          loading:"Creating a new document...",
          success:"New document created",
          error:"Failedd to create a new document"
     })
    }

    return ( 
        <div className=" h-full flex flex-col  space-y-4">
          
               <div className=" w-full mt-20 md:max-w-3xl lg:max-w-xl mx-auto ">
                    <Button variant={"outline"} className="w-full mb-10" onClick={onCreate}>
                         <PlusCircle className="h-4 w-4 mr-2"/>
                         Create a new document
                    </Button>

                    <DocumentList/>
               </div>
               

        </div>
     );
}
 
export default CategoryIdPage;
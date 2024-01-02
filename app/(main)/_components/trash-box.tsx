"use client";

import ConfirmModal from "@/components/modals/confirm-modal";
import { Spinner } from "@/components/spinner";
import { Input } from "@/components/ui/input";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useMutation, useQuery } from "convex/react";
import { Search, Trash, Undo } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

const TrashBox = () => {

    const router = useRouter()
    const params = useParams()
    const categories = useQuery(api.categories.getTrash)
    const restore = useMutation(api.categories.restoreTrashed)
    const remove = useMutation(api.categories.remove)

    const [search, setSearch] = useState("")

    const filteredcategorys = categories?.filter((category)=>{
        return category.name.toLowerCase().includes(search.toLowerCase())
    }) 

    
    const onClick = (categoryId:String) =>{
        router.push(`/category/${categoryId}`)
    }

    const onRestore = (
        event:React.MouseEvent<HTMLDivElement, MouseEvent>, 
        categoryId:Id<"categories">) =>{

            event.stopPropagation();
            const promise = restore({id:categoryId})
            toast.promise(promise,{
                loading:"Restoring note...",
                success:"Category restored successfully !",
                error:"Fail to restor the category ! "
            })
             
    }

    const onRemove = (
        categoryId:Id<"categories">) =>{
            const promise = remove({id:categoryId})
            toast.promise(promise,{
                loading:"Deleting category...",
                success:"Category deleted successfully !",
                error:"Fail to delete the category ! "
            })        

        if (params.documentId === categoryId) {
            router.push("/documents")
        }


    }

    if (categories === undefined) {
        return (
            <div className=" h-full flex item-center justify-center p-4">
                <Spinner size={"lg"}/>
            </div>
        )
    }

    return ( 
        <div className=" text-sm">
            <div className=" flex items-center gap-x-1 p-2">
                <Search className="h-4 w-4"/>
                <Input
                    value={search}
                    onChange={(e)=>setSearch(e.target.value)}
                    className="h-7 px-2 focus-visible:ring-transparent bg-secondary"
                    placeholder="Filter by page title..."
                />
            </div>
            <div className="mt-2 px-1 pb-1">
                <p className="hidden last:block text-xs text-center  text-muted-foreground pb-2 ">
                    No categorys found
                </p>
                { filteredcategorys?.map((category)=>(
                    <div 
                        key={category._id} 
                        role="button" 
                        onClick={()=>onClick(category._id)}
                        className=" text-sm rounded-sm w-full  hover:bg-primary/5 flex \
                        items-center text-primary justify-between  "
                    >
                        <span className=" pl-2 truncate">
                            {category.name}
                        </span>
                        <div className=" flex">
                            <div className=" rounded-sm p-2  hover:bg-neutral-200  dark:hover:bg-neutral-700" role="button" onClick={(e)=> onRestore(e,category._id)}>
                                <Undo className="w-4 h-4 text-muted-foreground"/>
                            </div>
                            <ConfirmModal onConfirm={()=> onRemove(category._id)}>
                                <div className=" rounded-sm p-2  hover:bg-neutral-200 dark:hover:bg-neutral-700" role="button">
                                    <Trash className="w-4 h-4 text-muted-foreground"/>
                                </div>
                            </ConfirmModal>
                        </div>
                    </div>
                ))}
            </div>
        </div>
     );
}
 
export default TrashBox;
"use client"

import ConfirmModal from "@/components/modals/confirm-modal";
import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useMutation } from "convex/react";
import { ArchiveRestore, Delete, DeleteIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface BannerProps{
    documentId : Id<"documents">
}

const Banner = ({documentId}:BannerProps) => {

    const router = useRouter();
    const remove = useMutation(api.documents.remove);
    const restore = useMutation(api.documents.restoreTrashed);

    const onRemove =  ()=>{
        const promise = remove({id:documentId})
            
            toast.promise(promise,{
                loading:"Deleting note...",
                success : "Note deleted successfully !",
                error:"Fail to delete note !"
            })
            router.push("/documents")
        }

    const onRetore =  ()=>{
        const promise = restore({id:documentId})

        toast.promise(promise,{
            loading:"Restoring the note...",
            success : "Note restored successfully !",
            error:"Fail to restore note !"
        })
    }

    return ( 
        <div className=" w-full  bg-red-500 gap-x-2 flex justify-center text-center items-center text-sm p-1 font-semibold text-white">
            <p>This Page is in trash. </p>
            <Button
                size={"sm"}
                onClick={onRetore}
                variant={"outline"}
                className="border-white bg-transparent hover:bg-primary/5 
                text-white hover:text-white h-auto p-1  gap-x-2 px-2 font-normal"
            >
                <ArchiveRestore className=" h-4 w-4 "/> Restore the page
            </Button>
            <ConfirmModal onConfirm={onRemove}>
                <Button
                    size={"sm"}
                    variant={"outline"}
                    className="border-white bg-transparent hover:bg-primary/5 
                    text-white hover:text-white h-auto p-1 gap-x-2  px-2 font-normal"
                >
                    <DeleteIcon className="w-4 h-4" /> Delete the page
                </Button>
            </ConfirmModal>
        </div>
     );
}
 
export default Banner;
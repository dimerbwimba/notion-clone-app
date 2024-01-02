"use client"

import { Button } from "@/components/ui/button";
import { PopoverTrigger ,Popover, PopoverContent } from "@/components/ui/popover";
import { api } from "@/convex/_generated/api";
import { Doc } from "@/convex/_generated/dataModel";
import { useOrigin } from "@/hooks/use-origin";
import { useMutation } from "convex/react";
import { Check, Copy, Globe } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";


interface PublishProps{
    initialData : Doc<"categories">
}

const Publish = ({initialData}:PublishProps) => {

    const origin = useOrigin()
    const update = useMutation(api.categories.update)

    const [copied, setCopied] = useState(false);
    const [isSubmiting, setIdSubmiting] = useState(false);

    const url = `${origin}/preview/${initialData._id}`;

    const onPublish = () => {
        setIdSubmiting(true);
       
        const promise = update({
            id: initialData._id,
            isPublished:true
        }).finally(()=> setIdSubmiting(false))

        toast.promise(promise,{
            success:"Category published successfully !",
            loading:"Publishing...",
            error:"Fail to publish the category !"
        })

    }

    const onUnpublish = () => {
        setIdSubmiting(true);
       
        const promise = update({
            id: initialData._id,
            isPublished:false
        }).finally(()=> setIdSubmiting(false))

        toast.promise(promise,{
            success:"Note unpublished successfully !",
            loading:"Unpublishing...",
            error:"Fail to unpublish the note !"
        })

    }

    const onCopy = () => {
        navigator.clipboard.writeText(url);
        setCopied(true);

        setTimeout(()=>{
            setCopied(false)
        },1000)
    }

    return ( 
        <Popover>
            <PopoverTrigger asChild>
                <Button size={"sm"} variant={"ghost"} >
                    Publish
                    {initialData.isPublished && (
                        <Globe
                            className="text-sky-500 w-4 h-4 ml-2"
                        />
                    )}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-72" align="end" alignOffset={8} forceMount >
                {initialData.isPublished ? (
                    <div className=" space-y-4">
                        <div className=" flex items-center gap-x-2">
                            <Globe className=" text-sky animate-pulse h-4 w-4" />
                            <p className=" text-xs font-medium text-sky-500">
                            This Category is live on web
                            </p>
                        </div>
                        <div className=" flex items-center">
                            <input
                                className=" flex-1 px-2 text-xs border rounded-l-md h-8
                                 bg-muted truncate "
                                value={url}
                                disabled
                            />
                            <Button
                                onClick={onCopy}
                                disabled={copied}
                                className="h-8 rounded-l-none "
                            >
                                {
                                    copied ? (
                                        <Check className="h-4 w-4" />
                                    ):(
                                        <Copy className="h-4 w-4"/>
                                    )
                                }
                            </Button>
                        </div>
                        <Button
                            size={"sm"}
                            className="w-full text-xs"
                            disabled={isSubmiting}
                            onClick={onUnpublish}
                        >
                            Unpublish
                        </Button>
                    </div>
                ) : (
                    <div className=" flex flex-col items-center justify-center">
                        <Globe
                            className="h-8 w-8 text-muted-foreground mb-2"
                        />
                        <p className=" text-sm font-medium mb-2">
                            Publish this Category
                        </p>
                        <span className=" text-xs text-muted-foreground mb-4 ">
                            Share your work with others
                        </span>
                        <Button
                            disabled={isSubmiting}
                            onClick={onPublish}
                            className=" w-full text-xs"
                            size={"sm"}
                        >
                            Publish
                        </Button>
                    </div>
                )}
            </PopoverContent>
        </Popover>
     );
}
 
export default Publish;
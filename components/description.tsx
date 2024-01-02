"use client"

import { Button } from "@/components/ui/button";
import TextareaAutoSize from "react-textarea-autosize";
import { Skeleton } from "@/components/ui/skeleton";
import { api } from "@/convex/_generated/api";
import { Doc } from "@/convex/_generated/dataModel";
import { useMutation } from "convex/react";
import React, { useRef, useState } from "react";

interface DescriptionProps {
    initialData: Doc<"documents">
}

const Description = ({ initialData }: DescriptionProps) => {

    const inputRef = useRef<HTMLTextAreaElement>(null)
    const update = useMutation(api.documents.update)

    const [isEditing, setIsEditing] = useState(false)
    const [Description, setDescription] = useState(initialData.description || "Undescribed")

    const enableInput = () => {
        setDescription(initialData.description||"Undescribed");
        setIsEditing(true);
        setTimeout(() => {
            inputRef.current?.focus();
            inputRef.current?.setSelectionRange(0, inputRef.current.value.length)
        }, 0)
    }

    const disableInput = () => {
        setIsEditing(false);
    }

    const onChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setDescription(event.target.value)
        update({
            id: initialData._id,
            description: event.target.value || "Undescribed"
        })
    }

    const onKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (event.key === "Enter") {
            disableInput();

        }
    }

    return (
        <>            
            {isEditing ? (
                <TextareaAutoSize
                 ref={inputRef}
                 onBlur={disableInput}
                 onKeyDown={onKeyDown}
                 value={Description}
                 onChange={onChange}
                 className=" text-xl w-full bg-transparent font-bold break-words outline-none 
                 text-[#3f3f3f] dark:text-[#CFCFCF] resize-none" 
                />
            ) : (
                <div
                    onClick={enableInput}
                    className=" pb-[11.5px] text-xl font-bold break-words outline-none
                     text-[#3f3f3f] dark:text-[#CFCFCF]  "
                >
                    {initialData.description || "Undescribed"}
                </div>
            )}
            
        </>
    );
}

Description.Skeleton = function DescriptionSkeleton() {
    return (
        <Skeleton className="h-6 w-full rounded-md " />
    )
}
export default Description;
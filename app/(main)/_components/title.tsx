"use client"

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { api } from "@/convex/_generated/api";
import { Doc } from "@/convex/_generated/dataModel";
import { useMutation } from "convex/react";
import { Cross, XCircle } from "lucide-react";
import React, { useRef, useState } from "react";

interface TitleProps {
    initialData: Doc<"categories">
}

const Title = ({ initialData }: TitleProps) => {

    const inputRef = useRef<HTMLInputElement>(null)
    const update = useMutation(api.categories.update)

    const [isEditing, setIsEditing] = useState(false)
    const [title, setTitle] = useState(initialData.name || "Untitled")

    const enableInput = () => {
        setTitle(initialData.name);
        setIsEditing(true);
        setTimeout(() => {
            inputRef.current?.focus();
            inputRef.current?.setSelectionRange(0, inputRef.current.value.length)
        }, 0)
    }

    const disableInput = () => {
        setIsEditing(false);
    }

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(event.target.value)
        update({
            id: initialData._id,
            name: event.target.value || "Untitled"
        })
    }

    const onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            disableInput();

        }
    }

    return (
        <>
            <div className=" flex relative items-center">
                <div
                    role="button"
                    onClick={() => setIsEditing(!isEditing)}
                    className=" font-normal text-sm  h-auto "
                >
                    <div className="">
                        <span className="truncate flex  hover:bg-primary/5 p-1 rounded-sm">

            {!!initialData.icon && <p>{initialData.icon}</p>}
                            {initialData?.name}
                        </span>

                    </div>
                </div>

            </div>               
            {
                isEditing ? (
                    
                    <div className="absolute z-10 w-full max-w-xs px-4 transform -translate-x-1/2 top-10 sm:max-w-md sm:w-96">
                        <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                                <div role="button" onClick={disableInput} className=" absolute right-0 -top-2 z-20">
                                    <div className=" bg-white p-1 rounded-full shadow">
                                        <XCircle className="w-4 h-4 text-muted-foreground"/>
                                    </div>
                                </div>
                            <div className=" grid gap-6 p-1 bg-white">
                                <Input
                                    ref={inputRef}
                                    onClick={enableInput}
                                    onBlur={disableInput}
                                    onChange={onChange}
                                    onKeyDown={onKeyDown}
                                    value={title}
                                    className=" h-7 px-2 bg-primary/5 focus-visible:ring-transparent  "
                                />
                            </div>
                        </div>
                    </div>

                ) : (
                    ""
                )
            }
        </>
    );
}

Title.Skeleton = function TitleSkeleton() {
    return (
        <Skeleton className="h-6 w-full rounded-md " />
    )
}
export default Title;
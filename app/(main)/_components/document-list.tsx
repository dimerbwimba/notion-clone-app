"use client"

import { api } from "@/convex/_generated/api";
import { Doc, Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { FileIcon } from "lucide-react";
import Document from "./document";
import BannerMini from "./banner-mini";

interface DocumentListProps {
    parentDocumentId?: Id<"documents">;
    level?: number;
    data?: Doc<"documents">[];
}


const DocumentList = (
    {parentDocumentId,level = 0,}: DocumentListProps
) => {
    const params = useParams()
    const router = useRouter()
    const [expanded, setExpanded] = useState<Record<string, boolean>>({})

    const onExpand = (documentId: string) => {
        setExpanded(prevExpanded => ({
            ...prevExpanded,
            [documentId]: !prevExpanded[documentId]
        }))
    };    

    const documents = useQuery(api.documents.getDocument, {
        parentDocument: parentDocumentId,
        parentCategoryId: params.categoryId as Id<"categories">
    })

    const OnRedirect = (documentId: string) => {
        router.push(`/documents/${params.categoryId}/${documentId}`)
    }

    if (documents === undefined) {
        return (
            <>
                <Document.Skeleton level={level} />
                {level === 0 && (
                    <>
                        <Document.Skeleton level={level} />
                        <Document.Skeleton level={level} />

                    </>
                )}
            </>
        )
    }
    return (
        <>
            <p
                style={{
                    paddingLeft: level ? `${(level * 12) + 25}` : undefined
                }}
                className={cn(
                    "hidden pl-12 text-sm font-medium text-muted-foreground/80",
                    expanded && "last:block",
                    level === 0 && "hidden"
                )}
            >
                No document inside
            </p>
            {documents?.map((document) => (
                <>
                    <div key={document._id}>
                        <Document
                            id={document._id}
                            onClick={() => OnRedirect(document._id)}
                            label={document.title}
                            isPublished={document.isPublished}
                            icon={FileIcon}
                            documentIcon={document.icon}
                            active={params.documentId === document._id}
                            level={level}
                            onExpand={() => onExpand(document._id)}
                            expanded={expanded[document._id]}

                        />
                        { document.isArchived && <BannerMini documentId={document._id}/>}
                        {
                            expanded[document._id] && (
                                <DocumentList
                                    parentDocumentId={document._id}
                                    level={level + 1}
                                />
                            )
                        }
                    </div>
              
                </>
            ))
            }
        </>
    );
}

export default DocumentList;
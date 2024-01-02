import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import Item from "./item";
import { useParams ,useRouter } from "next/navigation";
import { FileIcon } from "lucide-react";

const CategoryList = () => {

    const router = useRouter()
    const params = useParams()
    
    const documents = useQuery(api.categories.getSidebarCategories,{})

    const OnRedirect = (categoryId: string) => {
        router.push(`/documents/${categoryId}`)
    }
    if (documents === undefined) {
        return (
            <>
                <Item.Skeleton />
                <>
                    <Item.Skeleton />
                    <Item.Skeleton />

                </>
            </>
        )
    }
    return ( 
        <div>
           {documents?.map((document) => (
                <div key={document._id}>
                    <Item
                        id={document._id}
                        onClick={() => OnRedirect(document._id)}
                        label={document.name}
                        isPublished={document.isPublished}
                        icon={FileIcon}
                        documentIcon={document.icon}
                        active={params.documentId === document._id}
                    />
                </div>
            ))}
        </div>
     );
}
 
export default CategoryList;
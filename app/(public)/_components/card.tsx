import { Doc } from "@/convex/_generated/dataModel";
import Image from "next/image";
import Link from "next/link";

interface CardProps {
    document : Doc<"documents">;
}

const Card = ({document}:CardProps) => {
    return ( 
        <Link href={`/travel-blog/${document._id}`}>
            <div className="max-w-sm rounded  overflow-hidden">
                <div className=" relative w-full h-60">
                    <Image fill  className="w-full object-cover" src={document.coverImage||""} alt={document.title}/>
                </div>
                <div className="px-2 py-1">
                    <div className="font-bold text-lg leading-tight ">{document.title}</div>
                </div>
                <div className="px-2 text-normal mb-1 leading-tight ">
                    {document.description}
                </div>
            </div>
        </Link>
     );
}
 
export default Card;
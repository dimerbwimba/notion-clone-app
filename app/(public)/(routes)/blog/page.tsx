import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import { AirplayIcon, ArrowDown, PlaneIcon } from "lucide-react";
import CardList from "../../_components/card-list";

const BlogPage = () => {

    return ( 
        <div className="max-w-3xl space-y-4">
             <div className="flex flex-col items-center justify-center md:justify-start text-center gap-y-8 flex-1 px-6 pb-10">
                <h1 className="text-3xl sm:text-4xl pt-10 md:text-5xl font-bold">
                Travel smarter, cheaper, longer. Where do you want to go?
                </h1>
                <h3 className="text-base sm:text-lg md:text-xl font-medium">
                Your Trustworthy Resource Hub
                </h3>
                <Button variant={"outline"} className=" rounded-full w-10 h-10 p-0">
                    <PlaneIcon className="h-4 w-4"/>
                </Button>
             </div>
             <section>

                <div>
                    <CardList />
                </div>
             </section>
        </div>
     );
}
 
export default BlogPage;
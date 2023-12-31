import { Button } from "@/components/ui/button";
import { ArrowBigDown, ArrowDown } from "lucide-react";

const BlogPage = () => {
    return ( 
        <div className="max-w-3xl space-y-4">
             <div className="flex flex-col items-center justify-center md:justify-start text-center gap-y-8 flex-1 px-6 pb-10">
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold">
                Unlock Your Potential: Access the tools to become a top-tier investor and financial advisor.
                </h1>
                <h3 className="text-base sm:text-lg md:text-xl font-medium">
                Your Trustworthy Resource Hub
                </h3>
                <Button variant={"outline"} className=" rounded-full w-10 h-10 p-0">
                    <ArrowDown className="h-4 w-4"/>
                </Button>

                <div className=" bg-muted border-t  text-start p-2 gap-y-4 shadow-inner  ">
                    <h2 className="text-base sm:text-lg md:text-2xl  font-bold">
                        Our Mission
                    </h2>
                    <p className="">
                    Irrespective of your background or expertise, our mission is to be your go-to resource for 
                    simplifying complex financial decisions. Let's navigate the intricate world of finance together, making informed choices every step of the way.
                    </p>
                </div>
             </div>
        </div>
     );
}
 
export default BlogPage;
import { NavMenu} from "./_components/navigation-menu";

const PublicLayout = ({
    children
  }: {
    children: React.ReactNode;
  }) => {
    return ( 
      <div className="h-full dark:bg-[#1F1F1F]">
        <NavMenu/>
            <main className=" pt-30 flex justify-center items-center">
                {children}
            </main>
      </div>
     );
  }
   
  export default PublicLayout;
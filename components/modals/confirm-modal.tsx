"use client"

import { AlertDialogCancel } from "@radix-ui/react-alert-dialog";
import { 
    AlertDialog, 
    AlertDialogAction, 
    AlertDialogContent, 
    AlertDialogDescription, 
    AlertDialogFooter, 
    AlertDialogHeader, 
    AlertDialogTitle, 
    AlertDialogTrigger } from "../ui/alert-dialog";

interface ConfirmModalProps {
    children : React.ReactNode;
    onConfirm : ()=>void;

}


const ConfirmModal = ({
    children,
    onConfirm
}:ConfirmModalProps) => {

    const handleConfirm = (e:React.MouseEvent<HTMLButtonElement, MouseEvent>)=>{
        e.stopPropagation();
        onConfirm()
    }

    return ( 
       <AlertDialog>
        <AlertDialogTrigger onClick={(e)=> e.stopPropagation()} asChild >
            {children}
        </AlertDialogTrigger>
        <AlertDialogContent>
            <AlertDialogHeader>
                <AlertDialogTitle>
                    Are you absolutly sure ?
                </AlertDialogTitle>
                <AlertDialogDescription>
                    This action can not be undon.
                </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
                <AlertDialogCancel onClick={e=> e.stopPropagation()}>
                    Cancel 
                </AlertDialogCancel>
                <AlertDialogAction onClick={handleConfirm}>
                    Confirm
                </AlertDialogAction>
            </AlertDialogFooter>
        </AlertDialogContent>
       </AlertDialog>
     );
}
 
export default ConfirmModal;
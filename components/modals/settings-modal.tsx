"use client"

import { useSettings } from "@/hooks/use-settings";
import { Dialog, DialogContent, DialogHeader } from "../ui/dialog";
import { Label } from "../ui/label";
import { ModeToggle } from "../mode-toggle";

const SettingsModal = () => {

    const settings = useSettings()

    return ( 
        <Dialog open={settings.isOpen} onOpenChange={settings.onClose} >
            <DialogContent>
                <DialogHeader className=" border-b pb-3">
                    <h2 className=" text-lg font-medium">My settings</h2>
                </DialogHeader>
                <div className="flex items-center justify-between">
                    <div className=" flex flex-col gap-y-1">
                       <Label>
                            Appearence
                       </Label>
                       <span className=" text-[10px] text-muted-foreground ">
                            Customize how joition look on your divice
                       </span>
                    </div>
                    <ModeToggle/>
                </div>

            </DialogContent>
        </Dialog>
     );
}
 
export default SettingsModal;
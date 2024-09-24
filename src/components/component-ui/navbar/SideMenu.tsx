import { Button } from "@/components/ui/button"
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { TextAlignRightIcon } from "@radix-ui/react-icons"

export function SheetDemo() {
    return (
        <div className="sm:hidden inline-flex">

            <Sheet>
                <SheetTrigger asChild>
                    <Button variant="outline" size="icon">

                        <TextAlignRightIcon width="22" height="22" />
                    </Button>
                </SheetTrigger>
                <SheetContent>
                    <SheetHeader>
                        <SheetTitle>Edit profile</SheetTitle>
                        <SheetDescription>
                            Make changes to your profile here. Click save when you're done.
                        </SheetDescription>
                    </SheetHeader>

                    <SheetFooter>
                        <SheetClose asChild>
                            <Button type="submit">Save changes</Button>
                        </SheetClose>
                    </SheetFooter>
                </SheetContent>
            </Sheet>
        </div>
    )
}

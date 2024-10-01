import {
  Card,
  CardContent,

} from "@/components/ui/card"
import Image from "next/image"
import { IndianRupee } from "lucide-react"


function page() {
  return (
    <div className="pt-16 sm:px-10 px-4 sm:pl-[270px]">
      <h1 className={`font-bold pb-4 sm:text-xl tracking-wide capitalize`}>Welcome! Find your lodge.</h1>
      <div className="">

        <Card className="sm:w-[230px]  flex sm:flex-col w-full sm:h-64 h-32">
          <div className="sm:w-[100%] w-44 sm:h-32 h-full">

            <Image src={'/img/placeholder.svg'} alt="" width={0} height={0} className="sm:w-[100%] opacity-55 w-44 sm:h-32 h-full -z-1 object-cover sm:rounded-tr-md rounded-bl-md sm:rounded-bl-none sm:rounded-tl-md rounded-tl-md" />
          </div>

          <CardContent className="p-3 w-full flex flex-col justify-between h-full">
            <div>

              <h1 className="font-semibold text-foreground">Name of lodge</h1>
              <p className="text-muted-foreground text-sm leading-4">Lorem ipsum dolor sit amet consectetur adipisicing elit. </p>
            </div>
            <div className="flex items-center justify-between sm:pt-0 pt-3">
              <p className="flex items-center">
                <span>800</span>
                <IndianRupee className="w-3.5 h-3.5" />
                <span>/Room</span>
              </p>
              <button className="text-sm font-semibold dark:bg-black bg-secondary p-2 rounded-md">View More</button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>

  )
}

export default page
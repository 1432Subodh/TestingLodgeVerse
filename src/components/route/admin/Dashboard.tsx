import * as React from "react"
import Link from "next/link"
import {
    ChevronLeft,
    ChevronRight,
    Copy,
    CreditCard,
    File,
    Home,
    LineChart,
    ListFilter,
    MoreVertical,
    Package,
    Settings,
    ShoppingCart,
    Truck,
    Users2,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    Pagination,
    PaginationContent,
    PaginationItem,
} from "@/components/ui/pagination"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import UploadLodge from "@/components/UploadLodge/UploadLodge"

export const description =
    "An orders dashboard with a sidebar navigation. The sidebar has icon navigation. The content area has a breadcrumb and search in the header. The main area has a list of recent orders with a filter and export button. The main area also has a detailed view of a single order with order details, shipping information, billing information, customer information, and payment information."

export function Dashboard() {
    return (
        <div className="flex min-h-screen w-full flex-col bg-muted/40">
            <aside className="fixed inset-y-0 left-0 top-12 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
                <nav className="flex flex-col items-center gap-4 px-2 sm:py-4">


                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Link
                                    href="#"
                                    className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                                >
                                    <Home className="h-5 w-5" />
                                    <span className="sr-only">Dashboard</span>
                                </Link>
                            </TooltipTrigger>
                            <TooltipContent side="right">Dashboard</TooltipContent>
                        </Tooltip></TooltipProvider>
                    <TooltipProvider><Tooltip>
                        <TooltipTrigger asChild>
                            <Link
                                href="#"
                                className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent text-accent-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                            >
                                <ShoppingCart className="h-5 w-5" />
                                <span className="sr-only">Orders</span>
                            </Link>
                        </TooltipTrigger>
                        <TooltipContent side="right">Orders</TooltipContent>
                    </Tooltip></TooltipProvider>
                    <TooltipProvider><Tooltip>
                        <TooltipTrigger asChild>
                            <Link
                                href="#"
                                className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                            >
                                <Package className="h-5 w-5" />
                                <span className="sr-only">Products</span>
                            </Link>
                        </TooltipTrigger>
                        <TooltipContent side="right">Products</TooltipContent>
                    </Tooltip></TooltipProvider>
                    <TooltipProvider><Tooltip>
                        <TooltipTrigger asChild>
                            <Link
                                href="#"
                                className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                            >
                                <Users2 className="h-5 w-5" />
                                <span className="sr-only">Customers</span>
                            </Link>
                        </TooltipTrigger>
                        <TooltipContent side="right">Customers</TooltipContent>
                    </Tooltip></TooltipProvider>
                    <TooltipProvider><Tooltip>
                        <TooltipTrigger asChild>
                            <Link
                                href="#"
                                className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                            >
                                <LineChart className="h-5 w-5" />
                                <span className="sr-only">Analytics</span>
                            </Link>
                        </TooltipTrigger>
                        <TooltipContent side="right">Analytics</TooltipContent>
                    </Tooltip></TooltipProvider>
                </nav>
                <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-4">
                    <TooltipProvider><Tooltip>
                        <TooltipTrigger asChild>
                            <Link
                                href="#"
                                className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                            >
                                <Settings className="h-5 w-5" />
                                <span className="sr-only">Settings</span>
                            </Link>
                        </TooltipTrigger>
                        <TooltipContent side="right">Settings</TooltipContent>
                    </Tooltip></TooltipProvider>
                </nav>
            </aside>
            <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
                <header className="sm:px-6 px-4">
                    <Tabs defaultValue="week">
                        <div className="flex items-center">
                            <h1 className="text-xl pt-1 font-semibold tracking-wide">Lodge View</h1>
                            <div className="ml-auto flex items-center gap-2 mt-3">

                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            className="h-7 gap-1 text-sm"
                                        >
                                            <ListFilter className="h-3.5 w-3.5" />
                                            <span className="">Filter</span>
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                        <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuCheckboxItem checked>
                                            Fulfilled
                                        </DropdownMenuCheckboxItem>
                                        <DropdownMenuCheckboxItem>
                                            Declined
                                        </DropdownMenuCheckboxItem>
                                        <DropdownMenuCheckboxItem>
                                            Refunded
                                        </DropdownMenuCheckboxItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>

                            </div>
                        </div>

                    </Tabs>
                </header>
                <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3">
                    <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
                        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
                            <Card
                                className="sm:col-span-2" x-chunk="dashboard-05-chunk-0"
                            >
                                <CardHeader className="pb-3">
                                    <CardTitle>Your Orders</CardTitle>
                                    <CardDescription className="text-balance max-w-lg leading-relaxed">
                                        Introducing Our Dynamic Orders Dashboard for Seamless
                                        Management and Insightful Analysis.
                                    </CardDescription>
                                </CardHeader>
                                <CardFooter>
                                    <Button>Create New Order</Button>
                                </CardFooter>
                            </Card>
                            <Card x-chunk="dashboard-05-chunk-1">
                                <CardHeader className="pb-2">
                                    <CardDescription>This Week</CardDescription>
                                    <CardTitle className="text-4xl">$1,329</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="text-xs text-muted-foreground">
                                        +25% from last week
                                    </div>
                                </CardContent>
                                <CardFooter>
                                    <Progress value={25} aria-label="25% increase" />
                                </CardFooter>
                            </Card>
                            <Card x-chunk="dashboard-05-chunk-2">
                                <CardHeader className="pb-2">
                                    <CardDescription>This Month</CardDescription>
                                    <CardTitle className="text-4xl">$5,329</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="text-xs text-muted-foreground">
                                        +10% from last month
                                    </div>
                                </CardContent>
                                <CardFooter>
                                    <Progress value={12} aria-label="12% increase" />
                                </CardFooter>
                            </Card>
                        </div>
                        <Tabs defaultValue="week">
                            <div className="flex items-center">
                                <TabsList>
                                    <TabsTrigger value="week">Week</TabsTrigger>
                                    <TabsTrigger value="month">Month</TabsTrigger>
                                    <TabsTrigger value="year">Year</TabsTrigger>
                                </TabsList>
                                <div className="ml-auto flex items-center gap-2">

                                    <Button
                                        size="sm"
                                        variant="outline"
                                        className="h-7 gap-1 text-sm"
                                    >
                                        <File className="h-3.5 w-3.5" />
                                        <span className="sr-only sm:not-sr-only">Export</span>
                                    </Button>
                                </div>
                            </div>
                            <TabsContent value="week">
                                <Card x-chunk="dashboard-05-chunk-3">
                                    <CardHeader className="px-7">
                                        <CardTitle>Orders</CardTitle>
                                        <CardDescription>
                                            Recent orders from your store.
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <Table>
                                            <TableHeader>
                                                <TableRow>
                                                    <TableHead>Customer</TableHead>
                                                    <TableHead className="hidden sm:table-cell">
                                                        Type
                                                    </TableHead>
                                                    <TableHead className="hidden sm:table-cell">
                                                        Status
                                                    </TableHead>
                                                    <TableHead className="hidden md:table-cell">
                                                        Date
                                                    </TableHead>
                                                    <TableHead className="text-right">Amount</TableHead>
                                                </TableRow>
                                            </TableHeader>
                                            <TableBody>
                                                <TableRow className="bg-accent">
                                                    <TableCell>
                                                        <div className="font-medium">Liam Johnson</div>
                                                        <div className="hidden text-sm text-muted-foreground md:inline">
                                                            liam@example.com
                                                        </div>
                                                    </TableCell>
                                                    <TableCell className="hidden sm:table-cell">
                                                        Sale
                                                    </TableCell>
                                                    <TableCell className="hidden sm:table-cell">
                                                        <Badge className="text-xs" variant="secondary">
                                                            Fulfilled
                                                        </Badge>
                                                    </TableCell>
                                                    <TableCell className="hidden md:table-cell">
                                                        2023-06-23
                                                    </TableCell>
                                                    <TableCell className="text-right">$250.00</TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell>
                                                        <div className="font-medium">Olivia Smith</div>
                                                        <div className="hidden text-sm text-muted-foreground md:inline">
                                                            olivia@example.com
                                                        </div>
                                                    </TableCell>
                                                    <TableCell className="hidden sm:table-cell">
                                                        Refund
                                                    </TableCell>
                                                    <TableCell className="hidden sm:table-cell">
                                                        <Badge className="text-xs" variant="outline">
                                                            Declined
                                                        </Badge>
                                                    </TableCell>
                                                    <TableCell className="hidden md:table-cell">
                                                        2023-06-24
                                                    </TableCell>
                                                    <TableCell className="text-right">$150.00</TableCell>
                                                </TableRow>
                                                {/* <TableRow>
                          <TableCell>
                            <div className="font-medium">Liam Johnson</div>
                            <div className="hidden text-sm text-muted-foreground md:inline">
                              liam@example.com
                            </div>
                          </TableCell>
                          <TableCell className="hidden sm:table-cell">
                            Sale
                          </TableCell>
                          <TableCell className="hidden sm:table-cell">
                            <Badge className="text-xs" variant="secondary">
                              Fulfilled
                            </Badge>
                          </TableCell>
                          <TableCell className="hidden md:table-cell">
                            2023-06-23
                          </TableCell>
                          <TableCell className="text-right">$250.00</TableCell>
                        </TableRow> */}
                                                <TableRow>
                                                    <TableCell>
                                                        <div className="font-medium">Noah Williams</div>
                                                        <div className="hidden text-sm text-muted-foreground md:inline">
                                                            noah@example.com
                                                        </div>
                                                    </TableCell>
                                                    <TableCell className="hidden sm:table-cell">
                                                        Subscription
                                                    </TableCell>
                                                    <TableCell className="hidden sm:table-cell">
                                                        <Badge className="text-xs" variant="secondary">
                                                            Fulfilled
                                                        </Badge>
                                                    </TableCell>
                                                    <TableCell className="hidden md:table-cell">
                                                        2023-06-25
                                                    </TableCell>
                                                    <TableCell className="text-right">$350.00</TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell>
                                                        <div className="font-medium">Emma Brown</div>
                                                        <div className="hidden text-sm text-muted-foreground md:inline">
                                                            emma@example.com
                                                        </div>
                                                    </TableCell>
                                                    <TableCell className="hidden sm:table-cell">
                                                        Sale
                                                    </TableCell>
                                                    <TableCell className="hidden sm:table-cell">
                                                        <Badge className="text-xs" variant="secondary">
                                                            Fulfilled
                                                        </Badge>
                                                    </TableCell>
                                                    <TableCell className="hidden md:table-cell">
                                                        2023-06-26
                                                    </TableCell>
                                                    <TableCell className="text-right">$450.00</TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell>
                                                        <div className="font-medium">Liam Johnson</div>
                                                        <div className="hidden text-sm text-muted-foreground md:inline">
                                                            liam@example.com
                                                        </div>
                                                    </TableCell>
                                                    <TableCell className="hidden sm:table-cell">
                                                        Sale
                                                    </TableCell>
                                                    <TableCell className="hidden sm:table-cell">
                                                        <Badge className="text-xs" variant="secondary">
                                                            Fulfilled
                                                        </Badge>
                                                    </TableCell>
                                                    <TableCell className="hidden md:table-cell">
                                                        2023-06-23
                                                    </TableCell>
                                                    <TableCell className="text-right">$250.00</TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell>
                                                        <div className="font-medium">Olivia Smith</div>
                                                        <div className="hidden text-sm text-muted-foreground md:inline">
                                                            olivia@example.com
                                                        </div>
                                                    </TableCell>
                                                    <TableCell className="hidden sm:table-cell">
                                                        Refund
                                                    </TableCell>
                                                    <TableCell className="hidden sm:table-cell">
                                                        <Badge className="text-xs" variant="outline">
                                                            Declined
                                                        </Badge>
                                                    </TableCell>
                                                    <TableCell className="hidden md:table-cell">
                                                        2023-06-24
                                                    </TableCell>
                                                    <TableCell className="text-right">$150.00</TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell>
                                                        <div className="font-medium">Emma Brown</div>
                                                        <div className="hidden text-sm text-muted-foreground md:inline">
                                                            emma@example.com
                                                        </div>
                                                    </TableCell>
                                                    <TableCell className="hidden sm:table-cell">
                                                        Sale
                                                    </TableCell>
                                                    <TableCell className="hidden sm:table-cell">
                                                        <Badge className="text-xs" variant="secondary">
                                                            Fulfilled
                                                        </Badge>
                                                    </TableCell>
                                                    <TableCell className="hidden md:table-cell">
                                                        2023-06-26
                                                    </TableCell>
                                                    <TableCell className="text-right">$450.00</TableCell>
                                                </TableRow>
                                            </TableBody>
                                        </Table>
                                    </CardContent>
                                </Card>
                            </TabsContent>
                        </Tabs>
                    </div>
                    <div>
                        <Card
                            className="overflow-hidden" x-chunk="dashboard-05-chunk-4"
                        >
                            <CardHeader className="flex flex-row items-start bg-muted/50">
                                <div className="grid gap-0.5">
                                    <CardTitle className="group flex items-center gap-2 text-lg">
                                        Order Oe31b70H
                                        <Button
                                            size="icon"
                                            variant="outline"
                                            className="h-6 w-6 opacity-0 transition-opacity group-hover:opacity-100"
                                        >
                                            <Copy className="h-3 w-3" />
                                            <span className="sr-only">Copy Order ID</span>
                                        </Button>
                                    </CardTitle>
                                    <CardDescription>Date: November 23, 2023</CardDescription>
                                </div>
                                <div className="ml-auto flex items-center gap-1">
                                    <Button size="sm" variant="outline" className="h-8 gap-1">
                                        <Truck className="h-3.5 w-3.5" />
                                        <span className="lg:sr-only xl:not-sr-only xl:whitespace-nowrap">
                                            Track Order
                                        </span>
                                    </Button>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button size="icon" variant="outline" className="h-8 w-8">
                                                <MoreVertical className="h-3.5 w-3.5" />
                                                <span className="sr-only">More</span>
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                            <DropdownMenuItem>Edit</DropdownMenuItem>
                                            <DropdownMenuItem>Export</DropdownMenuItem>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuItem>Trash</DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </div>
                            </CardHeader>
                            <UploadLodge/>
                            <CardFooter className="flex flex-row items-center border-t bg-muted/50 px-6 py-3">
                                <div className="text-xs text-muted-foreground">
                                    Updated <time dateTime="2023-11-23">November 23, 2023</time>
                                </div>
                                <Pagination className="ml-auto mr-0 w-auto">
                                    <PaginationContent>
                                        <PaginationItem>
                                            <Button size="icon" variant="outline" className="h-6 w-6">
                                                <ChevronLeft className="h-3.5 w-3.5" />
                                                <span className="sr-only">Previous Order</span>
                                            </Button>
                                        </PaginationItem>
                                        <PaginationItem>
                                            <Button size="icon" variant="outline" className="h-6 w-6">
                                                <ChevronRight className="h-3.5 w-3.5" />
                                                <span className="sr-only">Next Order</span>
                                            </Button>
                                        </PaginationItem>
                                    </PaginationContent>
                                </Pagination>
                            </CardFooter>
                        </Card>
                    </div>
                </main>
            </div>
        </div>
    )
}

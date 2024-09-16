import { CircleUser, Menu, Package2 } from 'lucide-react';
import { Link, Outlet, useLocation } from 'react-router-dom';

import { Sheet, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from '../ui/sheet';
import { Button } from '../ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '../ui/dropdown-menu';

type NavProps = {
    navRouteObj: Array<{
        routeName: string;
        routePath: string;
    }>;
};

const Nav = ({ navRouteObj }: NavProps) => {
    const { pathname } = useLocation();

    return (
        <>
            <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6 bg-slate-50">
                <nav className="hidden gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
                    <Link to="/" className="flex items-center gap-2 text-lg font-semibold md:text-base">
                        <Package2 className="h-6 w-6" />
                        <span className="sr-only">Acme Inc</span>
                    </Link>
                    {navRouteObj.map(({ routeName, routePath }) => (
                        <Link
                            key={routePath}
                            to={`/${routePath}`}
                            className={`${pathname === `/${routePath}` ? 'text-foreground' : 'text-muted-foreground'} transition-colors flex hover:text-foreground`}
                        >
                            {routeName}
                        </Link>
                    ))}
                </nav>
                <Sheet>
                    <SheetTrigger asChild>
                        <Button variant="outline" size="icon" className="shrink-0 md:hidden">
                            <Menu className="h-5 w-5" />
                            <span className="sr-only">Toggle navigation menu</span>
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="left">
                        <SheetTitle>
                            <nav className="grid gap-6 text-lg font-medium">
                                <Link to="/" className="flex items-center gap-2 text-lg font-semibold">
                                    <Package2 className="h-6 w-6" />
                                    <SheetDescription className="sr-only">Acme Inc</SheetDescription>
                                </Link>
                                {navRouteObj.map(({ routeName, routePath }) => (
                                    <Link
                                        key={routePath}
                                        to={`/${routePath}`}
                                        className="text-muted-foreground hover:text-foreground"
                                    >
                                        <SheetDescription>{routeName}</SheetDescription>
                                    </Link>
                                ))}
                            </nav>
                        </SheetTitle>
                    </SheetContent>
                </Sheet>
                <div className="flex items-center gap-4 ml-auto md:gap-2 lg:gap-4">
                    <div className="ml-auto flex-initial">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="secondary" size="icon" className="rounded-full">
                                    <CircleUser className="h-5 w-5" />
                                    <span className="sr-only">Toggle user menu</span>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>Settings</DropdownMenuItem>
                                <DropdownMenuItem>Support</DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>Logout</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>
            </header>
            <Outlet />
        </>
    );
};

export default Nav;

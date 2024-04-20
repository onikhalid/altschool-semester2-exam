import { Outlet } from "react-router-dom";
import { NavBar, SideBar } from "../components";
import React from "react";
import { cn } from "../lib/utils";
import { Toaster } from "sonner";

export default function Root() {

    const [isDarkMode, setIsDarkMode] = React.useState(true);
    return (
        <div className={cn("flex flex-col w-screen h-screen bg-background text-foreground", isDarkMode && 'dark')}>
            <NavBar isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode}/>

            <section className="grow flex flex-col md:flex-row overflow-y-hidden ">
                <SideBar/>

                <div className="flex-1 overflow-y-auto flex md:m-2 md:p-4 md:pb-0 bg-charcoal md:rounded-xl">
                    <Outlet context={[isDarkMode]}/>
                </div>
            </section>
            <Toaster />
        </div>
    );
}

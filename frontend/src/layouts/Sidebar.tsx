import { useState } from "react";
import { Outlet } from "react-router-dom";
import { SidebarIcon } from "lucide-react";


export default function Sidebar() {
  const [isOpen, setOpen] = useState<boolean>(false);

  return (
    <main className="w-screen h-screen flex bg-background relative">
      {/* Sidebar */}
      <div
        className={`bg-secondary h-full transition-all duration-300 ${
          isOpen ? "w-64" : "w-0 overflow-hidden"
        }`}
      >
        
      </div>

    
      <div className="flex-1 flex flex-col">

        <header className="p-4 ">
          <SidebarIcon
            className="cursor-pointer"
            onClick={() => setOpen((prev) => !prev)}
          />
        </header>

       
        <section className="flex-1 overflow-auto">
          <Outlet />
        </section>
      </div>
    </main>
  );
}

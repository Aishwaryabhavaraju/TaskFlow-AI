import { createContext, useContext, useState } from "react";

const SidebarContext = createContext();

export function SidebarProvider({ children }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const toggleSidebar = () =>
    setMobileOpen((prev) => !prev);

  const closeSidebar = () =>
    setMobileOpen(false);

  return (
    <SidebarContext.Provider
      value={{
        mobileOpen,
        toggleSidebar,
        closeSidebar,
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
}

export function useSidebarContext() {
  return useContext(SidebarContext);
}
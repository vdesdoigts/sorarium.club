import { Menus } from '@/utils/types';
import { createContext, ReactNode, useState } from 'react';

type SidebarContext = {
  menus: Menus;
  sidebarToggle: any;
  toggleSidebar: () => void;
  closeSidebar: () => void;
};

// eslint-disable-next-line @typescript-eslint/no-redeclare
export const SidebarContext = createContext<SidebarContext>(
  {} as SidebarContext
);

type Props = {
  children: ReactNode;
  menus: Menus;
};

export function SidebarProvider({ children, menus }: Props) {
  const [sidebarToggle, setSidebarToggle] = useState(false);
  const toggleSidebar = () => {
    setSidebarToggle(!sidebarToggle);
  };

  const closeSidebar = () => {
    setSidebarToggle(false);
  };

  return (
    <SidebarContext.Provider
      value={{ menus, sidebarToggle, toggleSidebar, closeSidebar }}
    >
      {children}
    </SidebarContext.Provider>
  );
}

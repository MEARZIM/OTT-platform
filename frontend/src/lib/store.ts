import { create } from "zustand";

interface RouteStore {
  activeSection: string;
  setActiveSection: (section: string) => void;
}

export const useAdminRouteStore = create<RouteStore>((set) => ({
  activeSection: "dashboard", // Default route
  setActiveSection: (section) => set({ activeSection: section }),
}));

import { Award, BarChart, Settings, ShieldUser } from "lucide-react";

export const NAV_ITEMS = [
    { id: "dashboard", label: "Super Admin Dashboard", icon: BarChart, path: "/super-admin/dashboard" },
    { id: "manage-admins", label: "Manage Admins", icon: ShieldUser, path: "/super-admin/manage-admins" },
    { id: "adds", label: "Adds Mangement", icon: Award, path: "/super-admin/manage-adds" },
    { id: "settings", label: "Settings", icon: Settings, path: "/super-admin/settings" },
];
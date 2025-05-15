import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:8080";

export const VITE_BACKEND_FLASK_URL = import.meta.env.VITE_BACKEND_FLASK_URL || "http://localhost:8080";
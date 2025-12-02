import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getWordPressImage(url: string | undefined | null): string {
  if (!url) return "";

  // If it's already a full URL
  if (url.startsWith("http")) {
    // Ensure we use the configured wordpress URL domain if possible,
    // or just ensure https if the environment is https
    // For now, let's just return it as is, but we could add logic to replace localhost with the actual domain if needed
    return url;
  }

  // If it's a relative path, prepend the WordPress URL
  const wpUrl = process.env.NEXT_PUBLIC_WORDPRESS_URL || "";
  // Remove trailing slash from wpUrl if present and leading slash from url if present
  const cleanWpUrl = wpUrl.replace(/\/$/, "");
  const cleanPath = url.startsWith("/") ? url : `/${url}`;

  return `${cleanWpUrl}${cleanPath}`;
}

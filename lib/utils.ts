// lib/utils.ts
export function formatDate(date: Date): string {
  return date.toLocaleDateString("en-US");
}

export function formatTime(date: Date): string {
  return date.toLocaleTimeString("en-US", { hour: '2-digit', minute: '2-digit' });
}


export function cn(...classes: (string | false | null | undefined)[]): string {
  return classes.filter(Boolean).join(" ");
}
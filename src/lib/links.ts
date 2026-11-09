/** Accept only absolute http(s) URLs so an env value cannot become a script link. */
export function safeHttpUrl(value: string | undefined): string {
  if (!value) return "";
  try {
    const url = new URL(value.trim());
    if (url.protocol !== "https:" && url.protocol !== "http:") return "";
    return url.toString();
  } catch {
    return "";
  }
}

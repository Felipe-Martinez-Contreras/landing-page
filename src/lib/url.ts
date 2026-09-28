/**
 * Prefixes a root-relative path with the configured base (import.meta.env.BASE_URL),
 * so internal links keep working if the site is served from a subpath.
 * External URLs and in-page anchors are returned unchanged.
 */
export function withBase(
  path: string,
  base: string = import.meta.env.BASE_URL,
): string {
  if (/^[a-z][a-z\d+.-]*:/i.test(path) || path.startsWith("#")) return path;
  const trimmedBase = base.endsWith("/") ? base.slice(0, -1) : base;
  const trimmedPath = path.startsWith("/") ? path : `/${path}`;
  return `${trimmedBase}${trimmedPath}`;
}

/** True when the URL points outside the site (http/https with a host). */
export function isExternal(href: string): boolean {
  return /^https?:\/\//i.test(href);
}

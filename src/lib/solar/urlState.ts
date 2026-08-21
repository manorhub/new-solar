export function getUrlParams(): Record<string, string> {
  if (typeof window === 'undefined') return {};
  const params = new URLSearchParams(window.location.search);
  const result: Record<string, string> = {};
  params.forEach((value, key) => {
    result[key] = value;
  });
  return result;
}

export function setUrlParams(paramsRecord: Record<string, string | number | boolean | undefined>) {
  if (typeof window === 'undefined') return;
  const currentUrl = new URL(window.location.href);
  const searchParams = new URLSearchParams();

  Object.entries(paramsRecord).forEach(([key, val]) => {
    if (val !== undefined && val !== null && val !== '') {
      searchParams.set(key, String(val));
    }
  });

  const newSearch = searchParams.toString();
  const newPath = `${currentUrl.pathname}${newSearch ? `?${newSearch}` : ''}`;
  window.history.replaceState({}, '', newPath);
}

export function parseNumberParam(params: Record<string, string>, key: string, fallback: number): number {
  if (params[key] && !isNaN(Number(params[key]))) {
    return Number(params[key]);
  }
  return fallback;
}

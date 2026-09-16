const trimTrailingSlash = (value: string) => value.replace(/\/+$/, '');

// This deployment is kept online as a static portfolio archive. Set the
// variable to "false" only when a live API is connected again.
export const isPortfolioMode =
  import.meta.env.VITE_PORTFOLIO_MODE !== 'false';

export const apiBaseUrl = trimTrailingSlash(
  isPortfolioMode ? '' : import.meta.env.VITE_API_BASE_URL || ''
);

export const buildApiUrl = (path: string) => {
  if (!apiBaseUrl) return path;
  return `${apiBaseUrl}${path.startsWith('/') ? path : `/${path}`}`;
};

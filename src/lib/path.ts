// The URL people actually see: "/about.html" → "/about", "/index.html" → "/".
export const publicPath = (pathname: string) =>
  pathname.replace(/\.html$/, '').replace(/\/index$/, '').replace(/\/$/, '') || '/';

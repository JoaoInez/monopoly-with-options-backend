const getCookies = (cookies: string | undefined) => (cookie: string) =>
  cookies
    ?.split("; ")
    ?.find((_cookie) => _cookie.includes(`${cookie}=`))
    ?.replace(`${cookie}=`, "");

export default getCookies;

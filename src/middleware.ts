// export { auth as middleware } from "@/auth"


import { auth } from "@/auth"


export default auth((req) => {
    const protectedRoutes = ["/user_dashboard", "/wallet", "/otc", "/profile", "/profile/overview", "/profile/security", "/profile/user_kyc", "/profile/task", "/wallet/payment/crypto", "/wallet/transaction", "/otc", "/otc/advertisement", "/otc/advertisement/atok", "/otc/advertisement/opin", "/otc/advertisement/rbl", "/otc/advertisement/sda", "/otc/advertisement/star", "/otc/advertisement/wow"]
    const session = req?.auth
    const pathname = req.nextUrl.pathname
    //const isProtectedRoute = protectedRoutes.includes(pathname)

    if(!session && protectedRoutes.includes(pathname)){
        const newURL = new URL("/auth", req.nextUrl.origin);
        return Response.redirect(newURL)
    }
})
export const config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)']
  }
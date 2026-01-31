// proxy.ts
import { NextRequest, NextResponse } from "next/server"
import { getToken } from "next-auth/jwt"

export async function proxy(req: NextRequest) {
    const token = await getToken({
        req,
        secret: process.env.NEXTAUTH_SECRET,
    })


    if (!token) {
        console.log("No token found")
        const url = req.nextUrl.clone()
        url.pathname = "/auth/sign-in"
        return NextResponse.redirect(url)
    }
    if (token) {
        console.log("Token found")
    }

    return NextResponse.next()
}

// 🔐 Protect all private routes here
export const config = {
    matcher: [
        "/dashboard/:path*",
        "/jobs/post",
        "/profile/:path*",
        "/settings/:path*",
    ],
}

Login Page:
  function check() {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    //  const phoneRegex = /^(\+8801[3-9]\d{8}|\+88[0-9]{11}|01[3-9]\d{8})$/;

    if (emailRegex.test(formData.phoneOrEmail)) {
      return "bizemail";
    }
    // else if (phoneRegex.test(formData.phoneOrEmail)) {
    //   return "bizmobile";
    // }
  }

  const validateForm = () => {
    const newErrors = { ...errors };

    const checkType = check();
    if (!checkType) {
      newErrors.phoneOrEmail = "Email format is invalid";
    }

    if (!formData.phoneOrEmail.trim()) {
      newErrors.phoneOrEmail = "Email is required";
    }

    if (!formData.password.trim()) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);

    // Return true if there are no errors
    return Object.values(newErrors).every((error) => !error);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e?.preventDefault();

    try {
      if (validateForm()) {
        setLoading(true);
        const response = await signIn("credentials", {
          user: JSON.stringify(formData),
          redirect: false,
          rememberMe: formData.rememberMe, // Pass the rememberMe value here
        });

        if (response?.status === 200) {
          addToast("You have successfully logged in", "success", 3000);
          clearCart();
          router.push("/dashboard");
        } else if (response?.status === 401) {
          addToast(
            "Invalid credentials, please check your email and password!",
            "error",
            2500
          );
        } else {
          addToast(response?.error || "Login Failed", "error", 2500);
        }
      }
    } catch {
      addToast("Login failed", "error", 2500);
    } finally {
      setLoading(false);
    }
  };

=============================================================================
options Page:
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "@/prisma/prisma";
import { NextAuthOptions } from "next-auth";
import bcrypt from "bcrypt";

export const options: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {},
      async authorize(credentials: any): Promise<any> {
        if (!credentials || !credentials.user) {
          return null;
        }

        const credentialsData = JSON.parse(credentials.user);
        try {
          const phoneOrEmail = credentialsData.phoneOrEmail;
          const password = credentialsData.password;
          const rememberMe = credentialsData.rememberMe;
          function check() {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            const phoneRegex =
              /^(\+8801[3-9]\d{8}|\+88[0-9]{11}|01[3-9]\d{8})$/;

            if (emailRegex.test(phoneOrEmail)) {
              return "bizemail";
            } else if (phoneRegex.test(phoneOrEmail)) {
              return "bizmobile";
            }
          }
          const checkType = check();

          const user = await prisma.pabuziness.findFirst({
            where: {
              OR: [{ [checkType as string]: phoneOrEmail }],
            },
            select: {
              bizid: true,
              xownername: true,
              bizemail: true,
              bizmobile: true,
              xpassword: true,
              zactive: true,
              zbizrole: true,
            },
          });

          if (!user || user.zactive === 0) {
            return null;
          }
          const isPasswordMatched = await bcrypt.compare(
            password,
            user.xpassword ?? ""
          );
          if (!isPasswordMatched) {
            return null;
          }

          return {
            id: user.bizid,
            name: user.xownername,
            email: user.bizemail,
            mobile: user.bizmobile,
            role: user.zbizrole,
            rememberMe,
          };
        } catch {
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: "/",
  },
  callbacks: {
    async jwt({ token, user }) {
      return {
        ...token,
        id: user?.id ?? token.id,
        name: user?.name ?? token.name,
        email: user?.email ?? token.email,
        mobile: (user as any)?.mobile ?? token.mobile,
        role: (user as any)?.role ?? token.role,
        rememberMe: (user as any)?.rememberMe ?? token.rememberMe,
      };
    },
    async session({ session, token }) {
      session.user = {
        id: token.id as string,
        name: token.name as string,
        email: token.email as string,
        mobile: token.mobile as string,
        role: token.role as string,
      };

      return session;
    },
  },
  session: {
    strategy: "jwt",
    maxAge: 3 * 24 * 60 * 60, // 3 days
    updateAge: 24 * 60 * 60, // Refresh every 24 hours
  },
  secret: process.env.JWT_SECRET,
};

==================================================================
middleware:
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const token = await getToken({
    req,
    secret: process.env.JWT_SECRET,
  });

  // Redirect to home if token is missing
  if (!token) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}

// Apply middleware to specific routes
export const config = { matcher: ["/dashboard/:path*"] };


========================================================================




import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware(req) {
    console.log('middleware ++++++++++ ',req)
  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });

  // Redirect to home if token is missing
  if (!token) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}

// Apply middleware to specific routes
export const config = { matcher: ["/admin/:path*"] };

import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: string;
      fcm_token: string;
      access_token: string;
    } & Session["user"];
  }

  interface User {
    id: string;
    role: string;
    fcm_token: string;
    access_token: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role: string;
    fcm_token: string;
    access_token: string;
  }
}

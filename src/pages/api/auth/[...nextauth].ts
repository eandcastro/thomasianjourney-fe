import ky from "ky";
import NextAuth, { AuthOptions, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: "Credentials",
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        // You need to provide your own logic here that takes the credentials
        // submitted and returns either a object representing a user or value
        // that is false/null if the credentials are invalid.
        // e.g. return { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
        // You can also use the `req` object to obtain additional parameters
        // (i.e., the request IP address)
        const response = await ky("http://localhost:3000/user/login", {
          method: "POST",
          body: JSON.stringify(credentials),
          headers: {
            "Content-Type": "application/json",
            Accepts: "application/json",
            "x-tj-api-security-token": process.env.TJ_SECURITY_TOKEN,
          },
        });

        const user: {
          id: string;
          role: string;
          fcm_token: string;
          access_token: string;
        } = await response.json();

        // If no error and we have user data, return it
        if (response.ok && user) {
          console.log("GOES HERE");
          return user;
        }
        // Return null if user data could not be retrieved
        return null;
      },
    }),
  ],
  callbacks: {
    session: async ({ session, token }) => {
      session.user.id = token.id;
      session.user.role = token.role;
      session.user.fcm_token = token.fcm_token;
      session.user.access_token = token.access_token;
      return session;
    },
    jwt: async ({ token, user }) => {
      console.log("user nextauth", user);
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.fcm_token = user.fcm_token;
        token.access_token = user.access_token;
        // token.access_token = account?.access_token;
        console.log("has user nextauth", user);
      }

      return token;
    },
  },
  pages: {
    signIn: "/",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.JWT_SECRET,
};

export default NextAuth(authOptions);

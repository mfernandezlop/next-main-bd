import bcrypt from "bcryptjs";
import clientPromise from "@/lib/mongodb";
// import { getUser, updateUser } from '../user';
// import Adapters from 'next-auth/adapters'
// import { PrismaClient } from '@prisma/client'
// const prisma = new PrismaClient()

import { NextApiRequest, NextApiResponse } from "next";
import { getUser, updateUser, createUser } from '@/lib/api/user';

import CredentialsProvider from "next-auth/providers/credentials";

const nextAuthConfig = {
  // Used to debug https://github.comnext-auth/issues/1664
  // cookies: {
  //   csrfToken: {
  //     name: 'next-auth.csrf-token',
  //     options: {
  //       httpOnly: true,
  //       sameSite: 'none',
  //       path: '/',v
  //       secure: true
  //     }
  //   },
  //   pkceCodeVerifier: {
  //     name: 'next-auth.pkce.code_verifier',
  //     options: {
  //       httpOnly: true,
  //       sameSite: 'none',
  //       path: '/',
  //       secure: true
  //     }
  //   }
  // },
  providers: [
    // EmailProvider({
    //   server: process.env.EMAIL_SERVER,
    //   from: process.env.EMAIL_FROM,
    // }),
    // GitHubProvider({
    //   clientId: process.env.GITHUB_ID,
    //   clientSecret: process.env.GITHUB_SECRET,
    // }),
    // Auth0Provider({
    //   clientId: process.env.AUTH0_ID,
    //   clientSecret: process.env.AUTH0_SECRET,
    //   domain: process.env.AUTH0_DOMAIN,
    //   // Used to debug https://github.comnext-auth/issues/1664
    //   // protection: ["pkce", "state"],
    //   // authorizationParams: {
    //   //   response_mode: 'form_post'
    //   // }
    //   protection: "pkce",
    // }),
    // TwitterProvider({
    //   clientId: process.env.TWITTER_ID,
    //   clientSecret: process.env.TWITTER_SECRET,
    // }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
      email: { label: "Username", type: "email", placeholder: "jsmith" },
      password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
      const email = credentials.email;
      const password = credentials.password;
     
     
      // await client.connect();
      // const db = client.db();
      // const collection = db.collection("users");
      const user = await getUser(email);
      // // Check if user already exists in the database
      // const existingUser = await collection.findOne({ email: user.email });
    
      if (!user) {
      throw new Error("You haven't registered yet")
      }
      if (user) return signIn({ password, user })
      }
      }),
  ],
  callbacks: {
    async signIn(user, account, profile) {
      // Connect to MongoDB
      await client.connect();

      const db = client.db();
      const collection = db.collection("users");

      // Check if user already exists in the database
      const existingUser = await collection.findOne({ email: user.email });
      if (existingUser) {
        // If user already exists, update their details
        await collection.updateOne(
          { email: user.email },
          {
            $set: {
              name: user.name,
              image: user.image,
              email: user.email,
            },
          }
        );
        return true;
      } else {
        // If user doesn't exist, create a new user
        const password = await bcrypt.hash(Math.random().toString(), 10);
        await collection.insertOne({
          name: user.name,
          image: user.image,
          email: user.email,
          password,
        });
        return true;
      }
    },
    async session(session, user) {
      // Add custom session data
      session.userId = user.id;
      return session;
    },
    async jwt(token, user, account, profile, isNewUser) {
      // Add custom JWT token data
      if (user) {
        token.userId = user.id;
      }
      return token;
    },
  },
  database: process.env.MONGODB_URI,
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    jwt: true,
  },
  jwt: {
    secret: process.env.NEXTAUTH_JWT_SECRET,
  },

  // Default Database Adapter (TypeORM)
  // database: process.env.DATABASE_URL

  // Prisma Database Adapter
  // To configure this app to use the schema in `prisma/schema.prisma` run:
  // npx prisma generate
  // npx prisma migrate dev
  // adapter: Adapters.Prisma.Adapter({ prisma })
}

export default nextAuthConfig
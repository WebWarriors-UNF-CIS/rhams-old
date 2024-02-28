import { User } from "@/src/app/_shared/user"
import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { remult , UserInfo } from "remult"

const validUsers: UserInfo[] = [
  { id: "1", name: "Jane" },
  { id: "2", name: "Steve" }
]

function findUser(name?: string | null) {
  return validUsers.find((user) => user.name === name)
}

const auth = NextAuth({
  providers: [
    Credentials({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "Credentials",
      // `credentials` is used to generate a form on the sign in page.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        name: { label: "Username", type: "text", placeholder: "jsmith" },
        password: {  label: "Password", type: "password" }
      },
      authorize: (credentials) => findUser(credentials?.name as string) || null
    })
  ],
  callbacks: {
    async signIn({ user, account }) {
      const existingUser = await remult.repo(User).findFirst({ id: parseInt(user.id!) });
      if (!existingUser) return false;

      return true;
    }
  }
})

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

export const { handlers: { GET, POST }, auth, signIn, signOut } = NextAuth({
  providers: [
    Credentials
  ],
  callbacks: {
    async signIn({ user }) {
      const existingUser = await remult.repo(User).findFirst({ id: parseInt(user.id!) });
      if (!existingUser) return false;

      return true;
    }
  },
  pages: {
    signIn: '/login'
  }
})
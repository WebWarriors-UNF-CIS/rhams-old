import NextAuth, { getServerSession } from "next-auth/next"
import CredentialsProvider from "next-auth/providers/credentials"
import { UserInfo } from "remult"

const validUsers: UserInfo[] = [ // this can probably be replaced with a remult api call
  { id: "1", name: "Jane" },
  { id: "2", name: "Steve" }
]
function findUser(name?: string | null) { return validUsers.find((user) => user.name === name) }

const auth = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
      // Add logic here to look up the user from the credentials supplied
        const user = { id: "1", name: "J Smith", email: "jsmith@example.com" }
        if (user) {
          // Any object returned will be saved in `user` property of the JWT
          return user
        } else {
          // If you return null then an error will be displayed advising the user to check their details.
          return null
          // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
        }
      }
    })
  ],
  callbacks: {
    session: ({ session }) => ({
      ...session,
      user: findUser(session.user?.name)
    })
  },
  pages: {
    signIn: "/login",
    newUser: "/users/create"
  }
})
export { auth as GET, auth as POST }

export async function getUserOnServer() {
  const session = await getServerSession()
  return findUser(session?.user?.name) // FIX
}
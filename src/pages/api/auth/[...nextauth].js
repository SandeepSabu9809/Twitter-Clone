import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    new GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    // ...add more providers here
  ],

  pages:{
    signIn:"/auth/signin"
  },

  secret:process.env.SECRET,

  callbacks:{
    async session({session,token}){
      session.user.username = session.user.name.split(" ").join("").toLocaleLowerCase();
      session.user.id = token.sub;
      return session;
    }
  },



}



export default NextAuth(authOptions)
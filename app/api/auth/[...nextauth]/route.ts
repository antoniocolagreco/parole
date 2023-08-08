import prisma from '@/app/libs/prismadb'
import { InvalidCredentialsError } from '@/errors/auth'
import { default as dictionary } from '@/languages/en.json'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import bcrypt from 'bcrypt'
import { AuthOptions } from 'next-auth'
import NextAuth from 'next-auth/next'
import CredentialsProvider from 'next-auth/providers/credentials'
import GithubProvider from 'next-auth/providers/github'
import GoogleProvider from 'next-auth/providers/google'

export const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({ clientId: process.env.GOOGLE_ID as string, clientSecret: process.env.GOOGLE_SECRET as string }),
    GithubProvider({ clientId: process.env.GITHUB_ID as string, clientSecret: process.env.GITHUB_SECRET as string }),
    CredentialsProvider({
      name: dictionary.credentials,
      credentials: {
        email: { label: dictionary.email, type: 'text' },
        password: { label: dictionary.password, type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email) throw new InvalidCredentialsError()
        if (!credentials?.password) throw new InvalidCredentialsError()

        const user = await prisma.user.findUnique({ where: { email: credentials.email } })

        if (!user) throw new InvalidCredentialsError()
        if (!user.hashedPassword) throw new InvalidCredentialsError()

        const isCorrectPassword = await bcrypt.compare(credentials.password, user.hashedPassword)
        if (!isCorrectPassword) throw new InvalidCredentialsError()

        return user
      },
    }),
  ],
  debug: process.env.NODE_ENV === 'development',
  session: { strategy: 'jwt' },
  secret: process.env.NEXTAUTH_SECRET,
  adapter: PrismaAdapter(prisma),
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }


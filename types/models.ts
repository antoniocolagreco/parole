import {
  Account as PrismaAccount,
  Conversation as PrismaConversation,
  Message as PrismaMessage,
  User as PrismaUser,
} from '@prisma/client';

export type User = PrismaUser & { conversations: Conversation[]; messages: Message[] }
export type Conversation = PrismaConversation & { users: User[]; messages: Message[] }
export type Message = PrismaMessage & { seen: User[] }
export type Account = PrismaAccount & {}

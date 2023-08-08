type User = {
  id: string
  name?: string
  email?: string
  email_verified: string
  image: string
  hashedPassword?: string
  createdAt: Date
  updatedAt: Date
  conversationIds: string[]
  conversations: Conversation[]
  seenMessageIds: string[]
  seenMessages: Message[]
  messages: Message[]
  account: Account[]
}

type Conversation = {}
type Message = {}
type Account = {}

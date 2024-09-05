"use server"

import { ReactNode } from "react"
import { CoreMessage, generateId } from "ai"
import {
  createAI,
  createStreamableValue,
  getMutableAIState,
  streamUI,
} from "ai/rsc"

import { groq } from "@/lib/groq"

import { TextStreamMessage } from "@/components/app/marketing-chat-message"

export async function sendMessage(message: string, model: string) {
  const messages = getMutableAIState<typeof AI>("messages")

  messages.update([
    ...(messages.get() as CoreMessage[]),
    { role: "user", content: message },
  ])

  const contentStream = createStreamableValue("")
  const textComponent = <TextStreamMessage content={contentStream.value} />

  const { value: stream } = await streamUI({
    model: groq(model),
    system: `
      - Your name is "Undrstnd" and you are a chatbot.
      - You are to showcase and preview how fast and cheap our inferance can be.
    `,
    messages: messages.get() as CoreMessage[],
    text: async function* ({ content, done }) {
      if (done) {
        messages.done([
          ...(messages.get() as CoreMessage[]),
          { role: "assistant", content },
        ])

        contentStream.done()
      } else {
        contentStream.update(content)
      }

      return textComponent
    },
  })

  return stream
}

export type UIState = Array<ReactNode>

export type AIState = {
  chatId: string
  messages: Array<CoreMessage>
}

export const AI = createAI<AIState, UIState>({
  initialAIState: {
    chatId: generateId(),
    messages: [],
  },
  initialUIState: [],
  actions: {
    sendMessage,
  },
})

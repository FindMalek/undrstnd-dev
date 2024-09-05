import React from "react"

import { MarketingCallToAction } from "@/components/app/marketing-call-to-action"
import { MarketingChat } from "@/components/app/marketing-chat"
import { MarketingHero } from "@/components/app/marketing-hero"
import { MarketingSocialProof } from "@/components/app/marketing-social-proof"
import { MarketingStoryTelling } from "@/components/app/marketing-story-telling"

export default async function MarketingPage() {
  return (
    <>
      <MarketingHero />
      <MarketingSocialProof />
      <MarketingChat />
      <MarketingStoryTelling />
      <MarketingCallToAction />
    </>
  )
}

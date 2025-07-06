"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Zap,
  Users,
  Code,
  TrendingUp,
  MessageSquare,
  Plus,
  BookOpen,
  Wrench,
  FlaskConical,
} from "lucide-react"
import { useState } from "react"
import { HeroLightLines, SectionLightLines } from "../components/light-lines"
import { Discord } from "@/components/icons/discord"
import { config } from "@/lib/config"
import Link from "next/link"

export default function HomePage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  const faqs = [
    {
      question: "What is Sol AI?",
      answer:
        "Sol AI is an AI chatbot that empowers users to learn about the Solana ecosystem. Whether you're a beginner or a seasoned pro, Sol AI helps you navigate and understand Solana, and makes onboarding new users seamless.",
    },
    {
      question: "Can Sol AI generate images, or is its function limited to providing information?",
      answer:
        "Sol AI, based on a large language model (LLM), specializes in processing and generating text. Therefore, its primary function is to provide information and answer questions, and it is not designed to generate images.",
    },
    {
      question: "Is Sol AI limited to providing information about Solana?",
      answer:
        "No, Sol AI can provide information about other blockchains and topics beyond Solana. What sets Sol AI apart is that it has been optimized and connected with specialized and up-to-date information and projects within the Solana ecosystem, such as Blinks.",
    },
  ]

  return (
    <div className="min-h-screen text-white overflow-hidden relative">
      <div className="relative z-10">
        <section className="relative px-6 py-20 max-w-7xl mx-auto">
          <HeroLightLines />

          <div className="relative z-10 text-center max-w-4xl mx-auto">
            <h1 className="text-6xl md:text-7xl font-bold mb-6 leading-tight">
              The AI of{" "}
              <span className="bg-gradient-to-r from-[var(--solana-purple)] to-[var(--solana-green)] bg-clip-text text-transparent">Solana</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
              AI-powered Solana virtual assistant. Your bridge to the Solana ecosystem: projects, communities,
              hackathons, blinks, and much more.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href={config.socialMedia.discord} target="_blank">
                <Button
                  size="lg"
                  className="cursor-pointer bg-gradient-to-r from-[var(--solana-purple)] to-[var(--solana-green)] hover:from-[var(--solana-purple)]/90 hover:to-[var(--solana-green)]/90 text-white px-8 py-3 rounded-xl"
                >
                  Join community
                  <Discord className="ml-1 size-6" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        <section className="px-6 py-20 max-w-7xl mx-auto relative">
          <SectionLightLines variant="mission" />
          <div className="grid md:grid-cols-2 gap-12">
            <Card className="bg-gray-900/80 border-gray-700/50 backdrop-blur-sm">
              <CardContent className="p-8">
                <div className="flex items-center mb-4">
                  <Zap className="w-8 h-8 text-[var(--solana-purple)] mr-3" />
                  <h2 className="text-3xl font-bold">Mission</h2>
                </div>
                <p className="text-gray-300 text-lg leading-relaxed">
                  Accelerate the learning and onboarding process for people on Solana. We facilitate learning about the
                  ecosystem and help onboard more users.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gray-900/80 border-gray-700/50 backdrop-blur-sm">
              <CardContent className="p-8">
                <div className="flex items-center mb-4">
                  <TrendingUp className="w-8 h-8 text-[var(--solana-green)] mr-3" />
                  <h2 className="text-3xl font-bold">Vision</h2>
                </div>
                <p className="text-gray-300 text-lg leading-relaxed">
                  To be the leading virtual assistant for Solana. Empowering users with intelligent, up-to-date
                  information about the entire ecosystem.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="px-6 py-20 max-w-7xl mx-auto relative">
          <SectionLightLines variant="context" />
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Specialized context in{" "}
                <span className="bg-gradient-to-r from-[var(--solana-purple)] to-[var(--solana-green)] bg-clip-text text-transparent">
                  Solana
                </span>
              </h2>
              <p className="text-xl text-gray-300 mb-8">
                We keep adding comprehensive knowledge about the Solana ecosystem to provide you with the most accurate
                and up-to-date information.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center p-4 bg-gray-900/80 border border-gray-700/50 rounded-xl backdrop-blur-sm hover:border-[var(--solana-purple)]/40 transition-colors">
                <Users className="w-6 h-6 text-[var(--solana-purple)] mr-4 flex-shrink-0" />
                <span className="text-lg break-words">Projects & communities</span>
              </div>

              <div className="flex items-center p-4 bg-gray-900/80 border border-gray-700/50 rounded-xl backdrop-blur-sm hover:border-[var(--solana-green)]/40 transition-colors">
                <Code className="w-6 h-6 text-[var(--solana-green)] mr-4 flex-shrink-0" />
                <span className="text-lg break-words">Hackathones</span>
              </div>

              <div className="flex items-center p-4 bg-gray-900/80 border border-gray-700/50 rounded-xl backdrop-blur-sm hover:border-[var(--solana-purple)]/40 transition-colors">
                <Zap className="w-6 h-6 text-[var(--solana-purple)] mr-4 flex-shrink-0" />
                <span className="text-lg break-words">Blinks</span>
              </div>

              <div className="flex items-center p-4 bg-gray-900/80 border border-gray-700/50 rounded-xl backdrop-blur-sm hover:border-[var(--solana-green)]/40 transition-colors">
                <Plus className="w-6 h-6 text-[var(--solana-green)] mr-4 flex-shrink-0" />
                <span className="text-lg break-words">More to come soon...</span>
              </div>
            </div>
          </div>
        </section>

        <section className="px-6 py-20 max-w-7xl mx-auto relative">
          <SectionLightLines variant="features" />
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              A Fully Integrated Suite of{" "}
              <span className="bg-gradient-to-r from-[var(--solana-purple)] to-[var(--solana-green)] bg-clip-text text-transparent">
                AI Services
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Comprehensive AI-powered tools designed specifically for the Solana ecosystem
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="bg-gray-900/80 border-gray-700/50 backdrop-blur-sm hover:border-[var(--solana-purple)]/40 transition-all duration-300">
              <CardContent className="p-8 text-center">
                <Badge className="absolute -top-2 -right-2 bg-[var(--solana-purple)] text-white text-xs">Coming Soon</Badge>
                <MessageSquare className="w-12 h-12 text-[var(--solana-purple)] mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-3">Sol AI Assistant</h3>
                <p className="text-gray-300">Intelligent conversations about Solana projects and ecosystem</p>
              </CardContent>
            </Card>

            <Card className="bg-gray-900/80 border-gray-700/50 backdrop-blur-sm hover:border-[var(--solana-green)]/40 transition-all duration-300 relative">
              <Badge className="absolute -top-2 -right-2 bg-[var(--solana-green)] text-black text-xs">Coming Soon</Badge>
              <CardContent className="p-8 text-center">
                <BookOpen className="w-12 h-12 text-[var(--solana-green)] mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-3">Sol AI Blog</h3>
                <p className="text-gray-300">Latest insights and updates about the Solana ecosystem</p>
              </CardContent>
            </Card>

            <Card className="bg-gray-900/80 border-gray-700/50 backdrop-blur-sm hover:border-[var(--solana-purple)]/40 transition-all duration-300 relative">
              <Badge className="absolute -top-2 -right-2 bg-[var(--solana-purple)] text-white text-xs">Coming Soon</Badge>
              <CardContent className="p-8 text-center">
                <Wrench className="w-12 h-12 text-[var(--solana-purple)] mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-3">Sol AI Developers</h3>
                <p className="text-gray-300">AI-powered development tools and resources for builders</p>
              </CardContent>
            </Card>

            <Link href={config.socialMedia.github} target="_blank">
              <Card className="h-full bg-gray-900/80 border-gray-700/50 backdrop-blur-sm hover:border-[var(--solana-green)]/40 transition-all duration-300">
                <CardContent className="p-8 text-center">
                  <FlaskConical className="w-12 h-12 text-[var(--solana-green)] mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-3">Sol AI Labs</h3>
                  <p className="text-gray-300">Experimental features and cutting-edge research</p>
                </CardContent>
              </Card>
            </Link>
          </div>
        </section>

        <section className="px-6 py-20 max-w-7xl mx-auto relative">
          <SectionLightLines variant="faq" />
          <div className="grid lg:grid-cols-2 gap-16">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Sol AI{" "}
                <span className="bg-gradient-to-r from-[var(--solana-purple)] to-[var(--solana-green)] bg-clip-text text-transparent">FAQs</span>
              </h2>
              <p className="text-xl text-gray-300">Frequently asked questions about our AI-powered Solana assistant</p>
            </div>

            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <Card key={index} className="cursor-pointer bg-gray-900/80 border-gray-700/50 backdrop-blur-sm hover:bg-gray-800/50 transition-colors">
                  <CardContent className="p-0">
                    <Button
                      onClick={() => setOpenFaq(openFaq === index ? null : index)}
                      className="cursor-pointer w-full p-6 text-left flex items-center justify-between rounded-lg"
                    >
                      <h3 className="text-lg font-semibold pr-4">{faq.question}</h3>
                      <div
                        className={`transform transition-transform duration-200 ${openFaq === index ? "rotate-45" : ""}`}
                      >
                        <Plus className={`w-5 h-5 text-white"}`} />
                      </div>
                    </Button>
                    {openFaq === index && (
                      <div className="px-6 pb-6">
                        <p className="text-gray-300 leading-relaxed">{faq.answer}</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="px-6 py-20 max-w-7xl mx-auto">
          <div className="relative">
            <SectionLightLines variant="cta" />
            <div className="absolute inset-0 bg-gradient-to-r from-[var(--solana-purple)]/30 to-[var(--solana-green)]/30 rounded-3xl blur-xl" />
            <Card className="relative bg-gray-900/80 border-gray-700/50 backdrop-blur-sm">
              <CardContent className="p-12 text-center">
                <h2 className="text-4xl md:text-5xl font-bold mb-6">
                  Ready to explore{" "}
                  <span className="bg-gradient-to-r from-[var(--solana-purple)] to-[var(--solana-green)] bg-clip-text text-transparent">
                    Solana
                  </span>{" "}
                  with AI?
                </h2>
                <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                  Join the future of Solana ecosystem exploration with our intelligent AI assistant
                </p>
                <Link href={config.socialMedia.discord} target="_blank">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-[var(--solana-purple)] to-[var(--solana-green)] hover:from-[var(--solana-purple)]/90 hover:to-[var(--solana-green)]/90 text-white px-8 py-3 rounded-xl"
                  >
                    Join community
                    <Discord className="ml-1 size-6" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </section>

      </div>
    </div>
  )
}

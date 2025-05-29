"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Bot, ArrowLeft } from "lucide-react"
import Link from "next/link"


export default function NotFound() {
    return (
        <section className="min-h-screen bg-black text-white overflow-hidden relative">
            <div className="relative z-10">
                <div className="flex items-center justify-center min-h-[80vh] px-6">
                    <div className="text-center max-w-2xl mx-auto">
                        <div className="mb-8">
                            <h1 className="text-8xl md:text-9xl font-bold bg-gradient-to-r from-[var(--solana-purple)] to-[var(--solana-green)] bg-clip-text text-transparent mb-4">
                                404
                            </h1>
                            <div className="w-32 h-1 bg-gradient-to-r from-[var(--solana-purple)] to-[var(--solana-green)] mx-auto rounded-full"></div>
                        </div>

                        <div className="mb-12">
                            <h2 className="text-3xl md:text-4xl font-bold mb-4">Page Not Found</h2>
                            <p className="text-xl text-gray-300 leading-relaxed">
                                Oops! It looks like this page got lost in the Solana blockchain. Don&lsquo;t worry, our AI assistant can help
                                you find what you&lsquo;re looking for.
                            </p>
                        </div>

                        <Card className="bg-gray-900/80 border-gray-700/50 backdrop-blur-sm">
                            <CardContent className="p-8">
                                <div className="flex items-center justify-center mb-4">
                                    <div className="w-12 h-12 bg-gradient-to-r from-[var(--solana-purple)] to-[var(--solana-green)] rounded-lg flex items-center justify-center mr-4">
                                        <Bot className="w-6 h-6 text-white" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-semibold">Need Help?</h3>
                                        <p className="text-gray-400 text-sm">Our AI is here to assist you</p>
                                    </div>
                                </div>
                                <p className="text-gray-300 mb-6 leading-relaxed">
                                    If you were looking for something specific, try asking Sol AI about it. Our assistant has
                                    comprehensive knowledge about the Solana ecosystem, including projects, development tools, and
                                    community resources.
                                </p>
                                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                                    <Link href="/chat">
                                        <Button
                                            size="lg"
                                            className="cursor-pointer bg-gradient-to-r from-[var(--solana-purple)] to-[var(--solana-green)] hover:from-[var(--solana-purple)]/90 hover:to-[var(--solana-green)]/90 text-white"
                                        >
                                            Ask Sol AI
                                        </Button>
                                    </Link>
                                    <Link href="/">
                                        <Button
                                            variant="outline"
                                            size="lg"
                                            className="cursor-pointer border-[var(--solana-purple)]/30 text-[var(--solana-purple)] hover:bg-[var(--solana-purple)]/10"
                                        >
                                            <ArrowLeft className="w-4 h-4 mr-2" />
                                            Go Back
                                        </Button>
                                    </Link>
                                </div>
                            </CardContent>
                        </Card>

                        <div className="mt-12 p-6 bg-gradient-to-r from-[var(--solana-purple)]/10 to-[var(--solana-green)]/10 rounded-xl border border-gray-700/30">
                            <p className="text-sm text-gray-400">
                                <span className="text-[var(--solana-purple)] font-semibold">Fun fact:</span> While you&lsquo;re here, Solana is processing
                                thousands of transactions per second. That&lsquo;s the power of high-performance blockchain technology!
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

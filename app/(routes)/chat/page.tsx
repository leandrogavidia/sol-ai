"use client"

import type React from "react"
import { useChat } from '@ai-sdk/react';
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Send, User, ChevronDown, Zap, Trophy, Globe } from "lucide-react"
import { Mic, MicOff, Paperclip, Search, Settings, History, X, FileText, ImageIcon, Menu, Pencil } from "lucide-react"
import { useState, useRef, useEffect } from "react"
import { useWallet } from "@solana/wallet-adapter-react"
import { EarlyAccess } from "@/components/views/early-access"
import { SolanaWalletButton } from "@/components/wallet"
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import Image from "next/image"

interface Message {
    id: string
    content: string
    sender: "user" | "ai"
    timestamp: Date
}

interface ChatHistory {
    id: string
    title: string
    lastMessage: string
    timestamp: Date
    messages: Message[]
}

type AssistantMode = "Ecosystem" | "Blinks" | "Hackathons"
type HackathonSubMode = "Colosseum" | "Super Team" | null
type CollosseumEvent = "Renaissance" | "Radar" | null
type SuperTeamEvent = "Solana Copa America" | null

const scrollingStyle = `
  @keyframes scroll-left {
    0% {
      transform: translateX(0);
    }
    100% {
      transform: translateX(-50%);
    }
  }
  
  .animate-scroll-left {
    animation: scroll-left 30s linear infinite;
  }
  
  .animate-scroll-left:hover {
    animation-play-state: paused;
  }
`

export default function ChatPage() {
    const messagesEndRef = useRef<HTMLDivElement>(null)

    const { messages, input, handleInputChange, handleSubmit, status, append } = useChat({
        api: "api/sol-ai",
        onFinish() {
            messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })

        },
    });
    const { connected, publicKey } = useWallet()

    const [assistantMode, setAssistantMode] = useState<AssistantMode>("Ecosystem")
    const [hackathonSubMode, setHackathonSubMode] = useState<HackathonSubMode>(null)
    const [collosseumEvent, setCollosseumEvent] = useState<CollosseumEvent>(null)
    const [superTeamEvent, setSuperTeamEvent] = useState<SuperTeamEvent>(null)
    const [isRecording, setIsRecording] = useState(false)
    const [showSidebar, setShowSidebar] = useState(false)
    const [showChatHistory, setShowChatHistory] = useState(false)
    const [chatHistories] = useState<ChatHistory[]>([
        {
            id: "1",
            title: "Getting Started with Solana",
            lastMessage: "What is Solana and how does it work?",
            timestamp: new Date(Date.now() - 86400000),
            messages: [],
        },
        {
            id: "2",
            title: "Solana Blinks Tutorial",
            lastMessage: "How do Solana Blinks work?",
            timestamp: new Date(Date.now() - 172800000),
            messages: [],
        },
        {
            id: "3",
            title: "DeFi Projects on Solana",
            lastMessage: "What are the best Solana projects to explore?",
            timestamp: new Date(Date.now() - 259200000),
            messages: [],
        },
    ])
    const [searchQuery, setSearchQuery] = useState("")
    const [currentChatId] = useState<string | null>(null)
    const userProfile = {
        name: "Anonymous User",
        email: "user@example.com",
        avatar: "/placeholder.svg?height=32&width=32",
    }
    const [selectedFile, setSelectedFile] = useState<File | null>(null)
    const fileInputRef = useRef<HTMLInputElement>(null)

    const preSelectedQuestions = [
        "What is Solana and how does it work?",
        "How do Solana Blinks work?",
        "What are the best Solana projects to explore?",
        "How do I get started with Solana development?",
        "What makes Solana different from other blockchains?",
        "Tell me about Solana's consensus mechanism",
        "What are the most popular Solana wallets?",
        "How does Solana handle smart contracts?",
    ]

    // const getModeDescription = () => {
    //     if (assistantMode === "Blinks") {
    //         return "Specialized in Solana Blinks and blockchain interactions"
    //     } else if (assistantMode === "Hackathons") {
    //         if (hackathonSubMode === "Colosseum") {
    //             if (collosseumEvent === "Renaissance") {
    //                 return "Focused on Colosseum Renaissance hackathon"
    //             } else if (collosseumEvent === "Radar") {
    //                 return "Focused on Colosseum Radar hackathon"
    //             }
    //             return "Focused on Colosseum hackathons"
    //         } else if (hackathonSubMode === "Super Team") {
    //             if (superTeamEvent === "Solana Copa America") {
    //                 return "Focused on Solana Copa America by Super Team"
    //             }
    //             return "Focused on Super Team hackathons"
    //         }
    //         return "Specialized in Solana hackathons and competitions"
    //     }
    //     return "General Solana ecosystem expert"
    // }

    const handleModeChange = (
        mode: AssistantMode,
        subMode?: HackathonSubMode,
        event?: CollosseumEvent | SuperTeamEvent,
    ) => {
        setAssistantMode(mode)
        setHackathonSubMode(subMode || null)
        setCollosseumEvent(null)
        setSuperTeamEvent(null)

        if (mode === "Hackathons" && subMode === "Colosseum" && event) {
            setCollosseumEvent(event as CollosseumEvent)
        } else if (mode === "Hackathons" && subMode === "Super Team" && event) {
            setSuperTeamEvent(event as SuperTeamEvent)
        }
    }

    const getModeIcon = () => {
        switch (assistantMode) {
            case "Blinks":
                return <Zap className="w-4 h-4" />
            case "Hackathons":
                return <Trophy className="w-4 h-4" />
            default:
                return <Globe className="w-4 h-4" />
        }
    }

    const getCurrentModeLabel = () => {
        if (assistantMode === "Hackathons") {
            if (hackathonSubMode === "Colosseum") {
                if (collosseumEvent) return `Colosseum - ${collosseumEvent}`
                return "Colosseum"
            } else if (hackathonSubMode === "Super Team") {
                if (superTeamEvent) return `Super Team - ${superTeamEvent}`
                return "Super Team"
            }
        }
        return assistantMode
    }

    useEffect(() => {
        const styleElement = document.createElement("style")
        styleElement.textContent = scrollingStyle
        document.head.appendChild(styleElement)

        return () => {
            document.head.removeChild(styleElement)
        }
    }, [])

    const filteredChatHistories = chatHistories.filter(
        (chat) =>
            chat.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            chat.lastMessage.toLowerCase().includes(searchQuery.toLowerCase()),
    )

    // const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    //     const file = event.target.files?.[0]
    //     if (file) {
    //         setSelectedFile(file)
    //         const fileMessage = `📎 Uploaded file: ${file.name} (${(file.size / 1024 / 1024).toFixed(2)} MB)`
    //         handleSendMessage(fileMessage)
    //     }
    // }

    const handleVoiceToggle = () => {
        setIsRecording(!isRecording)
        if (!isRecording) {
            console.log("Starting voice recording...")
        } else {
            console.log("Stopping voice recording...")
        }
    }

    const getFileIcon = (fileName: string) => {
        const extension = fileName.split(".").pop()?.toLowerCase()
        if (["jpg", "jpeg", "png", "gif", "webp"].includes(extension || "")) {
            return <ImageIcon className="w-4 h-4" />
        } else if (extension === "pdf") {
            return <FileText className="w-4 h-4" />
        }
        return <Paperclip className="w-4 h-4" />
    }

    if (!connected || !publicKey) {
        return (
            <EarlyAccess />
        )
    }

    return (
        <section className="min-h-screen bg-black text-white relative">
            <div className="relative z-10 flex flex-col h-screen">
                <header className="border-b border-gray-800 bg-black/80 backdrop-blur-sm">
                    <div className="max-w-4xl mx-auto px-6 py-4 flex flex-col items-center justify-between gap-4 md:flex-row">
                        <div className="w-full flex justify-between items-center gap-4">
                            <div className="flex items-center space-x-4">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => setShowSidebar(!showSidebar)}
                                    className="cursor-pointer border-gray-600 text-gray-400 hover:bg-gray-800 hover:text-white"
                                >
                                    <Menu className="w-4 h-4" />
                                </Button>

                                <Button variant="outline" size="sm" className="cursor-pointer border-gray-600 text-gray-400 hover:bg-gray-800 hover:text-white">
                                    <Pencil className="w-4 h-4" />
                                </Button>
                                <SolanaWalletButton />
                            </div>
                            <h1 className="text-lg font-medium text-white">Sol AI</h1>
                        </div>
                        <div className="flex items-center justify-between space-x-3 w-full md:justify-end">
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="cursor-pointer border-[var(--solana-purple)]/30 text-[var(--solana-purple)] hover:bg-[var(--solana-purple)]/10"
                                    >
                                        {getModeIcon()}
                                        <span className="ml-2 text-white">{getCurrentModeLabel()}</span>
                                        <ChevronDown className="w-3 h-3 ml-1 text-white" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="bg-gray-900 border-gray-700">
                                    <DropdownMenuItem onClick={() => handleModeChange("Ecosystem")}>
                                        <Globe className="w-4 h-4 mr-2" />
                                        Ecosystem
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => handleModeChange("Blinks")}>
                                        <Zap className="w-4 h-4 mr-2" />
                                        Blinks
                                    </DropdownMenuItem>
                                    <DropdownMenuSub>
                                        <DropdownMenuSubTrigger>
                                            <Trophy className="w-4 h-4 mr-2" />
                                            Hackathons
                                        </DropdownMenuSubTrigger>
                                        <DropdownMenuSubContent className="bg-gray-900 border-gray-700">
                                            <DropdownMenuSub>
                                                <DropdownMenuSubTrigger>Colosseum</DropdownMenuSubTrigger>
                                                <DropdownMenuSubContent className="bg-gray-900 border-gray-700">
                                                    <DropdownMenuItem onClick={() => handleModeChange("Hackathons", "Colosseum", "Renaissance")}>
                                                        Renaissance
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem onClick={() => handleModeChange("Hackathons", "Colosseum", "Radar")}>
                                                        Radar
                                                    </DropdownMenuItem>
                                                </DropdownMenuSubContent>
                                            </DropdownMenuSub>
                                            <DropdownMenuSub>
                                                <DropdownMenuSubTrigger>Super Team</DropdownMenuSubTrigger>
                                                <DropdownMenuSubContent className="bg-gray-900 border-gray-700">
                                                    <DropdownMenuItem
                                                        onClick={() => handleModeChange("Hackathons", "Super Team", "Solana Copa America")}
                                                    >
                                                        Solana Copa America
                                                    </DropdownMenuItem>
                                                </DropdownMenuSubContent>
                                            </DropdownMenuSub>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuItem onClick={() => handleModeChange("Hackathons")}>
                                                General Hackathons
                                            </DropdownMenuItem>
                                        </DropdownMenuSubContent>
                                    </DropdownMenuSub>
                                </DropdownMenuContent>
                            </DropdownMenu>

                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="sm" className="cursor-pointer w-8 h-8 p-1 rounded-full border-2 border-[var(--solana-purple/30)]">
                                        <User className="w-8 h-8 text-white " />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="bg-gray-900 border-gray-700 w-56">
                                    <div className="px-3 py-2 border-b border-gray-700">
                                        <p className="font-medium text-white">{userProfile.name}</p>
                                        <p className="text-sm text-gray-400">{userProfile.email}</p>
                                    </div>
                                    <DropdownMenuItem>
                                        <Settings className="w-4 h-4 mr-2" />
                                        Profile Settings
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </div>
                </header>

                {showSidebar && (
                    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm" onClick={() => setShowSidebar(false)}>
                        <div
                            className="absolute left-0 top-0 h-full w-80 bg-gray-900 border-r border-gray-700 shadow-xl"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="p-4 border-b border-gray-700">
                                <div className="flex items-center justify-end mb-4">
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => setShowSidebar(false)}
                                        className="cursor-pointer text-gray-400 hover:text-white"
                                    >
                                        <X className="w-4 h-4" />
                                    </Button>
                                </div>
                            </div>

                            <div className="p-4 space-y-2">
                                <Button
                                    variant="ghost"
                                    className="cursor-pointer w-full justify-start text-gray-300 hover:text-white hover:bg-gray-800"
                                >
                                    <Pencil className="w-4 h-4" />
                                    New Chat
                                </Button>

                                <Button
                                    variant="ghost"
                                    onClick={() => {
                                        setShowChatHistory(true)
                                        setShowSidebar(false)
                                    }}
                                    className="cursor-pointer w-full justify-start text-gray-300 hover:text-white hover:bg-gray-800"
                                >
                                    <History className="w-4 h-4 mr-3" />
                                    Chat History
                                </Button>
                            </div>
                        </div>
                    </div>
                )}

                {showChatHistory && (
                    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm" onClick={() => setShowChatHistory(false)}>
                        <div
                            className="absolute left-0 top-0 h-full w-80 bg-gray-900 border-r border-gray-700 shadow-xl"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="p-4 border-b border-gray-700">
                                <div className="flex items-center justify-between mb-4">
                                    <h2 className="text-lg font-semibold text-white">Chat History</h2>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => setShowChatHistory(false)}
                                        className="cursor-pointer text-gray-400 hover:text-white"
                                    >
                                        <X className="w-4 h-4" />
                                    </Button>
                                </div>
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                                    <Input
                                        placeholder="Search conversations..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="pl-10 bg-gray-800 border-gray-600 text-white placeholder-gray-400"
                                    />
                                </div>
                            </div>
                            <div className="overflow-y-auto h-full pb-20">
                                {filteredChatHistories.map((chat) => (
                                    <div
                                        key={chat.id}
                                        className={`p-4 border-b border-gray-700/50 hover:bg-gray-800/50 cursor-pointer transition-colors ${currentChatId === chat.id ? "bg-gray-800/70" : ""
                                            }`}
                                    >
                                        <h3 className="font-medium text-white text-sm mb-1 truncate">{chat.title}</h3>
                                        <p className="text-xs text-gray-400 mb-2 truncate">{chat.lastMessage}</p>
                                        <p className="text-xs text-gray-500">
                                            {chat.timestamp.toLocaleDateString()}{" "}
                                            {chat.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                                        </p>
                                    </div>
                                ))}
                                {filteredChatHistories.length === 0 && (
                                    <div className="p-4 text-center text-gray-400">
                                        {searchQuery ? "No conversations found" : "No chat history yet"}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}

                <div className="flex-1 overflow-y-auto px-6 py-6">
                    <div className="max-w-4xl mx-auto space-y-6">
                        <div key={"a"} className="flex justify-start">
                            <div
                                className="flex items-start space-x-3 max-w-3xl relative -z-10 "
                            >
                                <div
                                    className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 bg-black"
                                >

                                    <Image
                                        src="/images/brand/logo.png"
                                        width={854}
                                        height={210}
                                        title="Logo"
                                        alt="Logo"
                                        className="max-w-6 h-auto w-full"
                                        priority
                                    />
                                </div>
                                <Card
                                    className="bg-gray-900/80 border-gray-700/50 backdrop-blur-sm py-0"
                                >
                                    <CardContent className="p-4">
                                        <p className="text-gray-100 leading-relaxed">Hi there! I&apos;m Sol AI, your virtual assistant ready to help you explore Solana. How can I assist you today?</p>
                                    </CardContent>
                                </Card>
                            </div>
                        </div>
                        {messages.map((message) => (
                            <div key={message.id} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                                <div
                                    className={`flex items-start space-x-3 max-w-3xl relative -z-10 ${message.role === "user" ? "flex-row-reverse space-x-reverse" : ""}`}
                                >
                                    <div
                                        className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${message.role === "user" ? "bg-gray-700" : "bg-black"
                                            }`}
                                    >
                                        {message.role === "user" ? (
                                            <User className="w-4 h-4 text-white" />
                                        ) : (
                                            <Image
                                                src="/images/brand/logo.png"
                                                width={854}
                                                height={210}
                                                title="Logo"
                                                alt="Logo"
                                                className="max-w-6 h-auto w-full"
                                                priority
                                            />
                                        )}
                                    </div>
                                    <Card
                                        className={`${message.role === "user"
                                            ? "bg-[var(--solana-purple)]/20 border-[var(--solana-purple)]/30"
                                            : "bg-gray-900/80 border-gray-700/50"
                                            } backdrop-blur-sm py-0`}
                                    >
                                        <CardContent className="p-4 flex flex-col justify-start items-start gap-5">
                                            <Markdown
                                                remarkPlugins={[remarkGfm]}
                                                components={{
                                                    p(props) {
                                                        const { ...rest } = props
                                                        return <p className="block" {...rest}></p>

                                                    },
                                                    a(props) {
                                                        const { ...rest } = props
                                                        return <a target="_blank" className="text-primary underline" {...rest}></a>
                                                    },
                                                    ul(props) {
                                                        const { ...rest } = props
                                                        return <ul className="flex flex-col justify-center items-start gap-4" {...rest} />
                                                    },
                                                    ol(props) {
                                                        const { ...rest } = props
                                                        return <ol className="flex flex-col justify-center items-start gap-4" {...rest} />
                                                    },
                                                }}
                                            >
                                                {message.content}
                                            </Markdown>
                                        </CardContent>
                                    </Card>
                                </div>
                            </div>
                        ))}

                        <div ref={messagesEndRef} />
                    </div>
                </div>

                {messages.length === 0 && (
                    <div className="px-6 py-4 border-t border-gray-800">
                        <div className="max-w-4xl mx-auto">
                            <p className="text-sm text-gray-400 mb-3">Quick questions to get started!</p>
                            <div className="overflow-hidden relative">
                                <div className="flex space-x-2 animate-scroll-left">
                                    {preSelectedQuestions.map((question, index) => (
                                        <Button
                                            key={`first-${index}`}
                                            variant="outline"
                                            size="sm"
                                            onClick={() => {
                                                append({
                                                    role: "user",
                                                    content: question
                                                })
                                            }}
                                            className="cursor-pointer border-[var(--solana-purple)]/30 text-white hover:bg-[var(--solana-purple)]/10 text-xs whitespace-nowrap flex-shrink-0 min-w-max"
                                        >
                                            {question}
                                        </Button>
                                    ))}

                                    {preSelectedQuestions.map((question, index) => (
                                        <Button
                                            key={`second-${index}`}
                                            variant="outline"
                                            size="sm"
                                            className="cursor-pointer border-[var(--solana-purple)]/30 text-[var(--solana-purple)] hover:bg-[var(--solana-purple)]/10 text-xs whitespace-nowrap flex-shrink-0 min-w-max"
                                        >
                                            {question}
                                        </Button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                <div className="border-t border-gray-800 bg-black/80 backdrop-blur-sm">
                    <div className="max-w-4xl mx-auto px-6 py-4">
                        {selectedFile && (
                            <div className="mb-3 p-3 bg-gray-800/50 rounded-lg border border-gray-700 flex items-center justify-between">
                                <div className="flex items-center space-x-2">
                                    {getFileIcon(selectedFile.name)}
                                    <span className="text-sm text-gray-300">{selectedFile.name}</span>
                                    <span className="text-xs text-gray-500">({(selectedFile.size / 1024 / 1024).toFixed(2)} MB)</span>
                                </div>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => setSelectedFile(null)}
                                    className="cursor-pointer text-gray-400 hover:text-white"
                                >
                                    <X className="w-4 h-4" />
                                </Button>
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="flex space-x-3">
                            <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={() => fileInputRef.current?.click()}
                                className="cursor-pointer border-gray-600 text-gray-400 hover:bg-gray-800 hover:text-white"
                            >
                                <Paperclip className="cursor-pointer w-4 h-4" />
                            </Button>

                            <Input
                                name="prompt"
                                value={input}
                                onChange={handleInputChange}
                                placeholder="Ask me anything about Solana..."
                                className="flex-1 bg-gray-900/80 border-gray-700/50 text-white placeholder-gray-400 focus:border-[var(--solana-purple)]/50"
                                disabled={status === "streaming"}
                            />

                            <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={handleVoiceToggle}
                                className={`cursor-pointer border-gray-600 hover:bg-gray-800 ${isRecording ? "text-red-400 border-red-400/50 bg-red-400/10" : "text-gray-400 hover:text-white"
                                    }`}
                            >
                                {isRecording ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                            </Button>

                            <Button
                                type="submit"
                                className="cursor-pointer bg-gradient-to-r from-[var(--solana-purple)] to-[var(--solana-green)] hover:from-[var(--solana-purple)]/90 hover:to-[var(--solana-green)]/90 text-white"
                            >
                                <Send className="w-4 h-4" />
                            </Button>
                        </form>

                        <p className="text-xs text-gray-500 mt-2 text-center">
                            Sol AI can make mistakes. Please verify important information.
                            {isRecording && <span className="text-red-400 ml-2">🔴 Recording...</span>}
                        </p>
                        <span className="w-full text-xs text-gray-200 text-center inline-block mx-auto mt-4">From 🌎 LATAM to Solana 💜</span>

                    </div>
                </div>
            </div>
        </section>
    )
}

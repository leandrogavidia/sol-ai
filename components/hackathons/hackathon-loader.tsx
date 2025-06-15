import { Card, CardContent } from "../ui/card";

export function HackathonLoader() {
    return (
        <div className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
                {[...Array(6)].map((_, index) => (
                    <Card key={index} className="bg-gray-800/60 border-gray-600/40 backdrop-blur-sm h-full">
                        <CardContent className="p-4 space-y-3">
                            <div className="flex items-start justify-between">
                                <div className="flex-1 space-y-2">
                                    <div className="h-5 bg-gray-700/50 rounded animate-pulse w-3/4"></div>
                                    <div className="flex items-center space-x-2">
                                        <div className="h-3 bg-gray-700/50 rounded animate-pulse w-16"></div>
                                        <div className="h-4 bg-[var(--solana-purple)]/20 rounded animate-pulse w-12"></div>
                                    </div>
                                </div>
                                <div className="h-4 bg-gray-700/50 rounded animate-pulse w-8"></div>
                            </div>

                            <div className="flex space-x-2">
                                <div className="h-5 bg-gray-700/50 rounded animate-pulse w-12"></div>
                                <div className="h-5 bg-gray-700/50 rounded animate-pulse w-16"></div>
                            </div>

                            <div className="space-y-2">
                                <div className="h-3 bg-gray-700/50 rounded animate-pulse"></div>
                                <div className="h-3 bg-gray-700/50 rounded animate-pulse w-5/6"></div>
                                <div className="h-3 bg-gray-700/50 rounded animate-pulse w-2/3"></div>
                            </div>

                            <div className="space-y-1">
                                <div className="h-3 bg-gray-700/50 rounded animate-pulse w-20"></div>
                                <div className="h-3 bg-gray-700/50 rounded animate-pulse w-32"></div>
                            </div>

                            <div className="grid grid-cols-2 gap-1 pt-2">
                                <div className="h-7 bg-gray-700/50 rounded animate-pulse"></div>
                                <div className="h-7 bg-gray-700/50 rounded animate-pulse"></div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div className="text-center py-4">
                <div className="flex items-center justify-center space-x-2 text-gray-400">
                    <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-[var(--solana-purple)] rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></div>
                        <div className="w-2 h-2 bg-[var(--solana-green)] rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></div>
                        <div className="w-2 h-2 bg-[var(--solana-purple)] rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></div>
                    </div>
                    <span className="text-sm">Searching hackathon projects...</span>
                </div>
            </div>
        </div>
    )
}

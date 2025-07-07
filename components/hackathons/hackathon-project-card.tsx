import { ExternalLink, Github, MapPin, Play, Users } from "lucide-react"
import { Card, CardContent } from "../ui/card"
import { Badge } from "../ui/badge"
import { Button } from "../ui/button"
import Link from "next/link"

export interface HackathonProject {
    id: number
    project: string
    project_link: string
    description: string
    country: string
    additional_info: string | null
    tracks: string
    team_members: string
    presentation_link: string
    repo_link: string
    technical_demo_link: string | null
    hackathon: string | null
}

export function HackathonProjectCard({ project }: { project: HackathonProject }) {
    const getTrackColor = (track: string) => {
        if (track?.includes("AI")) return "bg-[var(--solana-purple)]/20 text-[var(--solana-purple)] border-[var(--solana-purple)]/30"
        if (track?.includes("DeFi")) return "bg-[var(--solana-green)]/20 text-[var(--solana-green)] border-[var(--solana-green)]/30"
        if (track?.includes("Infrastructure")) return "bg-blue-500/20 text-blue-400 border-blue-500/30"
        if (track?.includes("Consumer Apps")) return "bg-orange-500/20 text-orange-400 border-orange-500/30"
        if (track?.includes("DePIN")) return "bg-purple-500/20 text-purple-400 border-purple-500/30"
        return "bg-gray-500/20 text-gray-400 border-gray-500/30"
    }

    const tracks = project?.tracks.split(", ")
    const teamMembers = project?.team_members.split("\n")

    return (
        <Card className="bg-gray-900/80 border-gray-700/50 backdrop-blur-sm hover:border-[var(--solana-purple)]/40 transition-all duration-300 h-full">
            <CardContent className="p-6 flex flex-col h-full">
                <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                        <h3 className="text-xl font-bold text-white mb-2 line-clamp-2">{project?.project}</h3>
                        <div className="flex items-center text-sm text-gray-400 mb-3">
                            <MapPin className="w-4 h-4 mr-1" />
                            {project?.country}
                            {
                                project?.hackathon ? (
                                    <Badge className="ml-3 bg-[var(--solana-purple)]/20 text-[var(--solana-purple)] border-[var(--solana-purple)]/30 text-xs">
                                        {project?.hackathon}
                                    </Badge>
                                ) : ""
                            }

                        </div>
                    </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                    {tracks.map((track, index) => (
                        <Badge key={index} variant="outline" className={`text-xs ${getTrackColor(track)}`}>
                            {track?.trim()}
                        </Badge>
                    ))}
                </div>

                <p className="text-gray-300 text-sm leading-relaxed mb-4 flex-1 line-clamp-4">{project?.description}</p>

                <div className="mb-4">
                    <div className="flex items-center text-sm text-gray-400 mb-2">
                        <Users className="w-4 h-4 mr-1" />
                        Team ({teamMembers?.length} members)
                    </div>
                    <div className="text-xs text-gray-500 line-clamp-2">
                        {teamMembers?.slice(0, 3).map((member, index) => (
                            <span key={index}>
                                {member.split(" (@")[0]}
                                {index < Math.min(teamMembers?.length - 1, 2) && ", "}
                            </span>
                        ))}
                        {teamMembers?.length > 3 && ` +${teamMembers?.length - 3} more`}
                    </div>
                </div>

                {project?.additional_info && (
                    <>
                        <p className="flex items-center text-sm text-gray-400 mb-2">Additional information</p>
                        <div className="overflow-auto mb-4 p-3 bg-gray-800/50 rounded-lg border border-gray-700/30">
                            <p className="text-xs text-gray-400">{project?.additional_info}</p>
                        </div>
                    </>
                )}

                <div className="grid grid-cols-2 gap-2 mt-auto">
                    <Button
                        variant="outline"
                        size="sm"
                        asChild
                        className="border-[var(--solana-purple)]/30 text-[var(--solana-purple)] hover:bg-[var(--solana-purple)]/10 text-xs"
                    >
                        <Link href={project?.project_link} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="w-3 h-3 mr-1" />
                            Project
                        </Link>
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        asChild
                        className="border-gray-600 text-gray-400 hover:bg-gray-800 text-xs"
                    >
                        <Link href={project?.repo_link} target="_blank" rel="noopener noreferrer">
                            <Github className="w-3 h-3 mr-1" />
                            Code
                        </Link>
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        asChild
                        className="border-[var(--solana-green)]/30 text-[var(--solana-green)] hover:bg-[var(--solana-green)]/10 text-xs"
                    >
                        <Link href={project?.presentation_link} target="_blank" rel="noopener noreferrer">
                            <Play className="w-3 h-3 mr-1" />
                            Pitch
                        </Link>
                    </Button>
                    {
                        project?.technical_demo_link ? (
                            <Button
                                variant="outline"
                                size="sm"
                                asChild
                                className="border-gray-600 text-gray-400 hover:bg-gray-800 text-xs"
                            >
                                <Link href={project?.technical_demo_link} target="_blank" rel="noopener noreferrer">
                                    <Play className="w-3 h-3 mr-1" />
                                    Demo
                                </Link>
                            </Button>
                        ) : ""
                    }

                </div>
            </CardContent>
        </Card>
    )
}
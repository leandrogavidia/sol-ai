import { LightLines } from "./base-light-lines"

export function ChatLightLines() {
  const paths = [
    {
      d: "M-200 400C200 200 400 600 800 300C1000 150 1200 500 1400 250",
      strokeWidth: 1.5,
      opacity: 0.3,
      gradientId: "chatGradient1",
    },
    {
      d: "M-100 600C300 300 600 700 900 400C1100 250 1300 600 1500 350",
      strokeWidth: 1,
      opacity: 0.2,
      gradientId: "chatGradient2",
    },
  ]

  const lines = [
    {
      x1: 300,
      y1: 0,
      x2: 300,
      y2: 800,
      strokeWidth: 1,
      opacity: 0.2,
      gradientId: "verticalChatGradient1",
    },
    {
      x1: 900,
      y1: 0,
      x2: 900,
      y2: 800,
      strokeWidth: 1,
      opacity: 0.15,
      gradientId: "verticalChatGradient2",
    },
  ]

  const gradients = [
    {
      id: "chatGradient1",
      direction: "horizontal" as const,
      stops: [
        { offset: "0%", color: "#9945FF", opacity: 0 },
        { offset: "50%", color: "#9945FF", opacity: 1 },
        { offset: "100%", color: "#9945FF", opacity: 0 },
      ],
    },
    {
      id: "chatGradient2",
      direction: "horizontal" as const,
      stops: [
        { offset: "0%", color: "#14F195", opacity: 0 },
        { offset: "50%", color: "#14F195", opacity: 1 },
        { offset: "100%", color: "#14F195", opacity: 0 },
      ],
    },
    {
      id: "verticalChatGradient1",
      direction: "vertical" as const,
      stops: [
        { offset: "0%", color: "#9945FF", opacity: 0 },
        { offset: "50%", color: "#9945FF", opacity: 1 },
        { offset: "100%", color: "#9945FF", opacity: 0 },
      ],
    },
    {
      id: "verticalChatGradient2",
      direction: "vertical" as const,
      stops: [
        { offset: "0%", color: "#14F195", opacity: 0 },
        { offset: "50%", color: "#14F195", opacity: 1 },
        { offset: "100%", color: "#14F195", opacity: 0 },
      ],
    },
  ]

  return (
    <LightLines
      className="fixed inset-0 overflow-hidden pointer-events-none"
      paths={paths}
      lines={lines}
      gradients={gradients}
    />
  )
}

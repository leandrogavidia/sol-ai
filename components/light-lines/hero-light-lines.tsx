import { LightLines } from "./base-light-lines"

export function HeroLightLines() {
  const paths = [
    {
      d: "M-200 600C200 300 600 700 1000 400C1200 300 1400 500 1600 350",
      strokeWidth: 3,
      opacity: 0.8,
      gradientId: "heroGradient1",
    },
    {
      d: "M-100 200C300 500 700 100 1100 400C1300 500 1500 200 1700 300",
      strokeWidth: 2,
      opacity: 0.6,
      gradientId: "heroGradient2",
    },
    {
      d: "M-300 400C100 100 500 600 800 250C1000 100 1200 450 1500 200",
      strokeWidth: 1.5,
      opacity: 0.4,
      gradientId: "heroGradient3",
    },
    {
      d: "M-150 100C250 400 550 50 850 350C1050 500 1250 150 1550 400",
      strokeWidth: 1,
      opacity: 0.2,
      gradientId: "heroGradient4",
    },
  ]

  const gradients = [
    {
      id: "heroGradient1",
      direction: "horizontal" as const,
      stops: [
        { offset: "0%", color: "#9945FF", opacity: 0 },
        { offset: "20%", color: "#9945FF", opacity: 1 },
        { offset: "80%", color: "#14F195", opacity: 1 },
        { offset: "100%", color: "#14F195", opacity: 0 },
      ],
    },
    {
      id: "heroGradient2",
      direction: "horizontal" as const,
      stops: [
        { offset: "0%", color: "#14F195", opacity: 0 },
        { offset: "30%", color: "#14F195", opacity: 1 },
        { offset: "70%", color: "#9945FF", opacity: 1 },
        { offset: "100%", color: "#9945FF", opacity: 0 },
      ],
    },
    {
      id: "heroGradient3",
      direction: "horizontal" as const,
      stops: [
        { offset: "0%", color: "#9945FF", opacity: 0 },
        { offset: "40%", color: "#9945FF", opacity: 0.8 },
        { offset: "60%", color: "#14F195", opacity: 0.8 },
        { offset: "100%", color: "#14F195", opacity: 0 },
      ],
    },
    {
      id: "heroGradient4",
      direction: "horizontal" as const,
      stops: [
        { offset: "0%", color: "#14F195", opacity: 0 },
        { offset: "50%", color: "#14F195", opacity: 0.6 },
        { offset: "100%", color: "#14F195", opacity: 0 },
      ],
    },
  ]

  return <LightLines paths={paths} gradients={gradients} />
}

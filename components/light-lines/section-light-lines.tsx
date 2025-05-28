import { LightLines } from "./base-light-lines"

interface SectionLightLinesProps {
  variant?: "mission" | "context" | "features" | "faq" | "cta" | "footer"
}

export function SectionLightLines({ variant = "mission" }: SectionLightLinesProps) {
  const getVariantConfig = () => {
    switch (variant) {
      case "mission":
        return {
          paths: [
            {
              d: "M-200 300C300 150 600 450 1000 200C1200 100 1400 350 1600 250",
              strokeWidth: 2,
              opacity: 0.5,
              gradientId: "missionGradient1",
            },
            {
              d: "M-100 450C400 200 700 500 1100 300C1300 200 1500 400 1700 350",
              strokeWidth: 1.5,
              opacity: 0.3,
              gradientId: "missionGradient2",
            },
          ],
          lines: [
            {
              x1: 300,
              y1: 0,
              x2: 300,
              y2: 600,
              strokeWidth: 1.5,
              opacity: 0.3,
              gradientId: "verticalGradient1",
            },
            {
              x1: 900,
              y1: 0,
              x2: 900,
              y2: 600,
              strokeWidth: 1,
              opacity: 0.2,
              gradientId: "verticalGradient2",
            },
          ],
          gradients: [
            {
              id: "missionGradient1",
              direction: "horizontal" as const,
              stops: [
                { offset: "0%", color: "#9945FF", opacity: 0 },
                { offset: "30%", color: "#9945FF", opacity: 1 },
                { offset: "70%", color: "#14F195", opacity: 1 },
                { offset: "100%", color: "#14F195", opacity: 0 },
              ],
            },
            {
              id: "missionGradient2",
              direction: "horizontal" as const,
              stops: [
                { offset: "0%", color: "#14F195", opacity: 0 },
                { offset: "50%", color: "#14F195", opacity: 1 },
                { offset: "100%", color: "#14F195", opacity: 0 },
              ],
            },
            {
              id: "verticalGradient1",
              direction: "vertical" as const,
              stops: [
                { offset: "0%", color: "#9945FF", opacity: 0 },
                { offset: "30%", color: "#9945FF", opacity: 1 },
                { offset: "70%", color: "#9945FF", opacity: 1 },
                { offset: "100%", color: "#9945FF", opacity: 0 },
              ],
            },
            {
              id: "verticalGradient2",
              direction: "vertical" as const,
              stops: [
                { offset: "0%", color: "#14F195", opacity: 0 },
                { offset: "40%", color: "#14F195", opacity: 1 },
                { offset: "60%", color: "#14F195", opacity: 1 },
                { offset: "100%", color: "#14F195", opacity: 0 },
              ],
            },
          ],
        }

      case "context":
        return {
          paths: [
            {
              d: "M-300 200C200 400 500 100 800 350C1100 500 1400 150 1700 300",
              strokeWidth: 2.5,
              opacity: 0.6,
              gradientId: "contextGradient1",
            },
            {
              d: "M-150 450C350 250 650 550 950 300C1150 200 1350 450 1550 350",
              strokeWidth: 1.5,
              opacity: 0.4,
              gradientId: "contextGradient2",
            },
          ],
          lines: [
            {
              x1: 200,
              y1: 0,
              x2: 200,
              y2: 600,
              strokeWidth: 1,
              opacity: 0.2,
              gradientId: "verticalGradient3",
            },
            {
              x1: 600,
              y1: 0,
              x2: 600,
              y2: 600,
              strokeWidth: 1.5,
              opacity: 0.3,
              gradientId: "verticalGradient4",
            },
            {
              x1: 1000,
              y1: 0,
              x2: 1000,
              y2: 600,
              strokeWidth: 1,
              opacity: 0.2,
              gradientId: "verticalGradient5",
            },
          ],
          gradients: [
            {
              id: "contextGradient1",
              direction: "horizontal" as const,
              stops: [
                { offset: "0%", color: "#14F195", opacity: 0 },
                { offset: "25%", color: "#14F195", opacity: 1 },
                { offset: "75%", color: "#9945FF", opacity: 1 },
                { offset: "100%", color: "#9945FF", opacity: 0 },
              ],
            },
            {
              id: "contextGradient2",
              direction: "horizontal" as const,
              stops: [
                { offset: "0%", color: "#9945FF", opacity: 0 },
                { offset: "40%", color: "#9945FF", opacity: 1 },
                { offset: "60%", color: "#14F195", opacity: 1 },
                { offset: "100%", color: "#14F195", opacity: 0 },
              ],
            },
            {
              id: "verticalGradient3",
              direction: "vertical" as const,
              stops: [
                { offset: "0%", color: "#14F195", opacity: 0 },
                { offset: "35%", color: "#14F195", opacity: 1 },
                { offset: "65%", color: "#14F195", opacity: 1 },
                { offset: "100%", color: "#14F195", opacity: 0 },
              ],
            },
            {
              id: "verticalGradient4",
              direction: "vertical" as const,
              stops: [
                { offset: "0%", color: "#9945FF", opacity: 0 },
                { offset: "25%", color: "#9945FF", opacity: 1 },
                { offset: "75%", color: "#9945FF", opacity: 1 },
                { offset: "100%", color: "#9945FF", opacity: 0 },
              ],
            },
            {
              id: "verticalGradient5",
              direction: "vertical" as const,
              stops: [
                { offset: "0%", color: "#14F195", opacity: 0 },
                { offset: "40%", color: "#14F195", opacity: 1 },
                { offset: "60%", color: "#14F195", opacity: 1 },
                { offset: "100%", color: "#14F195", opacity: 0 },
              ],
            },
          ],
        }

      case "features":
        return {
          paths: [
            {
              d: "M-200 150C250 350 550 50 850 300C1150 450 1450 100 1700 250",
              strokeWidth: 2.5,
              opacity: 0.6,
              gradientId: "featuresGradient1",
            },
            {
              d: "M-100 400C300 200 600 500 900 250C1200 150 1500 400 1800 300",
              strokeWidth: 2,
              opacity: 0.4,
              gradientId: "featuresGradient2",
            },
          ],
          lines: [
            {
              x1: 600,
              y1: 0,
              x2: 600,
              y2: 600,
              strokeWidth: 2,
              opacity: 0.4,
              gradientId: "verticalGradient6",
            },
          ],
          gradients: [
            {
              id: "featuresGradient1",
              direction: "horizontal" as const,
              stops: [
                { offset: "0%", color: "#9945FF", opacity: 0 },
                { offset: "20%", color: "#9945FF", opacity: 1 },
                { offset: "80%", color: "#14F195", opacity: 1 },
                { offset: "100%", color: "#14F195", opacity: 0 },
              ],
            },
            {
              id: "featuresGradient2",
              direction: "horizontal" as const,
              stops: [
                { offset: "0%", color: "#14F195", opacity: 0 },
                { offset: "30%", color: "#14F195", opacity: 1 },
                { offset: "70%", color: "#9945FF", opacity: 1 },
                { offset: "100%", color: "#9945FF", opacity: 0 },
              ],
            },
            {
              id: "verticalGradient6",
              direction: "vertical" as const,
              stops: [
                { offset: "0%", color: "#9945FF", opacity: 0 },
                { offset: "20%", color: "#9945FF", opacity: 1 },
                { offset: "50%", color: "#14F195", opacity: 1 },
                { offset: "80%", color: "#9945FF", opacity: 1 },
                { offset: "100%", color: "#9945FF", opacity: 0 },
              ],
            },
          ],
        }

      case "faq":
        return {
          paths: [
            {
              d: "M-250 250C200 450 500 150 800 400C1100 550 1400 200 1650 350",
              strokeWidth: 2,
              opacity: 0.5,
              gradientId: "faqGradient1",
            },
            {
              d: "M-150 100C350 300 650 50 950 250C1250 400 1550 150 1750 300",
              strokeWidth: 1.5,
              opacity: 0.3,
              gradientId: "faqGradient2",
            },
          ],
          lines: [
            {
              x1: 400,
              y1: 0,
              x2: 400,
              y2: 600,
              strokeWidth: 1,
              opacity: 0.25,
              gradientId: "verticalGradient7",
            },
            {
              x1: 800,
              y1: 0,
              x2: 800,
              y2: 600,
              strokeWidth: 1.5,
              opacity: 0.3,
              gradientId: "verticalGradient8",
            },
          ],
          gradients: [
            {
              id: "faqGradient1",
              direction: "horizontal" as const,
              stops: [
                { offset: "0%", color: "#14F195", opacity: 0 },
                { offset: "25%", color: "#14F195", opacity: 1 },
                { offset: "75%", color: "#9945FF", opacity: 1 },
                { offset: "100%", color: "#9945FF", opacity: 0 },
              ],
            },
            {
              id: "faqGradient2",
              direction: "horizontal" as const,
              stops: [
                { offset: "0%", color: "#9945FF", opacity: 0 },
                { offset: "40%", color: "#9945FF", opacity: 1 },
                { offset: "60%", color: "#14F195", opacity: 1 },
                { offset: "100%", color: "#14F195", opacity: 0 },
              ],
            },
            {
              id: "verticalGradient7",
              direction: "vertical" as const,
              stops: [
                { offset: "0%", color: "#14F195", opacity: 0 },
                { offset: "30%", color: "#14F195", opacity: 1 },
                { offset: "70%", color: "#14F195", opacity: 1 },
                { offset: "100%", color: "#14F195", opacity: 0 },
              ],
            },
            {
              id: "verticalGradient8",
              direction: "vertical" as const,
              stops: [
                { offset: "0%", color: "#9945FF", opacity: 0 },
                { offset: "25%", color: "#9945FF", opacity: 1 },
                { offset: "75%", color: "#9945FF", opacity: 1 },
                { offset: "100%", color: "#9945FF", opacity: 0 },
              ],
            },
          ],
        }

      case "cta":
        return {
          paths: [
            {
              d: "M-200 300C200 600 600 100 1000 400C1200 500 1400 200 1600 350",
              strokeWidth: 2.5,
              opacity: 0.7,
              gradientId: "ctaGradient1",
            },
            {
              d: "M-100 500C300 200 700 600 1100 300C1300 150 1500 450 1700 250",
              strokeWidth: 2,
              opacity: 0.5,
              gradientId: "ctaGradient2",
            },
          ],
          lines: [],
          gradients: [
            {
              id: "ctaGradient1",
              direction: "horizontal" as const,
              stops: [
                { offset: "0%", color: "#9945FF", opacity: 0 },
                { offset: "25%", color: "#9945FF", opacity: 1 },
                { offset: "75%", color: "#14F195", opacity: 1 },
                { offset: "100%", color: "#14F195", opacity: 0 },
              ],
            },
            {
              id: "ctaGradient2",
              direction: "horizontal" as const,
              stops: [
                { offset: "0%", color: "#14F195", opacity: 0 },
                { offset: "35%", color: "#14F195", opacity: 1 },
                { offset: "65%", color: "#9945FF", opacity: 1 },
                { offset: "100%", color: "#9945FF", opacity: 0 },
              ],
            },
          ],
        }

      case "footer":
        return {
          paths: [
            {
              d: "M-200 200C200 50 600 300 1000 150C1200 100 1400 250 1600 180",
              strokeWidth: 2,
              opacity: 0.4,
              gradientId: "footerGradient1",
            },
            {
              d: "M-100 100C300 250 700 50 1100 200C1300 300 1500 100 1700 150",
              strokeWidth: 1.5,
              opacity: 0.3,
              gradientId: "footerGradient2",
            },
          ],
          lines: [],
          gradients: [
            {
              id: "footerGradient1",
              direction: "horizontal" as const,
              stops: [
                { offset: "0%", color: "#9945FF", opacity: 0 },
                { offset: "40%", color: "#9945FF", opacity: 1 },
                { offset: "60%", color: "#14F195", opacity: 1 },
                { offset: "100%", color: "#14F195", opacity: 0 },
              ],
            },
            {
              id: "footerGradient2",
              direction: "horizontal" as const,
              stops: [
                { offset: "0%", color: "#14F195", opacity: 0 },
                { offset: "50%", color: "#14F195", opacity: 0.8 },
                { offset: "100%", color: "#14F195", opacity: 0 },
              ],
            },
          ],
        }

      default:
        return { paths: [], lines: [], gradients: [] }
    }
  }

  const config = getVariantConfig()

  return <LightLines {...config} />
}

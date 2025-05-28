interface LightLinesProps {
  className?: string
  opacity?: number
  paths?: Array<{
    d: string
    strokeWidth: number
    opacity: number
    gradientId: string
  }>
  lines?: Array<{
    x1: number
    y1: number
    x2: number
    y2: number
    strokeWidth: number
    opacity: number
    gradientId: string
  }>
  gradients?: Array<{
    id: string
    stops: Array<{
      offset: string
      color: string
      opacity: number
    }>
    direction?: "horizontal" | "vertical"
  }>
}

export function LightLines({
  className = "absolute inset-0 overflow-hidden pointer-events-none",
  opacity = 1,
  paths = [],
  lines = [],
  gradients = [],
}: LightLinesProps) {
  return (
    <div className={className}>
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1200 800" fill="none" style={{ opacity }}>
        {paths.map((path, index) => (
          <path
            key={`path-${index}`}
            d={path.d}
            stroke={`url(#${path.gradientId})`}
            strokeWidth={path.strokeWidth}
            fill="none"
            opacity={path.opacity}
            style={{
              filter: `drop-shadow(0 0 ${path.strokeWidth * 4}px rgba(153, 69, 255, ${path.opacity * 0.6}))`,
            }}
          />
        ))}

        {lines.map((line, index) => (
          <line
            key={`line-${index}`}
            x1={line.x1}
            y1={line.y1}
            x2={line.x2}
            y2={line.y2}
            stroke={`url(#${line.gradientId})`}
            strokeWidth={line.strokeWidth}
            opacity={line.opacity}
            style={{
              filter: `drop-shadow(0 0 ${line.strokeWidth * 4}px rgba(153, 69, 255, ${line.opacity * 0.6}))`,
            }}
          />
        ))}

        <defs>
          {gradients.map((gradient) => (
            <linearGradient
              key={gradient.id}
              id={gradient.id}
              x1={gradient.direction === "vertical" ? "0%" : "0%"}
              y1={gradient.direction === "vertical" ? "0%" : "0%"}
              x2={gradient.direction === "vertical" ? "0%" : "100%"}
              y2={gradient.direction === "vertical" ? "100%" : "0%"}
            >
              {gradient.stops.map((stop, stopIndex) => (
                <stop key={stopIndex} offset={stop.offset} stopColor={stop.color} stopOpacity={stop.opacity} />
              ))}
            </linearGradient>
          ))}
        </defs>
      </svg>
    </div>
  )
}

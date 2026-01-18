import React from "react";
import * as RechartsPrimitive from "recharts";
import { cn } from "../../lib/utils";

/* Theme constants */
const THEMES = {
  light: "",
  dark: ".dark",
};

/* Chart context */
const ChartContext = React.createContext(null);

function useChart() {
  const context = React.useContext(ChartContext);
  if (!context) {
    throw new Error("useChart must be used within a <ChartContainer />");
  }
  return context;
}

/* Chart container */
const ChartContainer = React.forwardRef(
  ({ id, className, children, config, ...props }, ref) => {
    const uniqueId = React.useId();
    const chartId = `chart-${id || uniqueId.replace(/:/g, "")}`;

    return (
      <ChartContext.Provider value={{ config }}>
        <div
          data-chart={chartId}
          ref={ref}
          className={cn(
            "flex aspect-video justify-center text-xs " +
              "[&_.recharts-cartesian-axis-tick_text]:fill-muted-foreground " +
              "[&_.recharts-cartesian-grid_line[stroke='#ccc']]:stroke-border/50 " +
              "[&_.recharts-curve.recharts-tooltip-cursor]:stroke-border " +
              "[&_.recharts-dot[stroke='#fff']]:stroke-transparent " +
              "[&_.recharts-layer]:outline-none " +
              "[&_.recharts-rectangle.recharts-tooltip-cursor]:fill-muted " +
              "[&_.recharts-sector]:outline-none",
            className
          )}
          {...props}
        >
          <ChartStyle id={chartId} config={config} />
          <RechartsPrimitive.ResponsiveContainer>
            {children}
          </RechartsPrimitive.ResponsiveContainer>
        </div>
      </ChartContext.Provider>
    );
  }
);

ChartContainer.displayName = "ChartContainer";

/* Chart style helper */
const ChartStyle = ({ id, config }) => {
  if (!config) return null;

  const colorConfig = Object.entries(config).filter(
    ([_, item]) => item.theme || item.color
  );

  if (!colorConfig.length) return null;

  const styleContent = Object.entries(THEMES)
    .map(([theme, prefix]) => {
      const vars = colorConfig
        .map(([key, item]) => {
          const color = item.theme?.[theme] || item.color;
          return color ? `--color-${key}: ${color};` : null;
        })
        .filter(Boolean)
        .join("\n");

      return `${prefix} [data-chart=${id}] {\n${vars}\n}`;
    })
    .join("\n");

  return <style dangerouslySetInnerHTML={{ __html: styleContent }} />;
};

/* Tooltip */
const ChartTooltip = RechartsPrimitive.Tooltip;

/* Tooltip content */
const ChartTooltipContent = React.forwardRef(
  ({ active, payload, className }, ref) => {
    const { config } = useChart();

    if (!active || !payload?.length) return null;

    return (
      <div
        ref={ref}
        className={cn(
          "grid min-w-[8rem] gap-1.5 rounded-lg border bg-background px-2.5 py-1.5 text-xs shadow-xl",
          className
        )}
      >
        {payload.map((item, index) => {
          const key = item.name || item.dataKey;
          const itemConfig = config?.[key];

          return (
            <div key={index} className="flex justify-between gap-2">
              <span className="text-muted-foreground">
                {itemConfig?.label || item.name}
              </span>
              <span className="font-mono font-medium">
                {item.value}
              </span>
            </div>
          );
        })}
      </div>
    );
  }
);

ChartTooltipContent.displayName = "ChartTooltipContent";

/* Legend */
const ChartLegend = RechartsPrimitive.Legend;

export {
  ChartContainer,
  ChartStyle,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
};

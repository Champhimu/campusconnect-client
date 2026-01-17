
"use client";

import React, {
  createContext,
  useContext,
  useId,
  forwardRef,
} from "react";
import * as RechartsPrimitive from "recharts";
import { cn } from "../../lib/utils";

/* ---------------------------------- */
/* Helpers */
/* ---------------------------------- */

function getPayloadConfigFromPayload(config, payload, key) {
  if (!payload || typeof payload !== "object") return undefined;
  return key in config ? config[key] : undefined;
}

/* ---------------------------------- */
/* Context */
/* ---------------------------------- */

const ChartContext = createContext(null);

function useChart() {
  const context = useContext(ChartContext);
  if (!context) {
    throw new Error("useChart must be used within a <ChartContainer />");
  }
  return context;
}

/* ---------------------------------- */
/* Chart Container */
/* ---------------------------------- */

const THEMES = {
  light: "",
  dark: ".dark",
};

const ChartContainer = forwardRef(function ChartContainer(
  { id, className, children, config, ...props },
  ref
) {
  const uniqueId = useId();
  const chartId = `chart-${id || uniqueId.replace(/:/g, "")}`;

  return (
    <ChartContext.Provider value={{ config }}>
      <div
        ref={ref}
        data-chart={chartId}
        className={cn("flex aspect-video justify-center text-xs", className)}
        {...props}
      >
        <ChartStyle id={chartId} config={config} />
        <RechartsPrimitive.ResponsiveContainer>
          {children}
        </RechartsPrimitive.ResponsiveContainer>
      </div>
    </ChartContext.Provider>
  );
});

/* ---------------------------------- */
/* Chart Style */
/* ---------------------------------- */

function ChartStyle({ id, config }) {
  const colorConfig = Object.entries(config || {}).filter(
    ([_, conf]) => conf.theme || conf.color
  );

  if (!colorConfig.length) return null;

  return (
    <style
      dangerouslySetInnerHTML={{
        __html: Object.entries(THEMES)
          .map(
            ([theme, prefix]) => `
${prefix} [data-chart=${id}] {
${colorConfig
  .map(([key, item]) => {
    const color = (item.theme && item.theme[theme]) || item.color;
    return color ? `--color-${key}: ${color};` : null;
  })
  .filter(Boolean)
  .join("\n")}
}`
          )
          .join("\n"),
      }}
    />
  );
}

/* ---------------------------------- */
/* Tooltip */
/* ---------------------------------- */

const ChartTooltip = RechartsPrimitive.Tooltip;

const ChartTooltipContent = React.forwardRef(
  (
    {
      active,
      payload,
      className,
      hideLabel = false,
      label,
      labelFormatter,
      labelClassName,
      formatter,
    },
    ref
  ) => {
    const { config } = useChart();

    const tooltipLabel = React.useMemo(() => {
      if (!active || !payload?.length || hideLabel) return null;

      const [item] = payload;
      const key = item.dataKey || item.name;
      const itemConfig = getPayloadConfigFromPayload(config, item, key);

      const value =
        typeof label === "string"
          ? config[label]?.label || label
          : itemConfig?.label;

      if (!value) return null;

      return (
        <div className={cn("font-medium", labelClassName)}>
          {labelFormatter ? labelFormatter(value) : value}
        </div>
      );
    }, [active, payload, hideLabel, label, labelFormatter, labelClassName, config]);

    if (!active || !payload?.length) return null;

    return (
      <div
        ref={ref}
        className={cn(
          "rounded-lg border bg-background p-2 text-xs shadow-md",
          className
        )}
      >
        {tooltipLabel}
        {payload.map((item, index) => (
          <div key={index} className="flex justify-between gap-2">
            <span className="text-muted-foreground">{item.name}</span>
            <span className="font-mono">
              {formatter ? formatter(item.value) : item.value}
            </span>
          </div>
        ))}
      </div>
    );
  }
);


/* ---------------------------------- */
/* Legend */
/* ---------------------------------- */

const ChartLegend = RechartsPrimitive.Legend;

const ChartLegendContent = forwardRef(function ChartLegendContent(
  { payload, className },
  ref
) {
  const { config } = useChart();
  if (!payload?.length) return null;

  return (
    <div ref={ref} className={cn("flex gap-4", className)}>
      {payload.map((item) => {
        const itemConfig = getPayloadConfigFromPayload(
          config,
          item,
          item.dataKey
        );

        return (
          <div key={item.value} className="flex items-center gap-2">
            <span
              className="h-2 w-2 rounded"
              style={{ backgroundColor: item.color }}
            />
            {itemConfig?.label || item.value}
          </div>
        );
      })}
    </div>
  );
});

/* ---------------------------------- */
/* EXPORTS */
/* ---------------------------------- */

export {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
};


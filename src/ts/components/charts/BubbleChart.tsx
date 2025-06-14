
import { BubbleChartDataKey } from "@mantine/charts";
import { MantineColor } from "@mantine/core";
import { BoxProps } from "props/box";
import { GridChartBaseProps } from "props/charts";
import { DashBaseProps } from "props/dash";
import { StylesApiProps } from "props/styles";
import React, { Suspense } from "react";

// eslint-disable-next-line no-inline-comments
const LazyBubbleChart = React.lazy(() => import(/* webpackChunkName: "BubbleChart" */ './fragments/BubbleChart'));

export interface Props
    extends BoxProps,
        StylesApiProps,
        DashBaseProps {
    /** Chart data */
    data: Record<string, any>[];
    /** Data keys for x, y and z axis */
    dataKey: BubbleChartDataKey;
    /** Z axis range */
    range: [number, number];
    /** Color of the chart items. Key of `theme.colors` or any valid CSS color, `blue.6` by default. */
    color?: MantineColor;
    /** Props passed down to the `XAxis` recharts component */
    xAxisProps?: object;
    /** Props passed down to the `YAxis` recharts component */
    yAxisProps?: object;
    /** Props passed down to the `ZAxis` recharts component */
    zAxisProps?: object;
    /** Props passed down to the `Tooltip` component */
    tooltipProps?: object;
    /** Props passed down to the `Scatter` component */
    scatterProps?: object;
    /** Color of the text displayed inside the chart, `'dimmed'` by default */
    textColor?: MantineColor;
    /** Color of the grid and cursor lines, by default depends on color scheme */
    gridColor?: MantineColor;
    /** Chart label displayed next to the x axis */
    label?: string;
    /** Determines whether the tooltip should be displayed, `true` by default */
    withTooltip?: boolean;
    /** Click data */
    clickData?: Record<string, any>;
    /** Hover data */
    hoverData?: Record<string, any>;
    /** A function to format values on Y axis and inside the tooltip. See https://www.dash-mantine-components.com/functions-as-props */
    valueFormatter?: any;
}


/** BubbleChart */
const BubbleChart = (props: Props) => {
    return (
      <Suspense fallback={null}>
        <LazyBubbleChart {...props} />
      </Suspense>
    );
};

export default BubbleChart;

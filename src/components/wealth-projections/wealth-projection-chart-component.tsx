import { useEffect, useRef } from 'react';
import { WealthProjectionChartComponentProps } from './wealth-projection-chart-component-props';
import * as d3 from 'd3';
import { YearlyWealthProjection } from '../../models/wealth-projections/yearly-wealth-projection';

export function WealthProjectionChartComponent({
    yearlyWealthProjectionList,
}: WealthProjectionChartComponentProps) {
    const ref = useRef<SVGSVGElement>(null);

    useEffect(() => {
        function createGraph() {
            const width = 400;
            const height = 400;
            const marginTop = 20;
            const marginRight = 30;
            const marginBottom = 30;
            const marginLeft = 40;
            const color = 'currentColor';
            const strokeWidth = 1.5;
            const strokeLinecap = 'rounded';
            const strokeLinejoin = 'rounded';
            const strokeOpacity = 1;

            const xRange = [marginLeft, width - marginRight];
            const yRange = [height - marginBottom, marginTop];

            const X = d3.map(yearlyWealthProjectionList, (x) => x.year);
            const Y = d3.map(yearlyWealthProjectionList, (y) => y.estimatedNetWorth);
            const I = d3.map(yearlyWealthProjectionList, (_, i) => i);
            const D = d3.map(
                yearlyWealthProjectionList,
                (_: YearlyWealthProjection, i: number): boolean => {
                    return !isNaN(X[i]) && !isNaN(Y[i]);
                }
            );

            const xDomain = d3.extent(X) as [number, number];
            const yDomain = [0, d3.max(Y) as number];

            const xScale = d3.scaleLinear(xDomain, xRange);
            const yScale = d3.scaleLinear(yDomain, yRange);
            const xAxis = d3
                .axisBottom(xScale)
                .ticks(width / 80)
                .tickSizeOuter(0);
            const yAxis = d3.axisLeft(yScale).ticks(height / 40);

            const line = d3
                .line<number>()
                .defined((i) => D[i])
                .curve(d3.curveLinear)
                .x((i) => xScale(X[i]))
                .y((i) => yScale(Y[i]));

            const svg = d3
                .select(ref.current)
                .attr('width', width)
                .attr('height', height)
                .attr('viewBox', [0, 0, width, height])
                .attr('style', 'max-width: 100%; height: auto; height: intrinsic;');

            svg.append('g')
                .attr('transform', `translate(0,${height - marginBottom})`)
                .call(xAxis);

            svg.append('g')
                .attr('transform', `translate(${marginLeft},0)`)
                .call(yAxis)
                .call((g) => g.select('.domain').remove())
                .call((g) =>
                    g
                        .selectAll('.tick line')
                        .clone()
                        .attr('x2', width - marginLeft - marginRight)
                        .attr('stroke-opacity', 0.1)
                )
                .call((g) =>
                    g
                        .append('text')
                        .attr('x', -marginLeft)
                        .attr('y', 10)
                        .attr('fill', 'currentColor')
                        .attr('text-anchor', 'start')
                        .text('$ in USD')
                );

            svg.append('path')
                .attr('fill', 'none')
                .attr('stroke', 'currentColor')
                .attr('d', line(I.filter((i) => D[i])));

            svg.append('path')
                .attr('fill', 'none')
                .attr('stroke', color)
                .attr('stroke-width', strokeWidth)
                .attr('stroke-linecap', strokeLinecap)
                .attr('stroke-linejoin', strokeLinejoin)
                .attr('stroke-opacity', strokeOpacity)
                .attr('d', line(I));

            return svg.node();
        }
        if (ref.current) {
            createGraph();
        }
    }, [yearlyWealthProjectionList]);

    return (
        <div className="w-max h-max">
            <svg ref={ref} width="100%" height="100%" />
        </div>
    );
}

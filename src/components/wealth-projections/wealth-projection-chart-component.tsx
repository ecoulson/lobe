import { useEffect, useRef } from 'react';
import { WealthProjectionChartComponentProps } from './wealth-projection-chart-component-props';
import * as d3 from 'd3';
import { TemporalWealthProjection } from '../../models/wealth-projections/yearly-wealth-projection';

export function WealthProjectionChartComponent({
    yearlyWealthProjectionList,
}: WealthProjectionChartComponentProps) {
    const ref = useRef<SVGSVGElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function createGraph() {
            let width = 300;
            if (containerRef.current?.parentElement?.clientWidth) {
                width = containerRef.current.parentElement.clientWidth;
            }
            const height = 400;
            const marginTop = 20;
            const marginRight = width > 600 ? 120 : 50;
            const marginBottom = 30;
            const marginLeft = 50;
            let color = '#AEB8FE';
            const strokeWidth = 2;
            const strokeLinecap = 'rounded';
            const strokeLinejoin = 'rounded';
            const strokeOpacity = 1;

            const xRange = [marginLeft, width - marginRight];
            const yRange = [height - marginBottom, marginTop];

            const X = d3.map(yearlyWealthProjectionList, (x) => x.date);
            const Y = d3.map(yearlyWealthProjectionList, (y) => y.estimatedNetWorth);
            const Y2 = d3.map(yearlyWealthProjectionList, (y) => y.estimatedNetWorthAfterTaxes);
            const I = d3.map(yearlyWealthProjectionList, (_, i) => i);
            const D = d3.map(
                yearlyWealthProjectionList,
                (_: TemporalWealthProjection, i: number): boolean => {
                    return X[i] !== null && !isNaN(Y[i]) && !isNaN(Y2[i]);
                }
            );

            const xDomain = d3.extent(X) as [Date, Date];
            const yDomain = [0, d3.max(Y) as number];

            const xScale = d3.scaleTime(xDomain, xRange);
            const yScale = d3.scaleLinear(yDomain, yRange);
            const xAxis = d3
                .axisBottom(xScale)
                .ticks(width / 120)
                .tickSizeOuter(0);
            const yFormat = d3.format('.2s');
            const yAxis = d3
                .axisLeft(yScale)
                .ticks(height / 40)
                .tickFormat(yFormat);

            const preTaxLine = d3
                .line<number>()
                .defined((i) => D[i])
                .curve(d3.curveLinear)
                .x((i) => xScale(X[i]))
                .y((i) => yScale(Y[i]));

            const postTaxLine = d3
                .line<number>()
                .defined((i) => D[i])
                .curve(d3.curveLinear)
                .x((i) => xScale(X[i]))
                .y((i) => yScale(Y2[i]));

            const svg = d3.select(ref.current);
            svg.selectAll('*').remove();

            const bisect = d3.bisector<TemporalWealthProjection, Date>((d) => d.date).left;
            const focusPreTax = svg
                .append('g')
                .append('circle')
                .style('fill', 'none')
                .attr('stroke', 'black')
                .attr('r', 8.5)
                .style('opacity', 0)
                .attr('stroke', '#AEB8FE');
            const focusPreTaxText = svg
                .append('g')
                .append('text')
                .style('opacity', 0)
                .attr('text-anchor', 'left')
                .attr('alignment-baseline', 'middle');

            const focusPostTax = svg
                .append('g')
                .append('circle')
                .style('fill', 'none')
                .attr('stroke', 'black')
                .attr('r', 8.5)
                .style('opacity', 0)
                .attr('stroke', '#FF8600');
            const focusPostTaxText = svg
                .append('g')
                .append('text')
                .style('opacity', 0)
                .attr('text-anchor', 'left')
                .attr('alignment-baseline', 'middle');

            function mouseOver() {
                focusPreTax.style('opacity', 1);
                focusPreTaxText.style('opacity', 1);
                focusPostTax.style('opacity', 1);
                focusPostTaxText.style('opacity', 1);
            }

            function mouseMove(event: Event) {
                const x0 = xScale.invert(d3.pointer(event, svg.node())[0]);
                const i = bisect(yearlyWealthProjectionList, x0, 1);
                const selectedData = yearlyWealthProjectionList[i];
                focusPreTax
                    .attr('cx', xScale(selectedData.date))
                    .attr('cy', yScale(selectedData.estimatedNetWorth));
                focusPreTaxText
                    .html(
                        selectedData.date.getUTCFullYear() +
                            ': $' +
                            selectedData.estimatedNetWorth.toFixed(2)
                    )
                    .attr('x', xScale(selectedData.date))
                    .attr('y', yScale(selectedData.estimatedNetWorth) - 30);
                focusPostTax
                    .attr('cx', xScale(selectedData.date))
                    .attr('cy', yScale(selectedData.estimatedNetWorthAfterTaxes));
                focusPostTaxText
                    .html(
                        selectedData.date.getUTCFullYear() +
                            ': $' +
                            selectedData.estimatedNetWorthAfterTaxes.toFixed(2)
                    )
                    .attr('x', xScale(selectedData.date))
                    .attr('y', yScale(selectedData.estimatedNetWorthAfterTaxes) + 30);
            }

            function mouseOut() {
                focusPreTax.style('opacity', 0);
                focusPreTaxText.style('opacity', 0);
                focusPostTax.style('opacity', 0);
                focusPostTaxText.style('opacity', 0);
            }

            if (width > 600) {
                svg.append('circle')
                    .attr('cx', width - 100)
                    .attr('cy', height / 2)
                    .attr('r', 6)
                    .attr('fill', '#AEB8FE');
                svg.append('text')
                    .attr('x', width - 80)
                    .attr('y', height / 2)
                    .text('Pre-Tax')
                    .style('font-size', '15px')
                    .attr('alignment-baseline', 'middle');

                svg.append('circle')
                    .attr('cx', width - 100)
                    .attr('cy', height / 2 + 30)
                    .attr('r', 6)
                    .attr('fill', '#FF8600');
                svg.append('text')
                    .attr('x', width - 80)
                    .attr('y', height / 2 + 30)
                    .text('Post-Tax')
                    .style('font-size', '15px')
                    .attr('alignment-baseline', 'middle');
            }

            svg.attr('width', width)
                .attr('height', height)
                .attr('viewBox', [0, 0, width, height])
                .attr('style', 'max-width: 100%; height: auto; height: intrinsic;');

            svg.append('g')
                .attr('transform', `translate(0,${height - marginBottom})`)
                .style('font', '14px Inter')
                .call(xAxis);

            svg.append('g')
                .attr('transform', `translate(${marginLeft},0)`)
                .style('font', '14px Inter')
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
                .attr('d', preTaxLine(I.filter((i) => D[i])));

            svg.append('path')
                .attr('fill', 'none')
                .attr('stroke', color)
                .attr('stroke-width', strokeWidth)
                .attr('stroke-linecap', strokeLinecap)
                .attr('stroke-linejoin', strokeLinejoin)
                .attr('stroke-opacity', strokeOpacity)
                .attr('d', preTaxLine(I));

            color = '#FF8600';
            svg.append('path')
                .attr('fill', 'none')
                .attr('stroke', color)
                .attr('stroke-width', strokeWidth)
                .attr('stroke-linecap', strokeLinecap)
                .attr('stroke-linejoin', strokeLinejoin)
                .attr('stroke-opacity', strokeOpacity)
                .attr('d', postTaxLine(I));

            svg.append('rect')
                .style('fill', 'none')
                .style('pointer-events', 'all')
                .attr('width', width)
                .attr('height', height)
                .on('mouseover', mouseOver)
                .on('mousemove', mouseMove)
                .on('mouseout', mouseOut);

            return svg.node();
        }
        if (ref.current) {
            createGraph();
        }
    }, [yearlyWealthProjectionList]);

    return (
        <div ref={containerRef} className="flex justify-center">
            <svg className="" ref={ref} />
        </div>
    );
}

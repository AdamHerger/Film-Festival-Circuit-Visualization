import * as d3 from "d3";
import { useEffect, useRef } from "react";

function DistributionGraph({ data, attribute, min, max }) {
  const svgRef = useRef(null);
  const width = 640;
  const height = 333;
  const marginTop = 20;
  const marginRight = 20;
  const marginBottom = 30;
  const marginLeft = 40;

  useEffect(() => {
    if (!data || !attribute || !svgRef.current) return;
    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();
    const nodes = data.nodes ? data.nodes : data;
    const validData = nodes.filter(
      (d) =>
        d[attribute] !== undefined &&
        d[attribute] !== null &&
        d[attribute] !== 0 &&
        d[attribute] >= 0,
    );
    if (validData.length === 0) return;

    const bins = d3
      .bin()
      .thresholds(40)
      .value((d) => d[attribute])(validData);

    svg
      .attr("viewBox", [0, 0, width, height])
      .attr("style", "max-width: 100%; height: auto;");

    const x = d3
      .scaleLinear()
      .domain([bins[0].x0, bins[bins.length - 1].x1])
      .range([marginLeft, width - marginRight]);

    const y = d3
      .scaleSqrt()
      .domain([0, d3.max(bins, (d) => d.length)])
      .range([height - marginBottom, marginTop]);

    svg
      .append("g")
      .selectAll()
      .data(bins)
      .join("rect")
      .attr("x", (d) => x(d.x0) + 1)
      .attr("width", (d) => x(d.x1) - x(d.x0) - 1)
      .attr("y", (d) => y(d.length))
      .attr("height", (d) => y(0) - y(d.length))
      .attr("fill", (d) => {
        if (min !== undefined && max !== undefined) {
          if (d.x1 < min || d.x0 > max) {
            return "gray";
          }
        }
        return "steelblue";
      });

    svg
      .append("g")
      .attr("transform", `translate(0,${height - marginBottom})`)
      .call(
        d3
          .axisBottom(x)
          .ticks(width / 80)
          .tickSizeOuter(0),
      )
      .call((g) => g.selectAll("text").style("font-size", "16px"));

    svg
      .append("g")
      .attr("transform", `translate(${marginLeft},0)`)
      .call(d3.axisLeft(y).ticks(height / 40))
      .call((g) => g.select(".domain").remove())
      .call((g) => g.selectAll("text").style("font-size", "14px"));
  }, [data, attribute, min, max]);

  return (
    <svg
      ref={svgRef}
      width={width}
      height={height}
      className="distribution-graph"
    ></svg>
  );
}
export default DistributionGraph;

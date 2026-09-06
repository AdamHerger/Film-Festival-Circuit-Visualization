import * as d3 from "d3";
import { useEffect, useRef, useMemo } from "react";
import CalculateCompositeScore from "./CalculateCompositeScore";

function CompositeScoreDistributionGraph({ data, filters }) {
  const svgRef = useRef(null);
  const width = 640;
  const height = 333;
  const marginTop = 20;
  const marginRight = 20;
  const marginBottom = 30;
  const marginLeft = 40;

  const { bins } = useMemo(() => {
    if (!data) return { bins: [] };

    const nodes = data.nodes ? data.nodes : data;

    const scores = nodes
      .filter((d) => d.type === "film")
      .map((film) => CalculateCompositeScore(film, filters));

    if (scores.length === 0) {
      return { bins: [] };
    }

    const bins = d3.bin().domain([0, 100]).thresholds(40)(scores);

    return { bins };
  }, [data, filters]);

  useEffect(() => {
    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();
    if (!svgRef.current || bins.length === 0) return;

    svg
      .attr("viewBox", [0, 0, width, height])
      .attr("style", "max-width: 100%; height: auto;");

    const x = d3
      .scaleLinear()
      .domain([0, 100])
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
        if (
          d.x1 < filters.minCompositeScore ||
          d.x0 > filters.maxCompositeScore
        ) {
          return "gray";
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
          .tickSizeOuter(0)
          .tickFormat((d) => {
            if (d >= 10000000) {
              return "10m+";
            }
            if (d >= 1000000) {
              return `${d / 1000000}m`;
            }
            return d;
          }),
      )
      .call((g) => g.selectAll("text").style("font-size", "16px"));

    svg
      .append("g")
      .attr("transform", `translate(${marginLeft},0)`)
      .call(d3.axisLeft(y).ticks(height / 40))
      .call((g) => g.select(".domain").remove())
      .call((g) => g.selectAll("text").style("font-size", "14px"));
  }, [bins]);

  return (
    <svg
      ref={svgRef}
      width={width}
      height={height}
      className="distribution-graph"
    ></svg>
  );
}
export default CompositeScoreDistributionGraph;

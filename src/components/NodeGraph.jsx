import { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import NodeTooltip from "./NodeTooltip";

function NodeGraph({ data, repel, attract }) {
  const svgRef = useRef(null);
  const [hoveredNode, setHoveredNode] = useState(null);
  const [selectedNode, setSelectedNode] = useState(null);
  const minRadius = 4;
  const maxRadius = 15;
  const repelForce = repel;
  const attractForce = attract;

  useEffect(() => {
    if (!data) return;

    let currentSelectedNode = null;

    const { width, height } = svgRef.current.getBoundingClientRect();

    d3.select(svgRef.current).selectAll("*").remove();

    const color = d3
      .scaleOrdinal()
      .domain(["film", "festival"])
      .range(["#4dabf7", "#ff6b6b"]);

    const links = data.links.map((d) => ({ ...d }));
    const nodes = data.nodes.map((d) => ({ ...d }));

    const connectionCount = {};
    links.forEach((link) => {
      connectionCount[link.source] = (connectionCount[link.source] || 0) + 1;
      connectionCount[link.target] = (connectionCount[link.target] || 0) + 1;
    });
    nodes.forEach((node) => {
      node.connections = connectionCount[node.id] || 0;
    });
    const radiusScale = d3
      .scaleLinear()
      .domain(d3.extent(nodes, (d) => d.connections))
      .range([minRadius, maxRadius]);

    const svg = d3
      .select(svgRef.current)
      .attr("viewBox", `0 0 ${width} ${height}`);

    const graph = svg.append("g");

    const zoom = d3
      .zoom()
      .scaleExtent([0.1, 8])
      .on("zoom", (event) => {
        graph.attr("transform", event.transform);
      });

    svg.call(zoom);
    svg.on("dblclick.zoom", null);

    svg.on("click", () => {
      setSelectedNode(null);
      node
        .transition()
        .duration(200)
        .attr("r", (d) => radiusScale(d.connections));
      link.transition().duration(200).attr("stroke", "#999");
    });

    const simulation = d3
      .forceSimulation(nodes)
      .force(
        "charge",
        d3
          .forceManyBody()
          .strength((d) => -200 - d.connections * repelForce)
          .distanceMax(500),
      )
      .force("center", d3.forceCenter(width / 2, height / 2).strength(0.2))
      .force(
        "collision",
        d3.forceCollide((d) => radiusScale(d.connections) + attractForce),
      )
      .force(
        "link",
        d3
          .forceLink(links)
          .id((d) => d.id)
          .distance(150),
      );

    const link = graph
      .append("g")
      .attr("stroke-opacity", 0.6)
      .selectAll("line")
      .data(links)
      .join("line")
      .attr("stroke-width", 1)
      .attr("stroke", (d) => {
        if (!selectedNode) return "#999";
        return d.source.id === selectedNode.id ? "yellow" : "#999";
      });
    const node = graph
      .append("g")
      .attr("stroke", "#ffffff28")
      .attr("stroke-width", 1.5)
      .selectAll("circle")
      .data(nodes)
      .join("circle")
      .attr("r", (d) => radiusScale(d.connections))
      .attr("fill", (d) => color(d.group))
      .on("mouseover", function (event, d) {
        setHoveredNode(d);
        d3.select(this)
          .transition()
          .duration(200)
          .attr("r", (d) => radiusScale(d.connections) * 1.2);
      })
      .on("mouseout", function (event, d) {
        setHoveredNode(null);

        if (currentSelectedNode !== d) {
          d3.select(this)
            .transition()
            .duration(200)
            .attr("r", (d) => radiusScale(d.connections));
        }
      })
      .on("click", function (event, d) {
        event.stopPropagation();

        currentSelectedNode = d;
        setSelectedNode(d);

        d3.selectAll("circle")
          .transition()
          .duration(200)
          .attr("r", (node) =>
            node.id === d.id
              ? radiusScale(node.connections) * 1.2
              : radiusScale(node.connections),
          );
        link
          .transition()
          .duration(200)
          .attr("stroke", (l) =>
            l.source.id === d.id || l.target.id === d.id ? "yellow" : "#999",
          );
      });

    node.append("title").text((d) => d.id);

    simulation.on("tick", () => {
      link
        .attr("x1", (d) => d.source.x)
        .attr("y1", (d) => d.source.y)
        .attr("x2", (d) => d.target.x)
        .attr("y2", (d) => d.target.y);

      node.attr("cx", (d) => d.x).attr("cy", (d) => d.y);
    });

    setTimeout(() => simulation.stop(), 10000);

    return () => simulation.stop();
  }, [data]);

  return (
    <div className="graph-container">
      <NodeTooltip node={selectedNode} />
      <svg ref={svgRef} className="nodegraph"></svg>
    </div>
  );
}

export default NodeGraph;

import * as d3 from "d3";
import NodeGraph from "../components/NodeGraph";
import BuildGraph from "../components/BuildGraph";
import { useEffect, useState } from "react";
import AttributeFilters from "../components/AttributeFilters";
import FilterFilms from "../components/FilterFilms";
import SingleRangeSlider from "../components/SingleRangeSlider";

function Home() {
  const [films, setFilms] = useState([]);
  const [runs, setRuns] = useState([]);
  const [awards, setAwards] = useState([]);
  const [general, setGeneral] = useState([]);
  const [festivals, setFestivals] = useState([]);
  const [graph, setGraph] = useState(null);
  const [graphData, setGraphData] = useState(null);

  const [filters, setFilters] = useState({
    documentaryOnly: false,
    fictOnly: false,
    expOnly: false,
    animtOnly: false,
    lgbtqOnly: false,

    MENA: false,
    africa: false,
    asia: false,
    na: false,
    eu: false,
    la: false,
    ocean: false,

    minYear: 1900,
    maxYear: 2026,
    minRuntime: 0,
    maxRuntime: 1000,
    minConnections: 1,
    maxConnections: 200,
    minRating: 0,
    maxRating: 10,

    minBudget: 0,
    maxBudget: 1000000000,
    minOpeningUSA: 0,
    maxOpeningUSA: 1000000000,
    minGrossWorld: 0,
    maxGrossWorld: 1000000000,
    minGrossUSA: 0,
    maxGrossUSA: 1000000000,
    includeNA: new Map(),

    country: [],
    director: [],
    awards: [],
    languages: [],
    genres: [],
  });

  const [repel, setRepel] = useState(15);
  const [attract, setAttract] = useState(5);

  useEffect(() => {
    Promise.all([
      d3.csv("/dataset/1_film-dataset_festival-program_wide.csv"),
      d3.csv("/dataset/3_imdb-dataset_festival-runs_long.csv"),
      d3.dsv(";", "/dataset/4_festival-library_dataset_imdb-and-survey.csv"),
      d3.csv("/dataset/3_imdb-dataset_awards_long.csv"),
      d3.csv("/dataset/3_imdb-dataset_general-info_wide.csv"),
    ]).then(([films, runs, festivals, awards, general]) => {
      setFilms(films);
      setRuns(runs);
      setFestivals(festivals);
      setAwards(awards);
      setGeneral(general);

      const fullGraph = BuildGraph(films, runs, festivals, awards, general);
      setGraph(fullGraph);
    });
  }, []);

  const runSimulation = () => {
    if (!graph) return;
    const filteredGraph = FilterFilms(graph, filters);
    setGraphData(filteredGraph);
  };

  return (
    <div className="home">
      <div className="home-layout">
        <NodeGraph data={graphData} repel={repel} attract={attract} />
        <div className="filter-section">
          <button className="simulation-button" onClick={runSimulation}>
            Run Simulation
          </button>
          <div className="force-box-set">
            <div className="force-box">
              <SingleRangeSlider
                label="Attraction Force"
                minval={1}
                maxval={100}
                value={attract}
                setValue={setAttract}
              />
            </div>
            <div className="force-box">
              <SingleRangeSlider
                label="Repelling Force"
                minval={1}
                maxval={100}
                value={repel}
                setValue={setRepel}
              />
            </div>
          </div>
          <AttributeFilters
            filters={filters}
            setFilters={setFilters}
            films={films}
            awards={awards}
            runs={runs}
            general={general}
            graph={graph}
          />
        </div>
      </div>
    </div>
  );
}

export default Home;

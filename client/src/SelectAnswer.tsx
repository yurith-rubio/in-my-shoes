import { useContext, useState, useEffect, useRef } from "react";
import { ThemeContext } from "./ThemeContext.tsx";
import useResizeObserver from "./UseResizeObserver.tsx";
import { useNavigate } from "react-router-dom";
import * as d3 from "d3";
import d3Tip from "d3-tip";
// @ts-ignore
import {createVoronoiTessellation,random} from "https://cdn.skypack.dev/@georgedoescode/generative-utils";

function SelectAnswer() {
    const value = useContext(ThemeContext);
    const userInfo = value.userInfo;
    const wrapperRef = useRef<HTMLDivElement | null>(null);
    const dimensions = useResizeObserver(wrapperRef);
    const svgRef = useRef<SVGSVGElement | null>(null);
    const svg = d3.select(svgRef.current!);
    const navigate = useNavigate();
    const [data, setData] = useState([]);

    let width: number = 0;
    let height: number = 0;
    
    if (dimensions) {
        width = dimensions.width;
        height = dimensions.height;
    }
    
    svg
        .attr("width", width)
        .attr("height", height)
    
    
    useEffect(() => {
        fetch('/api/worries/overview/' + userInfo.age)
        .then(res => res.json())
        .then(data => {
            setData(data);
        })
        .catch(err => console.log(err));
    }, []);
    
    useEffect(() => {
        //Initialising the generating random points around the svg area
    const points = [...Array(data.length)].map(() => {
        return {
        x: random(0, width),
        y: random(0, height),
        };
    });

    //Generate information to later use it to generate poligons on the svg area
    const tessellation = createVoronoiTessellation({
        width,
        height,
        points,
        relaxIterations: 6,
    });

    const cells = tessellation.cells;
 
    const polygonPoints = cells.map((cell: any) => {
        return cell.points
    })

    //Add polygns grid to the svg area
    svg
        .selectAll("polygon")
        .data(polygonPoints)
        .join("polygon")
        .attr("points", (points: any) => {
            return points;
        })
        .classed('points', true)
        .classed('visible', true)
        .attr("fill", "none")
    // .attr("stroke", "red")
    

    //Add data to cells array
    const newData = data.map((d: any, i: any) => {
        
        return {
            ...d,
            ...cells[i]
        }
    })

        const tooltip = (d3Tip as Function)()
            .attr('class', 'd3-tip')
            // set position of the circle relative to the svg width
            .offset(function (data: any) {
                let circlePosition = data.centroid.x;
                let svgWidth = svg.node()?.getBoundingClientRect().width;
                if (svgWidth) {
                    if (circlePosition < svgWidth / 2) {
                        return [-20, 220];
                    } else {
                        return [-20, -220];
                    }
                } else {
                    return [0, 0];
                }
            })
            .html((d: any) => {
                return `
            <div class="tooltip_wrapper white-border">
                <div>
                    <span class="tooltip_summary">${d.summary}</span>
                </div>
                <p class="author-info">
                    <span class="tooltip_summary">${d.nickname}</span>
                    <span class="tooltip_summary">${d.age}</span>
                </p>
            </div>
            `
            });
    
        svg
            .selectAll("circle")
            .data(newData)
            .join("circle")
            .classed('circle', true)
            .classed('visible', true)
            .attr("r", function (cell: any) {
                return cell.innerCircleRadius / 2;
            })
            .attr('cx', function (cell: any) {
                return cell.centroid.x;
            })
            .attr('cy', function (cell: any) {
                return cell.centroid.y;
            })
            .attr("opacity", 0)
            .transition()
            .attr("opacity", 1)
            .duration(100)
            .on("end", function () {
                d3.select(this)
                .call(tooltip)
                .on("mouseover", function (_, d) {
                    tooltip.show(d, this);
                    d3.select(this)
                        .transition()
                        .attr("r", function (d: any) {
                            return d.innerCircleRadius / 1.2;
                        })
                })
                .on("mouseout", function (_, d) {
                    tooltip.hide(d, this);
                    d3.select(this)
                        .transition()
                        .attr("r", function (d: any) {
                            return d.innerCircleRadius / 2;
                        })
                })
                .on("click", function (_, data: any) {
                    tooltip.hide(data, this);
                    navigate("/read-worry", { state: { id: data.id } });
                })        
             })

       
    }, [data])

    return (
        <section>
            <div id="svg_wrapper" ref={wrapperRef}>
                <svg ref={svgRef}>
                </svg>
                <h1 className="viz_bg_text">Select Worry</h1>
            </div>
        </section>
    )
}

export default SelectAnswer;
import "./styles.css";
import React, {useMemo} from "react";
import {CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis,} from "recharts";
import {data} from "./data";
import {CustomizedDot} from "./components/CustomizedDot";
import {useZScore} from "./hooks/useZScore";

export default function App() {
    const xPvValues =  useMemo(() => data.map(el => el.pv), [data]);
    const xUvValues =  useMemo(() => data.map(el => el.uv), [data]);

    const zScorePv = useZScore(xPvValues);
    const zScoreUv = useZScore(xUvValues);


    // internet solution
    const colorBreakPoint = 3000;
    const { min, max } = data.reduce((result, dataPoint) => ({
        min: (dataPoint.pv < result.min || result.min === 0) ? dataPoint.pv : result.min,
        max: (dataPoint.pv > result.max || result.max === 0) ? dataPoint.pv : result.max,
    }), { min: 0, max: 0 });
    const colorBreakPointPercentage = `${(1 - ((colorBreakPoint - min) / (max - min))) * 100}%`;

    return (
        <ResponsiveContainer width={"100%"} height={300}>
            <LineChart data={data} margin={{top: 20}} accessibilityLayer>
                <defs>
                    <linearGradient id="colorUv" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="green"/>
                        <stop offset={colorBreakPointPercentage} stopColor="green"/>
                        <stop offset={colorBreakPointPercentage} stopColor="red"/>
                        <stop offset="100%" stopColor="red"/>
                    </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3"/>
                <XAxis dataKey="name" padding={{left: 30, right: 30}}/>
                <YAxis/>
                <Tooltip/>
                <Legend iconSize={24}/>

                <Line
                    key='pvLine'
                    type="monotone"
                    dataKey="pv"
                    stroke="url(#colorUv)"
                    strokeWidth={3}
                    dot={(props) => <CustomizedDot {...props} />}
                />
                <Line type="monotone" dataKey="uv" stroke="#82ca9d"/>

            </LineChart>
        </ResponsiveContainer>
    );
}

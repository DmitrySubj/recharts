import "./styles.css";
import React from "react";
import {CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis,} from "recharts";
import {data} from "./data";
import {CustomizedDot} from "./components/CustomizedDot";

export default function App() {
    const xPvValues =  data.map(el => el.pv);
    const getXPvDeviation = (el: number) => Math.pow(el - xPvAverage,  2);
    const sum = (a: number, b: number) => a + b

    const xPvAverage =  xPvValues.reduce(sum, 0)/xPvValues.length;
    const xPvDispersionSum = xPvValues.map(getXPvDeviation).reduce(sum, 0)/xPvValues.length;

    const xPvDispersion = Math.sqrt(xPvDispersionSum);
    const getZScore = (x: number) => (x - xPvAverage) / xPvDispersion;
    const zScorePv = xPvValues.map(getZScore);

    console.log(zScorePv);


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

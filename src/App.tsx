import "./styles.css";
import React, {useMemo} from "react";
import {CartesianGrid, Dot, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";
import {data} from "./data";
import {useZScore} from "./hooks/useZScore";
import {useZColor} from "./hooks/useZColor";
import {LinearGradient} from "./components/LinearGradient";
import {CustomizedDot } from "./components/CustomizedDot";

export default function App() {
    const xPvValues =  useMemo(() => data.map(el => el.pv), [data]);
    const xUvValues =  useMemo(() => data.map(el => el.uv), [data]);

    const zScorePv = useZScore(xPvValues);
    const zScorePvColorPercent = useZColor(zScorePv, 1);
    const zScoreUv = useZScore(xUvValues);
    const zScoreUvColorPercent = useZColor(zScoreUv, 1);


    return (
        <ResponsiveContainer width={"100%"} height={300}>
            <LineChart data={data} margin={{top: 20}} accessibilityLayer>
                <defs>
                    <LinearGradient id='colorPv' offsetPoint={zScorePvColorPercent} />
                    <LinearGradient id='colorUv' offsetPoint={zScoreUvColorPercent} />
                </defs>
                <CartesianGrid strokeDasharray="3 3"/>
                <XAxis dataKey="name" padding={{left: 30, right: 30}}/>
                <YAxis/>
                <Tooltip/>
                <Legend iconSize={24}/>

                <Line
                    type="monotone"
                    dataKey="pv"
                    stroke="url(#colorPv)"
                    dot={(props) => <Dot {...props} stroke={zScorePv[props.index] > 1 ? 'red' : 'green'} />}
                    activeDot={(props) => <CustomizedDot {...props} stroke={zScorePv[props.index] > 1 ? 'red' : 'green'} />}
                />
                <Line
                    type="monotone"
                    dataKey="uv"
                    stroke="url(#colorUv)"
                    dot={(props) => <Dot {...props} stroke={zScoreUv[props.index] > 1 ? 'red' : 'green'} />}
                    activeDot={(props) => <CustomizedDot {...props} stroke={zScoreUv[props.index] > 1 ? 'red' : 'green'} />}
                />

            </LineChart>
        </ResponsiveContainer>
    );
}

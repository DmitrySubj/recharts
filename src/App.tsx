import "./styles.css";
import React, {useMemo, memo} from "react";
import {
    CartesianGrid,
    Dot,
    Legend,
    Line,
    LineChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";
import {data} from "./data";
import {useZScore} from "./hooks/useZScore";
import {useZColor} from "./hooks/useZColor";
import {LinearGradient} from "./components/LinearGradient";
import {CustomizedDot } from "./components/CustomizedDot";
import {ZColors, EZScoresKeys} from "./types";


export default function App() {
    const xPvValues =  useMemo(() => data.map(el => el.pv), [data]);
    const xUvValues =  useMemo(() => data.map(el => el.uv), [data]);

    const zScores = {
        [EZScoresKeys.PV]: useZScore(xPvValues),
        [EZScoresKeys.UV]: useZScore(xUvValues),
    };

    const zScorePvColorPercent = useZColor(zScores.pv, 1);
    const zScoreUvColorPercent = useZColor(zScores.uv, 1);

    const extractStrokeColor = (zKey: EZScoresKeys, index: number) => zScores[zKey][index] > 1 ? ZColors.RED : ZColors.GREEN

    const MemoCustomizedDot = memo(CustomizedDot);

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
                    dot={(props) => <Dot {...props} stroke={extractStrokeColor(EZScoresKeys.PV, props.index)} />}
                    activeDot={(props) => <MemoCustomizedDot key={props.v} {...props} stroke={extractStrokeColor(EZScoresKeys.PV, props.index)} />}
                />
                <Line
                    type="monotone"
                    dataKey="uv"
                    stroke="url(#colorUv)"
                    dot={(props) => <Dot {...props} stroke={extractStrokeColor(EZScoresKeys.UV, props.index)} />}
                    activeDot={(props) => <MemoCustomizedDot key={props.v} {...props} stroke={extractStrokeColor(EZScoresKeys.UV, props.index)} />}
                />

            </LineChart>
        </ResponsiveContainer>
    );
}

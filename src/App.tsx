import './styles.css';
import React, { useMemo, memo } from 'react';
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
} from 'recharts';
import { mockData } from './data';
import { useZScore } from './hooks/useZScore';
import { useZColor } from './hooks/useZColor';
import { LinearGradient } from './components/LinearGradient';
import { CustomizedDot } from './components/CustomizedDot';
import { ZColors, EZScoresKeys } from './types';

const MemoCustomizedDot = memo(CustomizedDot);

export default function App({ data = mockData }) {
  const [xPvValues, xUvValues] = useMemo(
    () => [data.map((el) => el.pv), data.map((el) => el.uv)],
    [data],
  );

  const zScores = {
    [EZScoresKeys.PV]: useZScore(xPvValues),
    [EZScoresKeys.UV]: useZScore(xUvValues),
  };

  const [zScorePvColorPercent, zScoreUvColorPercent] = [
    useZColor(zScores[EZScoresKeys.PV], 1),
    useZColor(zScores[EZScoresKeys.UV], 1),
  ];

  const getStrokeColor = useMemo(() => {
    return (zKey: EZScoresKeys, index: number) =>
      zScores[zKey][index] > 1 ? ZColors.RED : ZColors.GREEN;
  }, [zScores]);

  return (
    <ResponsiveContainer width={'100%'} height={300}>
      <LineChart data={data} margin={{ top: 20 }} accessibilityLayer>
        <defs>
          <LinearGradient id="colorPv" offsetPoint={zScorePvColorPercent} />
          <LinearGradient id="colorUv" offsetPoint={zScoreUvColorPercent} />
        </defs>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" padding={{ left: 30, right: 30 }} />
        <YAxis />
        <Tooltip />
        <Legend iconSize={24} />
        <Line
          type="monotone"
          dataKey={EZScoresKeys.PV}
          stroke="url(#colorPv)"
          dot={(props) => (
            <Dot
              {...props}
              stroke={getStrokeColor(EZScoresKeys.PV, props.index)}
            />
          )}
          activeDot={(props: any) => (
            <MemoCustomizedDot
              key={props.v}
              {...props}
              stroke={getStrokeColor(EZScoresKeys.PV, props.index)}
            />
          )}
        />
        <Line
          type="monotone"
          dataKey={EZScoresKeys.UV}
          stroke="url(#colorUv)"
          dot={(props) => (
            <Dot
              {...props}
              stroke={getStrokeColor(EZScoresKeys.UV, props.index)}
            />
          )}
          activeDot={(props: any) => (
            <MemoCustomizedDot
              key={props.v}
              {...props}
              stroke={getStrokeColor(EZScoresKeys.UV, props.index)}
            />
          )}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}

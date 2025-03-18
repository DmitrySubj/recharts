import React from 'react';
import {DotProps} from "recharts";

export type TProps = DotProps & React.SVGProps<SVGCircleElement>;

export const CustomizedDot: React.FC<TProps> = (props) => {
    return (
        <circle
            {...props}
            r="3"
            stroke={props.stroke}
            fill={props.stroke}
            strokeWidth="2"
            className="recharts-dot"></circle>
    )
}

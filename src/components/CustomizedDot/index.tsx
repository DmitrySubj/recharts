import React from 'react';
import {DotProps, Dot} from "recharts";

type TOther = Record<'value', string | number>;

type TProps = DotProps & TOther;

export const CustomizedDot: React.FC<TProps> = (props) => {
    const modyProps = {
        ...props,
        stroke: props.value > 2400 ? 'red' : '#8884d8'
    }
    return (
        <Dot {...modyProps} />
    );
};

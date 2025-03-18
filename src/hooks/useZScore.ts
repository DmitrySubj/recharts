import {useEffect, useState} from "react";

export const useZScore = (data: Array<number>) => {
    const [values, setValues] = useState<Array<number>>([]);

    const getDeviation = (el: number) => Math.pow(el - average,  2);
    const sum = (a: number, b: number) => a + b

    const average =  data.reduce(sum, 0)/data.length;
    const dispersionSum = data.map(getDeviation).reduce(sum, 0)/data.length;

    const dispersion = Math.sqrt(dispersionSum);

    const getZScore = (x: number) => (x - average) / dispersion;
    const zScore = data.map(getZScore);

    useEffect(() => {
        setValues(zScore);
    }, [data])

    return values;
}
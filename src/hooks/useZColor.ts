import {useEffect, useState} from "react";


export const useZColor = (values: Array<number> = [], breakpoint: number = 0) => {
    const [percent, setPercent] = useState<string>('0%');
    const min = Math.min(...values) || 0;
    const max = Math.max(...values) || 0;

    const colorBreakPointPercentage = `${(1 - ((breakpoint - min) / (max - min))) * 100}%`;

    useEffect(() => {
        if (values.length > 0) {
            setPercent(colorBreakPointPercentage);
        }
    }, [values, breakpoint]);

    return percent;
}
import { useEffect, useState } from 'react';
import { Percentage } from '../../models/statistics/percentage';
import { InputComponent } from '../bases/input-component';
import { PercentageInputComponentProps } from './percentage-input-component-props';

export function PercentageInputComponent({
    percentage,
    onChange,
    percision = 2,
}: PercentageInputComponentProps) {
    const [rawInput, setRawInput] = useState(percentage.value.toFixed(percision));

    useEffect(() => {
        if (isNaN(percentage.value)) {
            return setRawInput('');
        }
        setRawInput(percentage.value.toFixed(percision));
    }, [percentage, percision, setRawInput]);

    return (
        <div className="flex">
            <InputComponent
                value={rawInput}
                placeholder="0.00"
                onChange={(rawPercentage) => {
                    setRawInput(rawPercentage);
                }}
                onBlur={() => {
                    setRawInput(parseFloat(rawInput).toFixed(percision));
                    onChange(
                        new Percentage({
                            value: parseFloat(rawInput),
                        })
                    );
                }}
            />
            <span>%</span>
        </div>
    );
}

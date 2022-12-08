import { useState } from 'react';
import { Percentage } from '../../models/statistics/percentage';
import { InputComponent } from '../bases/input-component';
import { PercentageInputComponentProps } from './percentage-input-component-props';

export function PercentageInputComponent({ percentage, onChange }: PercentageInputComponentProps) {
    const [rawPercentage, setRawPercentage] = useState(percentage.value.toFixed(2));

    return (
        <div>
            <InputComponent
                value={rawPercentage}
                onChange={setRawPercentage}
                onBlur={() =>
                    onChange(
                        new Percentage({
                            value: parseFloat(rawPercentage),
                        })
                    )
                }
            />
            <span>%</span>
        </div>
    );
}

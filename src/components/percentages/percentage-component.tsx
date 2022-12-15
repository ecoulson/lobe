import { PercentageComponentProps } from './percentage-component-props';

export function PercentageComponent({ percentage, percision = 2 }: PercentageComponentProps) {
    return (
        <div>
            <p>{percentage.value.toFixed(percision)}%</p>
        </div>
    );
}

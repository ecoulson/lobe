import { PercentageComponentProps } from './percentage-component-props';

export function PercentageComponent({ percentage, precision = 2 }: PercentageComponentProps) {
    return (
        <div>
            <p>{percentage.value.toFixed(precision)}%</p>
        </div>
    );
}

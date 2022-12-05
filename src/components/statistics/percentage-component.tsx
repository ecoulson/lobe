import { PercentageComponentProps } from './percentage-component-props';

export function PercentageComponent({ percentage }: PercentageComponentProps) {
    return (
        <div>
            <p>{percentage.value.toFixed(2)}%</p>
        </div>
    );
}

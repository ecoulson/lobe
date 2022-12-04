import { PercentageComponentProps } from './percentage-component-props';

export function PercentageComponent({ percentage }: PercentageComponentProps) {
    return (
        <div>
            <p>{percentage.value}%</p>
        </div>
    );
}

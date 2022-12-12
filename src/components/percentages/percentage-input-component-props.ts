import { Percentage } from '../../models/statistics/percentage';

export interface PercentageInputComponentProps {
    percentage: Percentage;
    onChange: (percentage: Percentage) => void;
}

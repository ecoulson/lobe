import { Percentage } from '../../models/statistics/percentage';

export interface PercentageInputComponentProps {
    percentage: Percentage;
    percision?: number;
    onChange: (percentage: Percentage) => void;
}

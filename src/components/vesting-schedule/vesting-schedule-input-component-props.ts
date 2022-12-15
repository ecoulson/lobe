import { Percentage } from '../../models/statistics/percentage';

export interface VestingScheduleInputComponentProps {
    vestingSchedule: Percentage[];
    onChange: (vestingSchedule: Percentage[]) => void;
}

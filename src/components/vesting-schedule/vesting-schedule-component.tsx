import { PercentageComponent } from '../bases/percentage-component';
import { DataComponent } from '../data/data-component';
import { VestingScheduleComponentProps } from './vesting-schedule-component-props';

export function VestingScheduleComponent({
    yearlyVestingPercentage,
}: VestingScheduleComponentProps) {
    return (
        <DataComponent
            label="Vesting Schedule"
            data={
                <div className="flex">
                    {yearlyVestingPercentage.map((percentage, i) => (
                        <div className="flex" key={i}>
                            <PercentageComponent percision={0} percentage={percentage} />
                            {i === yearlyVestingPercentage.length - 1 ? null : (
                                <span className="px-2">/</span>
                            )}
                        </div>
                    ))}
                </div>
            }
        />
    );
}

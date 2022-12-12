import { DataComponent } from '../data/data-component';
import { PercentageComponent } from '../statistics/percentage-component';
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
                        <>
                            <PercentageComponent precision={0} percentage={percentage} />
                            {i === yearlyVestingPercentage.length - 1 ? null : (
                                <span className="px-2">/</span>
                            )}
                        </>
                    ))}
                </div>
            }
        />
    );
}

import { Percentage } from '../../models/statistics/percentage';
import { ButtonComponent } from '../bases/button-component';
import { PercentageInputComponent } from '../bases/percentage-input-component';
import { VestingScheduleInputComponentProps } from './vesting-schedule-input-component-props';

export function VestingScheduleInputComponent({
    vestingSchedule,
    onChange,
}: VestingScheduleInputComponentProps) {
    function updateVestingSchedule(updatedPercentage: Percentage, i: number) {
        onChange(
            vestingSchedule.map((percentage, j) => {
                if (i === j) {
                    return updatedPercentage;
                }
                return percentage;
            })
        );
    }

    function addToVestingSchedule() {
        onChange([...vestingSchedule, new Percentage()]);
    }

    function removeFromVestingSchedule(i: number) {
        onChange(
            vestingSchedule.filter((_, j) => {
                return i !== j;
            })
        );
    }

    return (
        <>
            <div className="flex flex-row gap-y-2 items-center flex-wrap">
                {vestingSchedule.map((percentage, i) => {
                    return (
                        <div className="flex gap-x-4" key={i}>
                            <div className="w-1/2">
                                <PercentageInputComponent
                                    key={i}
                                    percision={1}
                                    percentage={percentage}
                                    onChange={(percentage) => updateVestingSchedule(percentage, i)}
                                />
                            </div>
                            <div className="w-1/2">
                                <ButtonComponent onClick={() => removeFromVestingSchedule(i)}>
                                    Remove
                                </ButtonComponent>
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className="flex w-1/2">
                <ButtonComponent onClick={addToVestingSchedule}>Add</ButtonComponent>
            </div>
        </>
    );
}

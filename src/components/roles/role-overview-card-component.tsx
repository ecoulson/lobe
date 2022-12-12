import { CardComponent } from '../card/card-component';
import { DataComponent } from '../data/data-component';
import { VestingScheduleComponent } from '../equities/vesting-schedule-component';
import { MoneyComponent } from '../funds/money-component';
import { PercentageComponent } from '../statistics/percentage-component';
import { RoleOverviewCardComponentProps } from './role-overview-card-component-props';

export function RoleOverviewCardComponent({ role }: RoleOverviewCardComponentProps) {
    return (
        <CardComponent title="Overview" icon={<img alt="google logo" src="company.png" />}>
            <div className="flex gap-16">
                <div className="flex flex-col gap-y-4">
                    <DataComponent label="Equity" data={<MoneyComponent money={role.equity} />} />
                    <DataComponent
                        label="Salary"
                        data={<MoneyComponent money={role.baseSalary} />}
                    />
                    <DataComponent
                        label="Matched 401k Contributions"
                        data={<MoneyComponent money={role.maxMatched401KContributions} />}
                    />
                </div>
                <div className="flex flex-col gap-y-4">
                    <VestingScheduleComponent yearlyVestingPercentage={role.vestingSchedule} />
                    <DataComponent
                        label="Sign On Bonus"
                        data={<MoneyComponent money={role.signOnBonus} />}
                    />
                    <DataComponent
                        label="401k Matching Percentage"
                        data={
                            <PercentageComponent
                                precision={0}
                                percentage={role.matching401kPercentage}
                            />
                        }
                    />
                </div>
            </div>
        </CardComponent>
    );
}

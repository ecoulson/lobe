import { CardComponent } from '../card/card-component';
import { DataComponent } from '../data/data-component';
import { VestingScheduleComponent } from '../vesting-schedule/vesting-schedule-component';
import { MoneyComponent } from '../funds/money-component';
import { RoleOverviewCardComponentProps } from './role-overview-card-component-props';
import { PercentageComponent } from '../bases/percentage-component';

export function RoleOverviewCardComponent({ role }: RoleOverviewCardComponentProps) {
    return (
        <CardComponent
            title="Overview"
            icon={<img alt="google logo" className="h-8" src={role.companyLogo} />}
        >
            <div className="flex gap-8 justify-between items-center flex-wrap sm:flex-nowrap">
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
                                percision={0}
                                percentage={role.matching401kPercentage}
                            />
                        }
                    />
                </div>
            </div>
        </CardComponent>
    );
}

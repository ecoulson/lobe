import { StatisticsCardComponentProps } from './statistics-card-component-props';
import { ReactComponent as StatisticsIcon } from '../../assets/statistics.svg';
import { CardComponent } from '../card/card-component';
import { DataComponent } from '../data/data-component';
import { PercentageComponent } from '../percentages/percentage-component';
import { DataComponentSize } from '../data/data-component-size';
import { BalanceComponent } from '../funds/balance-component';
import { MoneyComponent } from '../funds/money-component';
import { inject } from '../../clients/dependency-injection/inject';
import { useEffect, useState } from 'react';

export const StatisticsCardComponent = inject<
    StatisticsCardComponentProps,
    'savingStatisticsController'
>(
    {
        savingStatisticsController: 'SavingStatisticsController',
    },
    ({ role, savingStatisticsController }: StatisticsCardComponentProps) => {
        const [statistics, setStatistics] = useState(
            savingStatisticsController.getSavingStatisticsByRole(role)
        );

        useEffect(() => {
            setStatistics(savingStatisticsController.getSavingStatisticsByRole(role));
        }, [role, setStatistics, savingStatisticsController]);

        function getBalanceTextColor() {
            if (statistics.distanceFromSavingsGoal.sign === '-') {
                return 'text-card-expenses';
            }
            return 'text-card-income';
        }

        return (
            <CardComponent title="Statistics" icon={<StatisticsIcon width={32} height={32} />}>
                <div className="flex gap-8 items-center justify-between">
                    <div className="flex flex-col gap-y-4">
                        <DataComponent
                            label="Savings Percentage"
                            data={<PercentageComponent percentage={statistics.percentageSaved} />}
                        />
                        <DataComponent
                            label="Initial Net Worth"
                            data={<MoneyComponent money={statistics.initialNetWorth} />}
                        />
                        <DataComponent
                            label="Estimated Return Rate"
                            data={
                                <PercentageComponent percentage={statistics.estimatedReturnRate} />
                            }
                        />
                        <DataComponent
                            label="Ages Worked"
                            data={
                                <p>
                                    {statistics.agesWorked[0]} - {statistics.agesWorked[1]}
                                </p>
                            }
                        />
                    </div>
                    <div className="flex flex-col gap-y-8">
                        <DataComponent
                            label="Left To Save"
                            size={DataComponentSize.LARGE}
                            data={
                                <div className={getBalanceTextColor()}>
                                    <BalanceComponent
                                        balance={statistics.distanceFromSavingsGoal}
                                    />
                                </div>
                            }
                        />
                        <DataComponent
                            label="Goal To Save"
                            size={DataComponentSize.LARGE}
                            data={
                                <div className="text-card-income">
                                    <MoneyComponent money={statistics.goalToSave} />
                                </div>
                            }
                        />
                        <DataComponent
                            label="Final Net Worth"
                            size={DataComponentSize.LARGE}
                            data={
                                <div className="text-card-income">
                                    <MoneyComponent money={statistics.finalNetWorth} />
                                </div>
                            }
                        />
                    </div>
                </div>
            </CardComponent>
        );
    }
);

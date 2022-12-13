import { CardComponent } from '../card/card-component';
import { ReactComponent as WealthProjectionIcon } from '../../assets/wealth-projection.svg';
import { WealthProjectionChartComponent } from './wealth-projection-chart-component';
import { BudgetDashboardWealthOverviewComponentProps } from './budget-dashboard-wealth-overview-component-props';
import { inject } from '../../clients/dependency-injection/inject';

export const BudgetDashboardWealthOverviewComponent = inject<
    BudgetDashboardWealthOverviewComponentProps,
    'wealthProjectionController'
>(
    {
        wealthProjectionController: 'WealthProjectionController',
    },
    ({ roles, wealthProjectionController }: BudgetDashboardWealthOverviewComponentProps) => {
        console.log(wealthProjectionController.calculateWealthProjectionDataPoints(roles));
        return (
            <div className="col-span-full">
                <CardComponent
                    title="Wealth Projection"
                    icon={<WealthProjectionIcon width={50} height={50} />}
                >
                    <WealthProjectionChartComponent
                        yearlyWealthProjectionList={wealthProjectionController.calculateWealthProjectionDataPoints(
                            roles
                        )}
                    />
                </CardComponent>
            </div>
        );
    }
);

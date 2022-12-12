import { CardComponent } from '../card/card-component';
import { ReactComponent as WealthProjectionIcon } from '../../assets/wealth-projection.svg';
import { WealthProjectionChartComponent } from '../wealth-projections/wealth-projection-chart-component';
import { YearlyWealthProjection } from '../../models/wealth-projections/yearly-wealth-projection';

export function BudgetDashboardWealthOverviewComponent() {
    return (
        <div className="col-span-3">
            <CardComponent
                title="Wealth Projection"
                icon={<WealthProjectionIcon width={50} height={50} />}
            >
                <WealthProjectionChartComponent
                    yearlyWealthProjectionList={[
                        new YearlyWealthProjection({
                            year: 2000,
                            estimatedNetWorth: 1000,
                        }),
                        new YearlyWealthProjection({
                            year: 2001,
                            estimatedNetWorth: 2000,
                        }),
                        new YearlyWealthProjection({
                            year: 2002,
                            estimatedNetWorth: 3000,
                        }),
                        new YearlyWealthProjection({
                            year: 2003,
                            estimatedNetWorth: 4000,
                        }),
                        new YearlyWealthProjection({
                            year: 2004,
                            estimatedNetWorth: 4000,
                        }),
                        new YearlyWealthProjection({
                            year: 2005,
                            estimatedNetWorth: 3000,
                        }),
                        new YearlyWealthProjection({
                            year: 2006,
                            estimatedNetWorth: 5000,
                        }),
                    ]}
                />
            </CardComponent>
        </div>
    );
}

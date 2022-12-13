import { CardComponent } from '../card/card-component';
import { ReactComponent as WealthProjectionIcon } from '../../assets/wealth-projection.svg';
import { WealthProjectionChartComponent } from './wealth-projection-chart-component';
import { TemporalWealthProjection } from '../../models/wealth-projections/yearly-wealth-projection';

export function BudgetDashboardWealthOverviewComponent() {
    return (
        <div className="col-span-full">
            <CardComponent
                title="Wealth Projection"
                icon={<WealthProjectionIcon width={50} height={50} />}
            >
                <WealthProjectionChartComponent
                    yearlyWealthProjectionList={[
                        new TemporalWealthProjection({
                            date: new Date('10/16/2000'),
                            estimatedNetWorth: 1000,
                        }),
                        new TemporalWealthProjection({
                            date: new Date('10/16/2001'),
                            estimatedNetWorth: 2000,
                        }),
                        new TemporalWealthProjection({
                            date: new Date('10/16/2002'),
                            estimatedNetWorth: 3000,
                        }),
                        new TemporalWealthProjection({
                            date: new Date('10/16/2003'),
                            estimatedNetWorth: 4000,
                        }),
                        new TemporalWealthProjection({
                            date: new Date('10/16/2004'),
                            estimatedNetWorth: 4000,
                        }),
                        new TemporalWealthProjection({
                            date: new Date('10/16/2005'),
                            estimatedNetWorth: 3000,
                        }),
                        new TemporalWealthProjection({
                            date: new Date('10/16/2006'),
                            estimatedNetWorth: 5000,
                        }),
                    ]}
                />
            </CardComponent>
        </div>
    );
}

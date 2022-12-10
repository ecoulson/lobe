import { CardComponent } from '../card/card-component';
import { ReactComponent as WealthProjectionIcon } from '../../assets/wealth-projection.svg';

export function BudgetDashboardWealthOverviewComponent() {
    return (
        <div className="col-span-3">
            <CardComponent
                title="Wealth Projection"
                icon={<WealthProjectionIcon width={50} height={50} />}
            >
                <div>A graph!</div>
            </CardComponent>
        </div>
    );
}

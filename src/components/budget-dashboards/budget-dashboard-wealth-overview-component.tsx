import { CardComponent } from '../card/card-component';

export function BudgetDashboardWealthOverviewComponent() {
    return (
        <div className="col-span-3">
            <CardComponent title="Wealth Projection" icon={<p>Icon</p>}>
                <div>A graph!</div>
            </CardComponent>
        </div>
    );
}

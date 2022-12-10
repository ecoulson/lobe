import { CardComponent } from '../card/card-component';
import { CardComponentHeaderType } from '../card/card-component-header-type';
import { GridComponent } from '../grid/grid-component';

export function RoleOverviewComponent() {
    return (
        <GridComponent columns={3}>
            <CardComponent title="Overview" icon={<p>Icon</p>}>
                <p>Some text</p>
            </CardComponent>
            <CardComponent
                headerType={CardComponentHeaderType.Income}
                title="Income"
                icon={<p>Icon</p>}
            >
                <p>Some text</p>
            </CardComponent>
            <CardComponent title="Savings" icon={<p>Icon</p>}>
                <p>Some text</p>
            </CardComponent>
            <div className="col-span-2">
                <CardComponent
                    headerType={CardComponentHeaderType.Expenses}
                    title="Expenses"
                    icon={<p>Icon</p>}
                >
                    <p>Some text</p>
                </CardComponent>
            </div>
            <CardComponent title="Statistics" icon={<p>Icon</p>}>
                <p>Some text</p>
            </CardComponent>
        </GridComponent>
    );
}

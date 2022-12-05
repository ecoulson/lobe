import { BudgetRowComponent } from '../budgets/budget-row-component';
import { BudgetSectionComponent } from '../budgets/budget-section-component';
import { InputComponent } from '../inputs/input-component';
import { RoleRowComponentProps } from './role-row-component-props';

export function RoleRowComponent({ roleList }: RoleRowComponentProps) {
    return (
        <BudgetSectionComponent heading="Role">
            <BudgetRowComponent
                field="Company"
                cells={roleList.map((role) => (
                    <InputComponent value={role.company} onChange={() => {}} />
                ))}
            />
            <BudgetRowComponent
                field="Level"
                cells={roleList.map((role) => (
                    <InputComponent value={role.level} onChange={() => {}} />
                ))}
            />
            <BudgetRowComponent
                field="State"
                cells={roleList.map((role) => (
                    <InputComponent value={role.state} onChange={() => {}} />
                ))}
            />
            <BudgetRowComponent
                field="Estimated Years at Level"
                cells={roleList.map((role) => (
                    <InputComponent
                        value={role.estimatedYearsSpentInPosition.toString()}
                        onChange={() => {}}
                    />
                ))}
            />
            <BudgetRowComponent
                field="Start Age"
                cells={roleList.map((role) => (
                    <p key={role.startAge}>{role.startAge}</p>
                ))}
            />
            <BudgetRowComponent
                field="End Age"
                cells={roleList.map((role) => (
                    <p key={role.endAge}>{role.endAge}</p>
                ))}
            />
        </BudgetSectionComponent>
    );
}

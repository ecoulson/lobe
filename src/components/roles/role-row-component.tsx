import { BudgetRowComponent } from '../budgets/budget-row-component';
import { BudgetSectionComponent } from '../budgets/budget-section-component';
import { InputComponent } from '../inputs/input-component';
import { RoleRowComponentProps } from './role-row-component-props';

export function RoleRowComponent({ roleList: roles }: RoleRowComponentProps) {
    return (
        <BudgetSectionComponent heading="Role">
            <BudgetRowComponent
                field="Company"
                cells={roles.map((role) => (
                    <InputComponent value={role.company} onChange={() => {}} />
                ))}
            />
            <BudgetRowComponent
                field="Level"
                cells={roles.map((role) => (
                    <InputComponent value={role.level} onChange={() => {}} />
                ))}
            />
            <BudgetRowComponent
                field="Start Age"
                cells={roles.map((role) => (
                    <p key={role.startAge}>{role.startAge}</p>
                ))}
            />
            <BudgetRowComponent
                field="End Age"
                cells={roles.map((role) => (
                    <p key={role.endAge}>{role.endAge}</p>
                ))}
            />
            <BudgetRowComponent
                field="Estimated Years at Level"
                cells={roles.map((role) => (
                    <InputComponent
                        value={role.estimatedYearsSpentInPosition.toString()}
                        onChange={() => {}}
                    />
                ))}
            />
            <BudgetRowComponent
                field="State"
                cells={roles.map((role) => (
                    <InputComponent value={role.state} onChange={() => {}} />
                ))}
            />
        </BudgetSectionComponent>
    );
}

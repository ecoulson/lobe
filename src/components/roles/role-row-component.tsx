import { BudgetRowComponent } from '../budget/budget-row-component';
import { BudgetSectionComponent } from '../budget/budget-section-component';
import { RoleRowComponentProps } from './role-row-component-props';

export function RoleRowComponent({ roleList: roles }: RoleRowComponentProps) {
    return (
        <BudgetSectionComponent heading="Role">
            <BudgetRowComponent
                field="Company"
                cells={roles.map((role) => (
                    <p key={role.company}>{role.company}</p>
                ))}
            />
            <BudgetRowComponent
                field="Level"
                cells={roles.map((role) => (
                    <p key={role.level}>{role.level}</p>
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
                    <p key={role.estimatedYearsSpentInPosition}>
                        {role.estimatedYearsSpentInPosition}
                    </p>
                ))}
            />
            <BudgetRowComponent
                field="State"
                cells={roles.map((role) => (
                    <p key={role.state}>{role.state}</p>
                ))}
            />
        </BudgetSectionComponent>
    );
}

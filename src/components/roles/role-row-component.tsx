import { BudgetRowComponent } from '../budgets/budget-row-component';
import { BudgetSectionComponent } from '../budgets/budget-section-component';
import { InputComponent } from '../bases/input-component';
import { RoleRowComponentProps } from './role-row-component-props';
import { Role } from '../../models/roles/role';

export function RoleRowComponent({ roleList, updateRole }: RoleRowComponentProps) {
    return (
        <BudgetSectionComponent heading="Role">
            <BudgetRowComponent
                field="Company"
                cells={roleList.map((role) => (
                    <InputComponent
                        value={role.company}
                        onChange={(company) =>
                            updateRole(
                                new Role({
                                    ...role,
                                    company,
                                })
                            )
                        }
                    />
                ))}
            />
            <BudgetRowComponent
                field="Level"
                cells={roleList.map((role) => (
                    <InputComponent
                        value={role.level}
                        onChange={(level) =>
                            updateRole(
                                new Role({
                                    ...role,
                                    level,
                                })
                            )
                        }
                    />
                ))}
            />
            <BudgetRowComponent
                field="State"
                cells={roleList.map((role) => (
                    <InputComponent
                        value={role.state}
                        onChange={(state) =>
                            updateRole(
                                new Role({
                                    ...role,
                                    state,
                                })
                            )
                        }
                    />
                ))}
            />
            <BudgetRowComponent
                field="Estimated Years at Level"
                cells={roleList.map((role) => (
                    <InputComponent
                        value={
                            isNaN(role.estimatedYearsSpentInPosition)
                                ? ''
                                : role.estimatedYearsSpentInPosition.toFixed(0)
                        }
                        onChange={(estimatedYearsSpentInPosition) =>
                            updateRole(
                                new Role({
                                    ...role,
                                    estimatedYearsSpentInPosition: parseInt(
                                        estimatedYearsSpentInPosition
                                    ),
                                })
                            )
                        }
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

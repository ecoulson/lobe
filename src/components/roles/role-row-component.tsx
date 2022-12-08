import { BudgetRowComponent } from '../budgets/budget-row-component';
import { BudgetSectionComponent } from '../budgets/budget-section-component';
import { InputComponent } from '../bases/input-component';
import { RoleRowComponentProps } from './role-row-component-props';
import { Role } from '../../models/roles/role';
import { NumberInputComponent } from '../bases/number-input-component';
import { MoneyInputComponent } from '../funds/money-input-component';
import { PercentageInputComponent } from '../statistics/percentage-input-component';

export function RoleRowComponent({ roleList, updateRole }: RoleRowComponentProps) {
    function handleRoleChange<K extends keyof Role>(role: Role, key: K) {
        return (value: Role[K]) => {
            role[key] = value;
            updateRole(role);
        };
    }

    return (
        <BudgetSectionComponent heading="Role">
            <BudgetRowComponent
                field="Company"
                cells={roleList.map((role) => (
                    <InputComponent
                        placeholder="Google"
                        value={role.company}
                        onChange={handleRoleChange(role, 'company')}
                    />
                ))}
            />
            <BudgetRowComponent
                field="Level"
                cells={roleList.map((role) => (
                    <InputComponent
                        placeholder="L3"
                        value={role.level}
                        onChange={handleRoleChange(role, 'level')}
                    />
                ))}
            />
            <BudgetRowComponent
                field="State"
                cells={roleList.map((role) => (
                    <InputComponent
                        placeholder="WA"
                        value={role.state}
                        onChange={handleRoleChange(role, 'state')}
                    />
                ))}
            />
            <BudgetRowComponent
                field="Estimated Years at Level"
                cells={roleList.map((role) => (
                    <NumberInputComponent
                        value={role.estimatedYearsSpentInPosition}
                        displayPrecision={0}
                        onChange={(estimatedYearsSpentInPosition) =>
                            handleRoleChange(
                                role,
                                'estimatedYearsSpentInPosition'
                            )(estimatedYearsSpentInPosition)
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
            <BudgetRowComponent
                field="Total 401k Contributions"
                cells={roleList.map((role) => (
                    <MoneyInputComponent
                        money={role.total401KContributions}
                        onChange={(total401kContributions) =>
                            handleRoleChange(role, 'total401KContributions')(total401kContributions)
                        }
                    />
                ))}
            />
            <BudgetRowComponent
                field="401k Matching Percentage"
                cells={roleList.map((role) => (
                    <PercentageInputComponent
                        percentage={role.matching401kPercentage}
                        onChange={(matching401kPercentage) =>
                            handleRoleChange(role, 'matching401kPercentage')(matching401kPercentage)
                        }
                    />
                ))}
            />
            <BudgetRowComponent
                field="Sign On Bonus"
                cells={roleList.map((role) => (
                    <MoneyInputComponent
                        money={role.signOnBonus}
                        onChange={(signOnBonus) =>
                            handleRoleChange(role, 'signOnBonus')(signOnBonus)
                        }
                    />
                ))}
            />
        </BudgetSectionComponent>
    );
}

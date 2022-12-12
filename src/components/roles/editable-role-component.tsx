import { inject } from '../../clients/dependency-injection/inject';
import { Role } from '../../models/roles/role';
import { InputComponent } from '../bases/input-component';
import { NumberInputComponent } from '../bases/number-input-component';
import { CardComponent } from '../card/card-component';
import { DataComponent } from '../data/data-component';
import { MoneyInputComponent } from '../funds/money-input-component';
import { GridComponent } from '../grid/grid-component';
import { PercentageInputComponent } from '../percentages/percentage-input-component';
import { EditableRoleComponentProps } from './editable-role-component-props';

export const EditableRoleComponent = inject<EditableRoleComponentProps, 'roleController'>(
    {
        roleController: 'RoleOverviewController',
    },
    ({ role, onEdit, roleController, previousRole }: EditableRoleComponentProps) => {
        function updateRole<K extends keyof Role>(key: K, value: Role[K]) {
            role[key] = value;
            onEdit(roleController.updateRole(role, previousRole));
        }

        function renderHeader() {
            return (
                <div className="flex flex-col">
                    <p>
                        {role.company} {role.level}
                    </p>
                    <p className="font-normal italic">
                        {role.state} ({role.startYear} - {role.endYear})
                    </p>
                </div>
            );
        }

        return (
            <CardComponent title={renderHeader()}>
                <div className="flex w-full">
                    <img className="w-16 h-16" alt="Google logo" src="company.png" />
                    <GridComponent columns={4}>
                        <DataComponent
                            label="Company"
                            data={
                                <InputComponent
                                    value={role.company}
                                    onChange={(company) => updateRole('company', company)}
                                />
                            }
                        />
                        <DataComponent
                            label="Level"
                            data={
                                <InputComponent
                                    value={role.level}
                                    onChange={(level) => updateRole('level', level)}
                                />
                            }
                        />
                        <DataComponent
                            label="State"
                            data={
                                <InputComponent
                                    value={role.state}
                                    onChange={(state) => updateRole('state', state)}
                                />
                            }
                        />
                        <DataComponent
                            label="Years In Position"
                            data={
                                <NumberInputComponent
                                    value={role.estimatedYearsSpentInPosition}
                                    displayPrecision={0}
                                    onChange={(estimatedYearsSpentInPosition) =>
                                        updateRole(
                                            'estimatedYearsSpentInPosition',
                                            estimatedYearsSpentInPosition
                                        )
                                    }
                                />
                            }
                        />
                        <DataComponent
                            label="Salary"
                            data={
                                <MoneyInputComponent
                                    money={role.baseSalary}
                                    onChange={(baseSalary) => updateRole('baseSalary', baseSalary)}
                                />
                            }
                        />
                        <DataComponent
                            label="Sign On Bonus"
                            data={
                                <MoneyInputComponent
                                    money={role.signOnBonus}
                                    onChange={(signOnBonus) =>
                                        updateRole('signOnBonus', signOnBonus)
                                    }
                                />
                            }
                        />
                        <DataComponent
                            label="Equity"
                            data={
                                <MoneyInputComponent
                                    money={role.equity}
                                    onChange={(equity) => updateRole('equity', equity)}
                                />
                            }
                        />
                        <DataComponent
                            label="Vesting Schedule"
                            data={
                                <InputComponent
                                    value={''}
                                    onChange={() => updateRole('vestingSchedule', [])}
                                />
                            }
                        />
                        <DataComponent
                            label="Max 401K Contributions"
                            data={
                                <MoneyInputComponent
                                    money={role.maxMatched401KContributions}
                                    onChange={(maxMatched401KContributions) =>
                                        updateRole(
                                            'maxMatched401KContributions',
                                            maxMatched401KContributions
                                        )
                                    }
                                />
                            }
                        />
                        <DataComponent
                            label="401K Contribution Matching"
                            data={
                                <PercentageInputComponent
                                    percentage={role.matching401kPercentage}
                                    onChange={(matching401kPercentage) =>
                                        updateRole('matching401kPercentage', matching401kPercentage)
                                    }
                                />
                            }
                        />
                    </GridComponent>
                </div>
            </CardComponent>
        );
    }
);

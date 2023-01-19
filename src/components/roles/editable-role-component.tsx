import { Role } from '../../models/roles/role';
import { ButtonComponent } from '../bases/button-component';
import { FileInputComponent } from '../bases/file-input-component';
import { InfoComponent } from '../bases/info-component';
import { InputComponent } from '../bases/input-component';
import { NumberInputComponent } from '../bases/number-input-component';
import { PercentageInputComponent } from '../bases/percentage-input-component';
import { CardComponent } from '../card/card-component';
import { DataComponent } from '../data/data-component';
import { MoneyInputComponent } from '../funds/money-input-component';
import { VestingScheduleInputComponent } from '../vesting-schedule/vesting-schedule-input-component';
import { EditableRoleComponentProps } from './editable-role-component-props';

export function EditableRoleComponent({ role, onEdit, onRemove }: EditableRoleComponentProps) {
    function updateRole<K extends keyof Role>(key: K, value: Role[K]) {
        role[key] = value;
        onEdit(role);
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

    function handleCompanyLogoUpload(files: FileList | null) {
        if (files) {
            const reader = new FileReader();
            reader.addEventListener('load', () => {
                if (reader.result) {
                    updateRole('companyLogo', reader.result.toString());
                }
            });
            reader.readAsDataURL(files[0]);
        }
    }

    return (
        <CardComponent title={renderHeader()}>
            <div className="flex flex-wrap sm:flex-nowrap gap-y-8 relative">
                <div className="flex flex-col gap-y-8">
                    <img className="w-16 h-16" alt="Default logo" src={role.companyLogo} />
                    <FileInputComponent
                        accept={['.jpg', '.png', '.jpeg']}
                        onChange={handleCompanyLogoUpload}
                    />
                </div>
                <div
                    className={`grid lg:grid-cols-4 md:grid-cols-3 gap-x-4 gap-y-4 sm:grid-cols-1 w-3/4`}
                >
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
                                displayPercision={0}
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
                                onChange={(signOnBonus) => updateRole('signOnBonus', signOnBonus)}
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
                        label="Bonus Target"
                        data={
                            <PercentageInputComponent
                                percentage={role.bonusTarget}
                                onChange={(bonusTarget) => updateRole('bonusTarget', bonusTarget)}
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
                    <div className="col-span-full">
                        <DataComponent
                            label={
                                <div className="flex gap-x-2">
                                    <InfoComponent
                                        popoverChild={
                                            'Vesting schedule is not currently used in the calculations'
                                        }
                                    />
                                    <span>Vesting Schedule</span>
                                </div>
                            }
                            data={
                                <>
                                    <VestingScheduleInputComponent
                                        vestingSchedule={role.vestingSchedule}
                                        onChange={(vestingSchedule) =>
                                            updateRole('vestingSchedule', vestingSchedule)
                                        }
                                    />
                                </>
                            }
                        />
                    </div>
                </div>
            </div>
            <div className="float-right">
                <ButtonComponent onClick={() => onRemove(role)}>Remove Role</ButtonComponent>
            </div>
        </CardComponent>
    );
}

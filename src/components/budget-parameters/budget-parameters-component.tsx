import { useEffect, useState } from 'react';
import { inject } from '../../clients/dependency-injection/inject';
import { BudgetParameters } from '../../models/budgets/budget-parameters';
import { NumberInputComponent } from '../bases/number-input-component';
import { MoneyInputComponent } from '../funds/money-input-component';
import { PercentageInputComponent } from '../statistics/percentage-input-component';
import { BudgetParametersComponentProps } from './budget-parameters-component-props';
import { BudgetParameterFieldComponent } from './budget-parameters-field-component';

export const BudgetParametersComponent = inject<
    BudgetParametersComponentProps,
    'budgetParametersController'
>(
    {
        budgetParametersController: 'BudgetParametersController',
    },
    ({ budgetParametersController }: BudgetParametersComponentProps) => {
        const [budgetParameters, setBudgetParameters] = useState(
            budgetParametersController.getParameters()
        );

        function updateBudgetParameters<K extends keyof BudgetParameters>(
            key: K,
            value: BudgetParameters[K]
        ) {
            budgetParameters[key] = value;
            setBudgetParameters(new BudgetParameters(budgetParameters));
        }

        useEffect(() => {
            budgetParametersController.updateParameters(budgetParameters);
        }, [budgetParameters, budgetParametersController]);

        return (
            <div>
                <h2>Budget Parameters</h2>
                <div className="flex flex-col">
                    <BudgetParameterFieldComponent label="Bonus Goal">
                        <PercentageInputComponent
                            percentage={budgetParameters.bonusGoal}
                            onChange={(bonusGoal) => updateBudgetParameters('bonusGoal', bonusGoal)}
                        />
                    </BudgetParameterFieldComponent>
                    <BudgetParameterFieldComponent label="Current Age">
                        <NumberInputComponent
                            value={budgetParameters.currentAge}
                            displayPrecision={0}
                            onChange={(value) => updateBudgetParameters('currentAge', value)}
                        />
                    </BudgetParameterFieldComponent>
                    <BudgetParameterFieldComponent label="Estimated Return Rate">
                        <PercentageInputComponent
                            percentage={budgetParameters.estimatedReturnRate}
                            onChange={(estimatedReturnRate) =>
                                updateBudgetParameters('estimatedReturnRate', estimatedReturnRate)
                            }
                        />
                    </BudgetParameterFieldComponent>
                    <BudgetParameterFieldComponent label="Initial Net Worth">
                        <MoneyInputComponent
                            money={budgetParameters.initialNetWorth}
                            onChange={(initialNetWorth) =>
                                updateBudgetParameters('initialNetWorth', initialNetWorth)
                            }
                        />
                    </BudgetParameterFieldComponent>
                    <BudgetParameterFieldComponent label="Target Percentage Of Income To Save">
                        <PercentageInputComponent
                            percentage={budgetParameters.targetPercentageOfIncomeToSave}
                            onChange={(targetPercentageOfIncomeToSave) =>
                                updateBudgetParameters(
                                    'targetPercentageOfIncomeToSave',
                                    targetPercentageOfIncomeToSave
                                )
                            }
                        />
                    </BudgetParameterFieldComponent>
                </div>
            </div>
        );
    }
);

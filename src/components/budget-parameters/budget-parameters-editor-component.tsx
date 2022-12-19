import { useState } from 'react';
import { inject } from '../../clients/dependency-injection/inject';
import { BudgetParameters } from '../../models/budgets/budget-parameters';
import { NumberInputComponent } from '../bases/number-input-component';
import { MoneyInputComponent } from '../funds/money-input-component';
import { PercentageInputComponent } from '../percentages/percentage-input-component';
import { BudgetParametersEditorComponentProps } from './budget-parameters-editor-component-props';
import { BudgetParameterFieldComponent } from './budget-parameters-field-component';

export const BudgetParametersEditorComponent = inject<
    BudgetParametersEditorComponentProps,
    'budgetParametersController'
>(
    {
        budgetParametersController: 'BudgetParametersController',
    },
    ({
        budgetParametersController,
        onBudgetParametersChange,
    }: BudgetParametersEditorComponentProps) => {
        const [budgetParameters, setBudgetParameters] = useState(
            budgetParametersController.getParameters()
        );

        function updateBudgetParameters<K extends keyof BudgetParameters>(
            key: K,
            value: BudgetParameters[K]
        ) {
            budgetParameters[key] = value;
            const updatedBudgetParameters =
                budgetParametersController.updateParameters(budgetParameters);
            setBudgetParameters(updatedBudgetParameters);
            onBudgetParametersChange(updatedBudgetParameters);
        }

        return (
            <div>
                <h2 className="py-4 font-bold text-xl text-accent">Budget Parameters</h2>
                <div className="flex flex-col gap-y-4">
                    <BudgetParameterFieldComponent label="Current Age">
                        <NumberInputComponent
                            value={budgetParameters.currentAge}
                            displayPercision={0}
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

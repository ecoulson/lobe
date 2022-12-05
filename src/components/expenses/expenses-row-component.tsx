import { Expenses } from '../../models/expenses/expenses';
import { BudgetRowComponent } from '../budgets/budget-row-component';
import { BudgetSectionComponent } from '../budgets/budget-section-component';
import { MoneyComponent } from '../funds/money-component';
import { MoneyInputComponent } from '../funds/money-input-component';
import { ExpensesRowComponentProps } from './expenses-row-component-props';

export function ExpensesRowComponent({ expensesList, updateExpenses }: ExpensesRowComponentProps) {
    return (
        <BudgetSectionComponent heading="Expenses">
            <BudgetRowComponent
                field="Debt Payments"
                cells={expensesList.map((expenses) => (
                    <MoneyInputComponent
                        money={expenses.debtPayments.totalSpent}
                        onChange={(totalSpent) =>
                            updateExpenses(
                                new Expenses({
                                    ...expenses,
                                    debtPayments: {
                                        ...expenses.debtPayments,
                                        totalSpent,
                                    },
                                })
                            )
                        }
                    />
                ))}
            />
            <BudgetRowComponent
                field="Entertainment"
                cells={expensesList.map((expenses) => (
                    <MoneyInputComponent
                        money={expenses.entertainment.totalSpent}
                        onChange={(totalSpent) =>
                            updateExpenses(
                                new Expenses({
                                    ...expenses,
                                    entertainment: {
                                        ...expenses.debtPayments,
                                        totalSpent,
                                    },
                                })
                            )
                        }
                    />
                ))}
            />
            <BudgetRowComponent
                field="Food"
                cells={expensesList.map((expenses) => (
                    <MoneyInputComponent
                        money={expenses.food.totalSpent}
                        onChange={(totalSpent) =>
                            updateExpenses(
                                new Expenses({
                                    ...expenses,
                                    food: {
                                        ...expenses.debtPayments,
                                        totalSpent,
                                    },
                                })
                            )
                        }
                    />
                ))}
            />
            <BudgetRowComponent
                field="Healthcare"
                cells={expensesList.map((expenses) => (
                    <MoneyInputComponent
                        money={expenses.healthcare.totalSpent}
                        onChange={(totalSpent) =>
                            updateExpenses(
                                new Expenses({
                                    ...expenses,
                                    healthcare: {
                                        ...expenses.debtPayments,
                                        totalSpent,
                                    },
                                })
                            )
                        }
                    />
                ))}
            />
            <BudgetRowComponent
                field="Housing"
                cells={expensesList.map((expenses) => (
                    <MoneyInputComponent
                        money={expenses.housing.totalSpent}
                        onChange={(totalSpent) =>
                            updateExpenses(
                                new Expenses({
                                    ...expenses,
                                    housing: {
                                        ...expenses.debtPayments,
                                        totalSpent,
                                    },
                                })
                            )
                        }
                    />
                ))}
            />
            <BudgetRowComponent
                field="Insurance"
                cells={expensesList.map((expenses) => (
                    <MoneyInputComponent
                        money={expenses.insurance.totalSpent}
                        onChange={(totalSpent) =>
                            updateExpenses(
                                new Expenses({
                                    ...expenses,
                                    insurance: {
                                        ...expenses.debtPayments,
                                        totalSpent,
                                    },
                                })
                            )
                        }
                    />
                ))}
            />
            <BudgetRowComponent
                field="Miscellaneous"
                cells={expensesList.map((expenses) => (
                    <MoneyInputComponent
                        money={expenses.miscellaneous.totalSpent}
                        onChange={(totalSpent) =>
                            updateExpenses(
                                new Expenses({
                                    ...expenses,
                                    miscellaneous: {
                                        ...expenses.debtPayments,
                                        totalSpent,
                                    },
                                })
                            )
                        }
                    />
                ))}
            />
            <BudgetRowComponent
                field="Personal"
                cells={expensesList.map((expenses) => (
                    <MoneyInputComponent
                        money={expenses.personal.totalSpent}
                        onChange={(totalSpent) =>
                            updateExpenses(
                                new Expenses({
                                    ...expenses,
                                    personal: {
                                        ...expenses.debtPayments,
                                        totalSpent,
                                    },
                                })
                            )
                        }
                    />
                ))}
            />
            <BudgetRowComponent
                field="Transportation"
                cells={expensesList.map((expenses) => (
                    <MoneyInputComponent
                        money={expenses.transportation.totalSpent}
                        onChange={(totalSpent) =>
                            updateExpenses(
                                new Expenses({
                                    ...expenses,
                                    transportation: {
                                        ...expenses.debtPayments,
                                        totalSpent,
                                    },
                                })
                            )
                        }
                    />
                ))}
            />
            <BudgetRowComponent
                field="Utilities"
                cells={expensesList.map((expenses) => (
                    <MoneyInputComponent
                        money={expenses.utilities.totalSpent}
                        onChange={(totalSpent) =>
                            updateExpenses(
                                new Expenses({
                                    ...expenses,
                                    utilities: {
                                        ...expenses.debtPayments,
                                        totalSpent,
                                    },
                                })
                            )
                        }
                    />
                ))}
            />
            <BudgetRowComponent
                field="Total Expenses"
                cells={expensesList.map((expenses) => (
                    <MoneyComponent money={expenses.totalExpenses} />
                ))}
            />
        </BudgetSectionComponent>
    );
}

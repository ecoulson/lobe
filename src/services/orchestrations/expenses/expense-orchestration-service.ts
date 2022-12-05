import { BudgetTable } from '../../../models/budget/budget-table';
import { ExpenseCategory } from '../../../models/expenses/expense-category';
import { Expenses } from '../../../models/expenses/expenses';
import { ExpensesService } from '../../foundations/expenses/expenses-service';
import { MoneyService } from '../../foundations/funds/money-service';

export class ExpenseOrchestrationService {
    private readonly expensesService: ExpensesService;
    private readonly moneyService: MoneyService;

    constructor(expensesService: ExpensesService, moneyService: MoneyService) {
        this.expensesService = expensesService;
        this.moneyService = moneyService;
    }

    addExpensesToBudgetTable(budgetTable: BudgetTable): Expenses {
        const expenses = new Expenses();
        budgetTable.expensesList.push(this.expensesService.createExpenses(expenses));
        return expenses;
    }

    updateExpensesInBudgetTable(budgetTable: BudgetTable, updatedExpenses: Expenses): Expenses {
        const expensesIndex = budgetTable.expensesList.findIndex(
            (expenses) => expenses.id === updatedExpenses.id
        );
        const totalExpenses =
            this.getCategoryTotalExpenseAmount(updatedExpenses.debtPayments) +
            this.getCategoryTotalExpenseAmount(updatedExpenses.entertainment) +
            this.getCategoryTotalExpenseAmount(updatedExpenses.food) +
            this.getCategoryTotalExpenseAmount(updatedExpenses.healthcare) +
            this.getCategoryTotalExpenseAmount(updatedExpenses.housing) +
            this.getCategoryTotalExpenseAmount(updatedExpenses.insurance) +
            this.getCategoryTotalExpenseAmount(updatedExpenses.miscellaneous) +
            this.getCategoryTotalExpenseAmount(updatedExpenses.personal) +
            this.getCategoryTotalExpenseAmount(updatedExpenses.transportation) +
            this.getCategoryTotalExpenseAmount(updatedExpenses.utilities);
        updatedExpenses.totalExpenses = this.moneyService.createMoney(totalExpenses);
        budgetTable.expensesList[expensesIndex] = updatedExpenses;
        return this.expensesService.updateExpenses(updatedExpenses);
    }

    private getCategoryTotalExpenseAmount(expenseCategory: ExpenseCategory) {
        return this.moneyService.getCurrencyAmount(expenseCategory.totalSpent);
    }
}

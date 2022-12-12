import { ExpenseCategory } from '../../../models/expenses/expense-category';
import { Expenses } from '../../../models/expenses/expenses';
import { Role } from '../../../models/roles/role';
import { ExpensesService } from '../../foundations/expenses/expenses-service';
import { MoneyService } from '../../foundations/funds/money-service';

export class ExpenseOrchestrationService {
    private readonly expensesService: ExpensesService;
    private readonly moneyService: MoneyService;

    constructor(expensesService: ExpensesService, moneyService: MoneyService) {
        this.expensesService = expensesService;
        this.moneyService = moneyService;
    }

    getExpensesByRole(role: Role) {
        return this.expensesService
            .listExpenses()
            .find((expenses) => role.id === expenses.roleId) as Expenses;
    }

    removeExpenses(expenses: Expenses) {
        return this.expensesService.removeExpenses(expenses);
    }

    createExpenses(role: Role): Expenses {
        const expenses = this.calculateExpenses();
        expenses.roleId = role.id;
        return this.expensesService.createExpenses(expenses);
    }

    updateExpenses(role: Role): Expenses {
        return this.expensesService.updateExpenses(
            this.calculateExpenses(this.getExpensesByRole(role))
        );
    }

    private calculateExpenses(expenses: Expenses = new Expenses()) {
        const totalExpenses =
            this.getCategoryTotalExpenseAmount(expenses.debtPayments) +
            this.getCategoryTotalExpenseAmount(expenses.entertainment) +
            this.getCategoryTotalExpenseAmount(expenses.food) +
            this.getCategoryTotalExpenseAmount(expenses.healthcare) +
            this.getCategoryTotalExpenseAmount(expenses.housing) +
            this.getCategoryTotalExpenseAmount(expenses.insurance) +
            this.getCategoryTotalExpenseAmount(expenses.miscellaneous) +
            this.getCategoryTotalExpenseAmount(expenses.personal) +
            this.getCategoryTotalExpenseAmount(expenses.transportation) +
            this.getCategoryTotalExpenseAmount(expenses.utilities);
        expenses.totalExpenses = this.moneyService.createMoney(totalExpenses);
        return expenses;
    }

    private getCategoryTotalExpenseAmount(expenseCategory: ExpenseCategory) {
        return this.moneyService.getCurrencyAmount(expenseCategory.totalSpent);
    }
}

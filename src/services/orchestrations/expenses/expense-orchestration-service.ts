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

    updateExpenses(expenses: Expenses): Expenses {
        return this.expensesService.updateExpenses(this.calculateExpenses(expenses));
    }

    updateExpensesByRole(role: Role): Expenses {
        return this.expensesService.updateExpenses(
            this.calculateExpenses(this.getExpensesByRole(role))
        );
    }

    private calculateExpenses(expenses: Expenses = new Expenses()) {
        const sortedCategories = [...expenses.categories];
        sortedCategories.sort((categoryA, categoryB) => {
            const totalSpentCategoryA = this.moneyService.getCurrencyAmount(categoryA.totalSpent);
            const totalSpentCategoryB = this.moneyService.getCurrencyAmount(categoryB.totalSpent);
            return totalSpentCategoryB - totalSpentCategoryA;
        });
        const totalExpenses = expenses.categories.reduce(
            (sum, category) => sum + this.moneyService.getCurrencyAmount(category.totalSpent),
            0
        );
        expenses.totalExpenses = this.moneyService.createMoney(totalExpenses);
        expenses.bottomCategory = sortedCategories[expenses.categories.length - 1].name;
        expenses.topCategory = sortedCategories[0].name;
        return expenses;
    }
}

import { Expenses } from '../../models/expenses/expenses';
import { Role } from '../../models/roles/role';
import { ExpenseOrchestrationService } from '../../services/orchestrations/expenses/expense-orchestration-service';

export class ExpensesController {
    private readonly expensesOrchestrationServie: ExpenseOrchestrationService;

    constructor(expensesOrchestrationService: ExpenseOrchestrationService) {
        this.expensesOrchestrationServie = expensesOrchestrationService;
    }

    getExpensesByRole(role: Role) {
        return this.expensesOrchestrationServie.getExpensesByRole(role);
    }

    updateExpenses(expenses: Expenses) {
        return this.expensesOrchestrationServie.updateExpenses(expenses);
    }
}

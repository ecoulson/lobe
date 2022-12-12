import { Income } from '../../../models/incomes/income';
import { IncomeService } from '../../foundations/incomes/income-service';
import { MoneyService } from '../../foundations/funds/money-service';
import { Tax } from '../../../models/taxes/tax';
import { BudgetParametersService } from '../../foundations/budgets/budget-parameters-service';
import { Role } from '../../../models/roles/role';
import { BudgetColumn } from '../../../models/budgets/budget-column';

export class IncomeOrchestrationService {
    private readonly incomeService: IncomeService;
    private readonly moneyService: MoneyService;
    private readonly budgetParametersService: BudgetParametersService;

    constructor(
        incomeService: IncomeService,
        moneyService: MoneyService,
        budgetParametersService: BudgetParametersService
    ) {
        this.incomeService = incomeService;
        this.budgetParametersService = budgetParametersService;
        this.moneyService = moneyService;
    }

    removeIncome(income: Income) {
        return this.incomeService.removeIncome(income);
    }

    createCalculatedIncome() {
        return this.incomeService.createIncome(this.calculateIncome());
    }

    updateIncome(budgetColumn: BudgetColumn, updatedIncome: Income, incomeTax: Tax, bonusTax: Tax) {
        return this.incomeService.updateIncome(
            this.calculateIncome(budgetColumn.role, updatedIncome, incomeTax, bonusTax)
        );
    }

    private calculateIncome(
        role: Role = new Role(),
        income: Income = new Income(),
        incomeTax: Tax = new Tax(),
        bonusTax: Tax = new Tax()
    ) {
        const budgetParameters = this.budgetParametersService.getParameters();

        const baseSalary = this.moneyService.getCurrencyAmount(income.baseSalary);
        if (isNaN(baseSalary)) {
            return new Income({
                id: income.id,
                baseSalary: income.baseSalary,
            });
        }
        const yearly401kContributions = this.moneyService.getCurrencyAmount(
            role.maxMatched401KContributions
        );
        const preTaxSalary = baseSalary - yearly401kContributions;
        const postTaxSalary = preTaxSalary * (1 - incomeTax.rate.value / 100);
        const bonus =
            baseSalary * (budgetParameters.bonusGoal.value / 100) * (1 - bonusTax.rate.value / 100);
        const totalIncome = bonus + postTaxSalary;

        income.salaryPreTax = this.moneyService.createMoney(preTaxSalary);
        income.salaryPostTax = this.moneyService.createMoney(postTaxSalary);
        income.bonus = this.moneyService.createMoney(bonus);
        income.totalIncome = this.moneyService.createMoney(totalIncome);

        return income;
    }
}

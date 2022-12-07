import { Income } from '../../../models/incomes/income';
import { IncomeService } from '../../foundations/incomes/income-service';
import { MoneyService } from '../../foundations/funds/money-service';
import { Tax } from '../../../models/taxes/tax';
import { BudgetParametersService } from '../../foundations/budgets/budget-parameters-service';

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

    createCalculatedIncome() {
        return this.incomeService.createIncome(this.calculateIncome());
    }

    updateIncome(updatedIncome: Income, incomeTax: Tax) {
        return this.incomeService.updateIncome(this.calculateIncome(updatedIncome, incomeTax));
    }

    private calculateIncome(income: Income = new Income(), tax: Tax = new Tax()) {
        const budgetParameters = this.budgetParametersService.getParameters();

        const baseSalary = this.moneyService.getCurrencyAmount(income.baseSalary);
        const yearly401kContributions = this.moneyService.getCurrencyAmount(
            budgetParameters.yearly401kContributions
        );
        const preTaxSalary = baseSalary - yearly401kContributions;
        const postTaxSalary = preTaxSalary * (1 - tax.rate.value / 100);
        const bonus = baseSalary * (budgetParameters.bonusGoal.value / 100);
        const totalIncome = bonus + postTaxSalary;

        income.salaryPreTax = this.moneyService.createMoney(preTaxSalary);
        income.salaryPostTax = this.moneyService.createMoney(postTaxSalary);
        income.bonus = this.moneyService.createMoney(bonus);
        income.totalIncome = this.moneyService.createMoney(totalIncome);

        return income;
    }
}

import { Income } from '../../../models/incomes/income';
import { IncomeService } from '../../foundations/incomes/income-service';
import { MoneyService } from '../../foundations/funds/money-service';
import { Tax } from '../../../models/taxes/tax';
import { Role } from '../../../models/roles/role';

export class IncomeOrchestrationService {
    private readonly incomeService: IncomeService;
    private readonly moneyService: MoneyService;

    constructor(incomeService: IncomeService, moneyService: MoneyService) {
        this.incomeService = incomeService;
        this.moneyService = moneyService;
    }

    removeIncome(income: Income) {
        return this.incomeService.removeIncome(income);
    }

    getIncomeByRole(role: Role) {
        return this.incomeService
            .listIncomes()
            .find((income) => income.roleId === role.id) as Income;
    }

    createIncome(role: Role, incomeTax: Tax, bonusTax: Tax) {
        const income = this.calculateIncome(role, incomeTax, bonusTax);
        income.roleId = role.id;
        return this.incomeService.createIncome(income);
    }

    updateIncome(role: Role, incomeTax: Tax, bonusTax: Tax) {
        return this.incomeService.updateIncome(
            this.calculateIncome(role, incomeTax, bonusTax, this.getIncomeByRole(role))
        );
    }

    private calculateIncome(
        role: Role,
        incomeTax: Tax,
        bonusTax: Tax,
        income: Income = new Income()
    ) {
        const baseSalary = this.moneyService.getCurrencyAmount(role.baseSalary);
        if (isNaN(baseSalary)) {
            return new Income({
                id: income.id,
                baseSalary: role.baseSalary,
            });
        }
        const yearly401kContributions = this.moneyService.getCurrencyAmount(
            role.maxMatched401KContributions
        );
        const preTaxSalary = baseSalary - yearly401kContributions;
        const postTaxSalary = preTaxSalary * (1 - incomeTax.rate.value / 100);
        const bonus = baseSalary * (role.bonusTarget.value / 100) * (1 - bonusTax.rate.value / 100);
        const totalIncome = bonus + postTaxSalary;

        income.baseSalary = this.moneyService.createMoney(baseSalary);
        income.salaryPreTax = this.moneyService.createMoney(preTaxSalary);
        income.salaryPostTax = this.moneyService.createMoney(postTaxSalary);
        income.bonus = this.moneyService.createMoney(bonus);
        income.totalIncome = this.moneyService.createMoney(totalIncome);

        return income;
    }
}

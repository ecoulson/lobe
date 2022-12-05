import { BudgetParametersBroker } from '../../../brokers/budget-parameters/budget-parameters-broker';
import { BudgetTable } from '../../../models/budget/budget-table';
import { Income } from '../../../models/incomes/income';
import { IncomeService } from '../../foundations/incomes/income-service';
import { MoneyService } from '../../foundations/funds/money-service';
import { Tax } from '../../../models/taxes/tax';

export class IncomeOrchestrationService {
    private readonly incomeService: IncomeService;
    private readonly moneyService: MoneyService;
    private readonly budgetParametersBroker: BudgetParametersBroker;

    constructor(
        incomeService: IncomeService,
        moneyService: MoneyService,
        budgetParametersBroker: BudgetParametersBroker
    ) {
        this.incomeService = incomeService;
        this.budgetParametersBroker = budgetParametersBroker;
        this.moneyService = moneyService;
    }

    addIncomeToBudgetTable(budgetTable: BudgetTable) {
        const income = this.incomeService.createIncome(new Income());
        budgetTable.incomeList.push(income);
        return income;
    }

    updateIncomeInBudgetTable(budgetTable: BudgetTable, updatedIncome: Income, tax: Tax) {
        const budgetParameters = this.budgetParametersBroker.retrieveBudgetParameters();
        const incomeIndex = budgetTable.incomeList.findIndex(
            (income) => income.id === updatedIncome.id
        );

        const baseSalary = this.moneyService.getCurrencyAmount(updatedIncome.baseSalary);
        const yearly401kContributions = this.moneyService.getCurrencyAmount(
            budgetParameters.yearly401kContributions
        );
        const preTaxSalary = baseSalary - yearly401kContributions;
        const postTaxSalary = preTaxSalary * (1 - tax.rate.value / 100);
        const bonus = baseSalary * (budgetParameters.bonusGoal.value / 100);
        const totalIncome = bonus + postTaxSalary;

        updatedIncome.salaryPreTax = this.moneyService.createMoney(preTaxSalary);
        updatedIncome.salaryPostTax = this.moneyService.createMoney(postTaxSalary);
        updatedIncome.bonus = this.moneyService.createMoney(bonus);
        updatedIncome.totalIncome = this.moneyService.createMoney(totalIncome);
        this.incomeService.updateIncome(updatedIncome);

        budgetTable.incomeList[incomeIndex] = updatedIncome;
        return updatedIncome;
    }
}

import { BudgetColumn } from '../../../models/budgets/budget-column';
import { Role } from '../../../models/roles/role';
import { Savings } from '../../../models/savings/savings';
import { Tax } from '../../../models/taxes/tax';
import { WealthProjection } from '../../../models/wealth-projections/wealth-projection';
import { BudgetParametersService } from '../../foundations/budgets/budget-parameters-service';
import { MoneyService } from '../../foundations/funds/money-service';
import { WealthProjectionService } from '../../foundations/wealth-projections/wealth-projection-service';

export class WealthProjectionOrchestrationService {
    private readonly wealthProjectionService: WealthProjectionService;
    private readonly budgetParametersService: BudgetParametersService;
    private readonly moneyService: MoneyService;

    constructor(
        wealthProjectionService: WealthProjectionService,
        budgetParametersService: BudgetParametersService,
        moneyService: MoneyService
    ) {
        this.wealthProjectionService = wealthProjectionService;
        this.budgetParametersService = budgetParametersService;
        this.moneyService = moneyService;
    }

    createCalculatedWealthProjection(
        budgetColumn: BudgetColumn,
        wealthProjectionRow: WealthProjection[],
        capitalGainsTax: Tax
    ) {
        return this.wealthProjectionService.createWealthProjection(
            this.calculateWealthProjection(
                budgetColumn.role,
                budgetColumn.savings,
                capitalGainsTax,
                wealthProjectionRow[wealthProjectionRow.length - 1]
            )
        );
    }

    private calculateWealthProjection(
        role: Role,
        savings: Savings,
        capitalGainsTax: Tax,
        previousProjection?: WealthProjection,
        wealthProjection: WealthProjection = new WealthProjection()
    ) {
        const budgetParameters = this.budgetParametersService.getParameters();
        let initialNetWorth = this.moneyService.getCurrencyAmount(budgetParameters.initialNetWorth);
        if (previousProjection) {
            initialNetWorth = this.moneyService.getCurrencyAmount(
                previousProjection.expectedNetWorth
            );
        }
        const returnRate = budgetParameters.estimatedReturnRate.value / 100;
        const totalSaved = this.moneyService.getCurrencyAmount(savings.totalSaved);
        const principalReturn =
            initialNetWorth * Math.pow(1 + returnRate, role.estimatedYearsSpentInPosition);
        const savingsReturn =
            ((totalSaved * (Math.pow(1 + returnRate, role.estimatedYearsSpentInPosition) - 1)) /
                returnRate) *
            (1 + returnRate);
        const expetedNetWorth = principalReturn + savingsReturn;
        const expectedNetWorthAfterCapitalGains =
            expetedNetWorth * (1 - capitalGainsTax.rate.value / 100);

        wealthProjection.expectedNetWorth = this.moneyService.createMoney(expetedNetWorth);
        wealthProjection.expectedNetWorthAfterCapitalGains = this.moneyService.createMoney(
            expectedNetWorthAfterCapitalGains
        );
        return wealthProjection;
    }

    updateWealthProjection(
        budgetColumn: BudgetColumn,
        capitalGainsTax: Tax,
        wealthProjectionRow: WealthProjection[]
    ) {
        return this.wealthProjectionService.updateWealthProjection(
            this.calculateWealthProjection(
                budgetColumn.role,
                budgetColumn.savings,
                capitalGainsTax,
                wealthProjectionRow[budgetColumn.index - 1],
                budgetColumn.wealthProjection
            )
        );
    }
}

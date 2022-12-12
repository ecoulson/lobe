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

    removeWealthProjection(wealthProjection: WealthProjection) {
        return this.wealthProjectionService.removeWealthProjection(wealthProjection);
    }

    createCalculatedWealthProjection(
        role: Role,
        savings: Savings,
        capitalGainsTax: Tax,
        bonusTax: Tax,
        previousWealthProjection?: WealthProjection
    ) {
        return this.wealthProjectionService.createWealthProjection(
            this.calculateWealthProjection(
                role,
                savings,
                capitalGainsTax,
                bonusTax,
                previousWealthProjection
            )
        );
    }

    private calculateWealthProjection(
        role: Role,
        savings: Savings,
        capitalGainsTax: Tax,
        bonusTax: Tax,
        previousProjection?: WealthProjection,
        wealthProjection: WealthProjection = new WealthProjection()
    ) {
        if (isNaN(role.estimatedYearsSpentInPosition)) {
            return new WealthProjection({
                id: wealthProjection.id,
            });
        }
        const budgetParameters = this.budgetParametersService.getParameters();
        let principal = this.moneyService.getCurrencyAmount(budgetParameters.initialNetWorth);
        if (previousProjection) {
            principal = this.moneyService.getCurrencyAmount(previousProjection.expectedNetWorth);
        }
        principal +=
            this.moneyService.getCurrencyAmount(role.signOnBonus) * (1 - bonusTax.rate.value / 100);
        const returnRate = budgetParameters.estimatedReturnRate.value / 100;
        const totalSaved = this.moneyService.getCurrencyAmount(savings.totalSaved);
        const principalReturn =
            principal * Math.pow(1 + returnRate, role.estimatedYearsSpentInPosition);
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
        role: Role,
        savings: Savings,
        capitalGainsTax: Tax,
        bonusTax: Tax,
        wealthProjection: WealthProjection,
        previousWealthProjection?: WealthProjection
    ) {
        return this.wealthProjectionService.updateWealthProjection(
            this.calculateWealthProjection(
                role,
                savings,
                capitalGainsTax,
                bonusTax,
                previousWealthProjection,
                wealthProjection
            )
        );
    }
}

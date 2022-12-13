import { Role } from '../../../models/roles/role';
import { Savings } from '../../../models/savings/savings';
import { Tax } from '../../../models/taxes/tax';
import { WealthProjection } from '../../../models/wealth-projections/wealth-projection';
import { TemporalWealthProjection } from '../../../models/wealth-projections/yearly-wealth-projection';
import { BudgetParametersService } from '../../foundations/budgets/budget-parameters-service';
import { MoneyService } from '../../foundations/funds/money-service';
import { SavingsService } from '../../foundations/savings/savings-service';

export class WealthProjectionOrchestrationService {
    private readonly savingsService: SavingsService;
    private readonly budgetParametersService: BudgetParametersService;
    private readonly moneyService: MoneyService;

    constructor(
        savingsService: SavingsService,
        budgetParametersService: BudgetParametersService,
        moneyService: MoneyService
    ) {
        this.savingsService = savingsService;
        this.budgetParametersService = budgetParametersService;
        this.moneyService = moneyService;
    }

    calculateWealthProjections(roles: Role[]) {
        if (roles.length === 0) {
            return [];
        }
        roles = [...roles].reverse();
        const projections: TemporalWealthProjection[] = [];
        roles.forEach((role, i) =>
            projections.push(
                this.calculateWealthProjectionForRole(
                    role,
                    new Tax(),
                    new Tax(),
                    projections[i - 1]
                )
            )
        );
        projections.unshift(
            new TemporalWealthProjection({
                estimatedNetWorth: this.moneyService.getCurrencyAmount(
                    this.budgetParametersService.getParameters().initialNetWorth
                ),
                date: new Date(`1/1/${roles[0].startYear}`),
            })
        );
        return projections;
    }

    getSavingsByRole(role: Role) {
        return this.savingsService
            .listSavings()
            .find((saving) => saving.roleId === role.id) as Savings;
    }

    private calculateWealthProjectionForRole(
        role: Role,
        capitalGainsTax: Tax,
        bonusTax: Tax,
        previousProjection?: TemporalWealthProjection
    ) {
        const wealthProjection = new TemporalWealthProjection();
        const savings = this.getSavingsByRole(role);
        if (isNaN(role.estimatedYearsSpentInPosition)) {
            return wealthProjection;
        }
        const budgetParameters = this.budgetParametersService.getParameters();
        let principal = this.moneyService.getCurrencyAmount(budgetParameters.initialNetWorth);
        if (previousProjection) {
            principal = previousProjection.estimatedNetWorth;
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

        wealthProjection.date = new Date(`1/1/${role.endYear}`);
        wealthProjection.estimatedNetWorth = expetedNetWorth;
        wealthProjection.estimatedNetWorthAfterTaxes = expectedNetWorthAfterCapitalGains;
        return wealthProjection;
    }
}

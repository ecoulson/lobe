import { Role } from '../../../models/roles/role';
import { Savings } from '../../../models/savings/savings';
import { Percentage } from '../../../models/statistics/percentage';
import { Tax } from '../../../models/taxes/tax';
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
        const capitalGainsTax = new Tax({
            rate: new Percentage({
                value: 15,
            }),
        });
        const bonusTax = new Tax({
            rate: new Percentage({
                value: 40,
            }),
        });
        if (roles.length === 0) {
            return [];
        }
        roles = [...roles].reverse();
        const initialNetWorth = this.moneyService.getCurrencyAmount(
            this.budgetParametersService.getParameters().initialNetWorth
        );
        const projections: TemporalWealthProjection[] = [
            new TemporalWealthProjection({
                estimatedNetWorth: initialNetWorth,
                estimatedNetWorthAfterTaxes:
                    initialNetWorth * (1 - capitalGainsTax.rate.value / 100),
                date: new Date(`1/1/${roles[0].startYear}`),
            }),
        ];
        let lastRoleEndYear = 0;
        roles.forEach((role) => {
            this.calculateWealthProjectionForRole(
                role,
                projections,
                capitalGainsTax,
                bonusTax,
                lastRoleEndYear
            );
            lastRoleEndYear += role.estimatedYearsSpentInPosition;
        });
        return projections;
    }

    private calculateWealthProjectionForRole(
        role: Role,
        projections: TemporalWealthProjection[],
        capitalGainsTax: Tax,
        bonusTax: Tax,
        lastRoleEndYear: number
    ) {
        for (let year = 1; year <= role.estimatedYearsSpentInPosition; year++) {
            projections.push(
                this.calculateWealthProjectionForYear(
                    role,
                    year,
                    capitalGainsTax,
                    bonusTax,
                    projections[lastRoleEndYear]
                )
            );
        }
    }

    getSavingsByRole(role: Role) {
        return this.savingsService
            .listSavings()
            .find((saving) => saving.roleId === role.id) as Savings;
    }

    private calculateWealthProjectionForYear(
        role: Role,
        year: number,
        capitalGainsTax: Tax,
        bonusTax: Tax,
        previousProjection?: TemporalWealthProjection
    ) {
        const wealthProjection = new TemporalWealthProjection();
        const savings = this.getSavingsByRole(role);
        if (isNaN(year)) {
            return wealthProjection;
        }
        const budgetParameters = this.budgetParametersService.getParameters();
        let principal = this.moneyService.getCurrencyAmount(budgetParameters.initialNetWorth);
        if (previousProjection) {
            principal = previousProjection.estimatedNetWorth;
        }
        if (year === 1) {
            principal +=
                this.moneyService.getCurrencyAmount(role.signOnBonus) *
                (1 - bonusTax.rate.value / 100);
        }
        const returnRate = budgetParameters.estimatedReturnRate.value / 100;
        wealthProjection.date = new Date(`1/1/${role.startYear + year}`);

        const totalSaved = this.moneyService.getCurrencyAmount(savings.totalSaved);
        let principalReturn = principal * Math.pow(1 + returnRate, year);
        let savingsReturn =
            ((totalSaved * (Math.pow(1 + returnRate, year) - 1)) / returnRate) * (1 + returnRate);
        if (principalReturn < 0) {
            principalReturn = principal;
        }
        if (savings.totalSaved.sign === '-') {
            savingsReturn = -totalSaved;
        }
        const expectedNetWorth = principalReturn + savingsReturn;
        let expectedNetWorthAfterCapitalGains =
            expectedNetWorth * (1 - capitalGainsTax.rate.value / 100);
        if (expectedNetWorth < 0) {
            expectedNetWorthAfterCapitalGains = expectedNetWorth;
        }

        wealthProjection.estimatedNetWorth = expectedNetWorth;
        wealthProjection.estimatedNetWorthAfterTaxes = expectedNetWorthAfterCapitalGains;
        return wealthProjection;
    }
}

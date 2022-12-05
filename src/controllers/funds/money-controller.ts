import { Money } from '../../models/funds/money';
import { MoneyService } from '../../services/foundations/funds/money-service';

export class MoneyController {
    private readonly moneyService: MoneyService;

    constructor(moneyService: MoneyService) {
        this.moneyService = moneyService;
    }

    formatForEditing(money: Money): Money {
        return new Money({
            ...money,
            value: this.moneyService.getCurrencyAmount(money).toFixed(2),
        });
    }

    formatForDisplay(money: Money): Money {
        return this.moneyService.createMoney(parseFloat(money.value));
    }
}

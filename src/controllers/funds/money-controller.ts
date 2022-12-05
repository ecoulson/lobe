import { Money } from '../../models/funds/money';
import { MoneyService } from '../../services/foundations/funds/money-service';

export class MoneyController {
    private readonly moneyService: MoneyService;

    constructor(moneyService: MoneyService) {
        this.moneyService = moneyService;
    }

    format(value: number): Money {
        return this.moneyService.createMoney(value);
    }
}

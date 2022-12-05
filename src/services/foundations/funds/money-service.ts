import { Money } from '../../../models/funds/money';

export class MoneyService {
    createMoney(amount: number): Money {
        const formattedMoney = new Money();
        const formatter = new Intl.NumberFormat('en-us', {
            style: 'currency',
            currency: 'USD',
        });
        formattedMoney.value = formatter.format(amount).replace('$', '');
        return formattedMoney;
    }

    getDollarAmount(money: Money): number {
        // parsing assuming USD
        const valueNoCommas = money.value.replaceAll(',', '');
        return parseFloat(valueNoCommas);
    }
}

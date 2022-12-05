import { MoneyController } from '../../controllers/funds/money-controller';
import { Money } from '../../models/funds/money';

export interface MoneyInputComponentProps {
    money: Money;
    moneyController: MoneyController;
    onChange: (money: Money) => void;
}

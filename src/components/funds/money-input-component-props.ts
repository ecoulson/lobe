import { Money } from '../../models/funds/money';

export interface MoneyInputComponentProps {
    money: Money;
    onChange: (value: Money) => void;
}

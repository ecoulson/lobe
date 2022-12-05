import { Money } from '../../models/money/money';

export interface MoneyInputComponentProps {
    money: Money;
    onChange: (value: Money) => void;
}

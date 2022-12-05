import { Money } from '../../models/funds/money';
import { InputComponent } from '../bases/input-component';
import { MoneyInputComponentProps } from './money-input-component-props';

export function MoneyInputComponent({ onChange, money }: MoneyInputComponentProps) {
    return (
        <>
            <span>{money.currency}</span>
            <InputComponent
                value={money.value}
                onChange={(amount) =>
                    onChange(
                        new Money({
                            currency: money.currency,
                            value: amount,
                        })
                    )
                }
            />
        </>
    );
}

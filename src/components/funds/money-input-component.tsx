import { inject } from '../../clients/dependency-injection/inject';
import { Money } from '../../models/funds/money';
import { InputComponent } from '../bases/input-component';
import { MoneyInputComponentProps } from './money-input-component-props';

export const MoneyInputComponent = inject<MoneyInputComponentProps, 'moneyController'>(
    {
        moneyController: 'MoneyController',
    },
    ({ onChange, money, moneyController }: MoneyInputComponentProps) => {
        return (
            <>
                <span>{money.currency}</span>
                <InputComponent
                    placeholder="$0.00"
                    value={money.value}
                    onBlur={() => onChange(moneyController.formatForDisplay(money))}
                    onFocus={() => onChange(moneyController.formatForEditing(money))}
                    onChange={(amount) => {
                        onChange(
                            new Money({
                                currency: money.currency,
                                value: amount,
                            })
                        );
                    }}
                />
            </>
        );
    }
);

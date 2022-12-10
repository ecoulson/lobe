import { InputComponent } from './input-component';
import { NumberInputComponentProps } from './number-input-component-props';

export function NumberInputComponent({
    value,
    displayPrecision,
    onChange,
}: NumberInputComponentProps) {
    return (
        <InputComponent
            placeholder="0"
            value={isNaN(value) ? '' : value.toFixed(displayPrecision)}
            onChange={(value) => onChange(parseFloat(value))}
        />
    );
}
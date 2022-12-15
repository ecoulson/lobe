import { InputComponent } from './input-component';
import { NumberInputComponentProps } from './number-input-component-props';

export function NumberInputComponent({
    value,
    displayPercision,
    onChange,
}: NumberInputComponentProps) {
    return (
        <InputComponent
            placeholder="0"
            value={isNaN(value) ? '' : value.toFixed(displayPercision)}
            onChange={(value) => onChange(parseFloat(value))}
        />
    );
}

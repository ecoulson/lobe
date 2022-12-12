import { ReactNode } from 'react';

export interface ArrayInputComponentProps<T> {
    values: T[];
    renderInput: (value: T, onChange: (value: T) => void) => ReactNode;
    onChange: (values: T[]) => void;
}

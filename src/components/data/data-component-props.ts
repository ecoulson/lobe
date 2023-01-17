import { ReactNode } from 'react';
import { DataComponentSize } from './data-component-size';

export interface DataComponentProps {
    // label:  string;
    label: ReactNode;
    data: ReactNode;
    size?: DataComponentSize;
}

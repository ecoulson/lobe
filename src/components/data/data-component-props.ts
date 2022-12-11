import { ReactNode } from 'react';
import { DataComponentSize } from './data-component-size';

export interface DataComponentProps {
    label: string;
    data: ReactNode;
    size: DataComponentSize;
}

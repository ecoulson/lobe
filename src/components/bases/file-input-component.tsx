import { FileInputComponentProps } from './file-input-component-props';

export function FileInputComponent({ accept = [], onChange }: FileInputComponentProps) {
    return (
        <input
            className="w-full"
            accept={accept.join(',')}
            type="file"
            onChange={(e) => onChange(e.target.files)}
        />
    );
}

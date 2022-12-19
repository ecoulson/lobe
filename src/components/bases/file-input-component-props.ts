export interface FileInputComponentProps {
    accept?: string[];
    onChange: (files: FileList | null) => void;
}

import { Dispatch, SetStateAction } from 'react';

export function useFormHandlers() {
    const handleInputChange = (
        event: React.ChangeEvent<
            HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
        >,
        setState: Dispatch<SetStateAction<string>>,
    ) => {
        setState(event.target.value);
    };

    const handleNumberChange = <T>(
        event: React.ChangeEvent<
            HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
        >,
        setState: Dispatch<SetStateAction<T>>,
    ) => {
        const value = event.target.value;
        setState((value === '' ? '' : Number(value)) as T);
    };

    const handleSelectChange = (
        event: React.ChangeEvent<
            HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
        >,
        setState: Dispatch<SetStateAction<string | undefined>>,
    ) => {
        setState(event.target.value);
    };

    const handleCheckboxChange = (
        event: React.ChangeEvent<
            HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
        >,
        setState: Dispatch<SetStateAction<boolean>>,
    ) => {
        if ((event.target as HTMLInputElement).checked !== undefined) {
            setState((event.target as HTMLInputElement).checked);
        }
    };

    const handleArrayChange = (
        event: React.ChangeEvent<
            HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
        >,
        setState: Dispatch<SetStateAction<string[]>>,
    ) => {
        const value = event.target.value.split(',').map((s) => s.trim());
        setState([...new Set(value)]);
    };

    return {
        handleInputChange,
        handleNumberChange,
        handleSelectChange,
        handleCheckboxChange,
        handleArrayChange,
    };
}

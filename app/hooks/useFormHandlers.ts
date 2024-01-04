import { Dispatch, SetStateAction } from 'react';

export function useFormHandlers() {
    
    // Funktion zum Behandeln von Änderungen in Input-Feldern
    const handleInputChange = (
        event: React.ChangeEvent<
            HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
        >,
        setState: Dispatch<SetStateAction<string>>,
    ) => {
        setState(event.target.value);
    };

    // Funktion zum Behandeln von Änderungen in numerischen Input-Feldern
    const handleNumberChange = <T>(
        event: React.ChangeEvent<
            HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
        >,
        setState: Dispatch<SetStateAction<T>>,
    ) => {
        const value = event.target.value;
        setState((value === '' ? '' : Number(value)) as T);
    };

    // Funktion zum Behandeln von Änderungen in Select-Feldern
    const handleSelectChange = (
        event: React.ChangeEvent<
            HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
        >,
        setState: Dispatch<SetStateAction<string | undefined>>,
    ) => {
        setState(event.target.value);
    };

    // Funktion zum Behandeln von Änderungen in Checkboxen
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

    // Funktion zum Behandeln von Änderungen in Input-Feldern, die Arrays repräsentieren
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

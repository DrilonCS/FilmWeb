import { Dispatch, SetStateAction } from 'react';

export function useFormHandlers() {
    // Funktion zum Behandeln von Änderungen in Input-Feldern
    const handleInputChange = (
        // Das Event und die setState-Funktion werden als Parameter übergeben
        event: React.ChangeEvent<
            HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
        >,
        setState: Dispatch<SetStateAction<string>>,
    ) => {
        // Der Wert des Input-Felds wird in den Zustand gespeichert
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
        // Wenn der Wert leer ist, wird ein leerer String gespeichert, sonst wird der Wert in eine Zahl umgewandelt
        setState((value === '' ? '' : Number(value)) as T);
    };

    // Funktion zum Behandeln von Änderungen in Select-Feldern
    const handleSelectChange = (
        event: React.ChangeEvent<
            HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
        >,
        setState: Dispatch<SetStateAction<string | undefined>>,
    ) => {
        // Der ausgewählte Wert wird in den Zustand gespeichert
        setState(event.target.value);
    };

    // Funktion zum Behandeln von Änderungen in Checkboxen
    const handleCheckboxChange = (
        event: React.ChangeEvent<
            HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
        >,
        setState: Dispatch<SetStateAction<boolean>>,
    ) => {
        // Wenn die Checkbox angekreuzt ist, wird true in den Zustand gespeichert, sonst false
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

     // Die Funktionen werden zurückgegeben
    return {
        handleInputChange,
        handleNumberChange,
        handleSelectChange,
        handleCheckboxChange,
        handleArrayChange,
    };
}

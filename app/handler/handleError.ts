import { Dispatch, SetStateAction } from 'react';
import { REST_API_URL } from '../constants/constants';
import { AxiosError } from 'axios';
interface ErrorResponse {
    message: string[];
}

// Funktion zum Behandeln von Suchfehlern
export const handleSearchError = (
    setError: Dispatch<SetStateAction<string | null>>,
    url: string,
    err: AxiosError,
) => {
    let search = '';

    if (url.includes('art')) {
        search = 'art';
    } else if (url === REST_API_URL) {
        search = 'all';
    } else {
        search = 'id';
    }

    // Behandeln von Fehlern basierend auf der Suchart
    if (search === 'art') {
        if (err.response && err.response.status === 500) {
            setError('Wähle eine Buchart (Kindle/Druckausgabe) aus!');
        }
    } else if (search === 'id') {
        if (err.response) {
            if (url.includes('UngültigeId')) {
                setError('Geben Sie bitte eine Id ein!');
            } else {
                setError('Es gibt kein Buch mit dieser ID!');
            }
        }
    } else {
        setError(err.message);
    }
    setTimeout(() => setError(null), 5000);
};

// Funktion zum Behandeln von Erstellungsfehlern
export const handleCreateError = (
    setErrors: React.Dispatch<React.SetStateAction<Record<string, string>>>,
    setError: React.Dispatch<React.SetStateAction<string | null>>,
    errorMessagesInvalid: Record<string, string>,
    errorMessagesNull: Record<string, string>,
    properties: string[],
    values: Record<string, string | number | undefined>,
    error: AxiosError<ErrorResponse>,
) => {
    // Behandeln von Fehlern, die vom Server zurückgegeben werden
    if (
        error.response &&
        error.response.data &&
        Array.isArray(error.response.data.message)
    ) {
        const newErrors: Record<string, string> = {};
        error.response.data.message.forEach((message: string) => {
            properties.forEach((property) => {
                if (message.toLowerCase().includes(property)) {
                    if (
                        (property in values && values[property] === '') ||
                        values[property] === 0
                    ) {
                        newErrors[property] = errorMessagesNull[property];
                    } else {
                        newErrors[property] =
                            errorMessagesInvalid[property] || message;
                    }
                }
            });
        });
        setErrors(newErrors);
        setTimeout(() => setErrors({}), 5000);
    } else {
        setError(error.message);
        setTimeout(() => setError(null), 5000);
    }
};

// Funktion zum Behandeln von Anmeldefehlern
export const handleLoginError = (
    setUsernameError: Dispatch<SetStateAction<string | null>>,
    setPasswordError: Dispatch<SetStateAction<string | null>>,
    username: string,
    password: string,
    error: AxiosError<ErrorResponse>,
) => {
    // Überprüfen der Eingaben und Setzen von Anmeldefehlern
    if (!username && password) {
        setUsernameError('Bitte geben Sie einen Benutzernamen ein!');
    } else if (username && !password) {
        setPasswordError('Bitte geben Sie ein Passwort ein!');
    } else if (!username && !password) {
        setUsernameError('Bitte geben Sie einen Benutzernamen ein!');
        setPasswordError('Bitte geben Sie ein Passwort ein!');
    } else if (error.response && error.response.data) {
        if (error.response.data.message.includes('Unauthorized')) {
            setUsernameError('Unültiger Benutzername oder Passwort!');
            setPasswordError('Unültiger Benutzername oder Passwort!');
        } else {
            alert(
                'Ein Fehler ist aufgetreten. Bitte versuchen Sie es später erneut.',
            );
        }
    }
    setTimeout(() => setUsernameError(null), 5000);
    setTimeout(() => setPasswordError(null), 5000);
};

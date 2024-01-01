import { Dispatch, SetStateAction } from 'react';
import { https, host, port, rest } from '~/constants';

export const handleSearchError = (
    setError: Dispatch<SetStateAction<string | null>>,
    url: string,
    err: any,
    ) => {
        let search = '';

        if (url.includes('art')) {
          search = 'art';
        } else if (url === `${https}${host}${port}${rest}`) {
          search = 'all';
        } else {
          search = 'id';
        }

        if (search === 'art') {
            if(err.response && err.response.status === 500) {
                setError('Wähle eine Buchart (Kindle/Druckausgabe) aus!');
            } 
        } 
        else if (search === 'id') {
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

export const handleCreateError = (
    setErrors: React.Dispatch<React.SetStateAction<Record<string, string>>>,
    setError: React.Dispatch<React.SetStateAction<string | null>>,
    errorMessages: Record<string, string>,
    properties: string[],
    error: any,
    ) => {
        if (
            error.response &&
            error.response.data &&
            Array.isArray(error.response.data.message)
            ) {
                const newErrors: Record<string, string> = {};
                error.response.data.message.forEach((message: string) => {
                    properties.forEach((property) => {
                        if (message.toLowerCase().includes(property)) {
                            newErrors[property] = errorMessages[property] || message;
                        }
                    });
                });
                setErrors(newErrors);
            } else {
                setError(error.message);
            }
        };

  export const handleLoginError = (
    setUsernameError: Dispatch<SetStateAction<string | null>>,
    setPasswordError: Dispatch<SetStateAction<string | null>>,
    username: string,
    password: string,
    error: any,
    ) => {
        if (!username && password) {
            setUsernameError('Bitte geben Sie einen Benutzernamen ein!');
        } else if (username && !password) {
            setPasswordError('Bitte geben Sie ein Passwort ein!')
        } else if (!username && !password) {
            setUsernameError('Bitte geben Sie einen Benutzernamen ein!');
            setPasswordError('Bitte geben Sie ein Passwort ein!')
        }
        else if (error.response && error.response.data) {
          if (error.response.data.message === 'Unauthorized') {
            setUsernameError('Unültiger Benutzername oder Passwort!');
            setPasswordError('Unültiger Benutzername oder Passwort!');
          } else {
            alert('Ein Fehler ist aufgetreten. Bitte versuchen Sie es später erneut.');
          }
        }
        setTimeout(() => setUsernameError(null), 5000);
        setTimeout(() => setPasswordError(null), 5000);
      };
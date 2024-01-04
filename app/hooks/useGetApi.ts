import { useState } from 'react';
import { type BuchProps } from '../constants/types';
import axios from 'axios';
import { handleSearchError } from '~/handler/handleError';

export const useApi = (initialUrl: string) => {
    const [data, setData] = useState<BuchProps | BuchProps[] | null>(null);
    const [error, setError] = useState<string | null>(null);

    const request = (url = initialUrl) => {
        // Durchführen einer GET-Anfrage mit der übergebenen URL
        axios
            .get(url)
            .then((response) => {
                // Wenn die Antwort ein _embedded Objekt enthält, werden die Bücherdaten in den Zustand gespeichert
                if (response.data._embedded) {
                    setData(response.data._embedded.buecher);
                } else {
                    // Ansonsten werden die Daten direkt in den Zustand gespeichert
                    setData(response.data);
                }
                // Der Fehlerzustand wird auf null gesetzt
                setError(null);
            })
            // Bei einem Fehler wird die Funktion handleSearchError aufgerufen
            .catch((err) => handleSearchError(setError, url, err));
    };

    // Die Daten, der Fehler und die Funktionen request und setData werden zurückgegeben
    return { data, error, request, setData };
};

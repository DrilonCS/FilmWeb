// Erstellen Sie eine neue Datei namens useAuthHeaders.ts
import { useCallback } from 'react';

export const useAuthHeaders = () => {
    // Definieren der Funktion createHeaders mit useCallback, um unnötige Neuerstellungen der Funktion zu vermeiden
    const createHeaders = useCallback(
        // Die Funktion gibt ein Objekt mit den Authentifizierungs-Headern zurück
        () => ({
            'Content-Type': 'application/json',
            // Der Authorization Header wird auf 'Bearer ' gefolgt vom Authentifizierungstoken aus dem lokalen Speicher gesetzt
            Authorization: `Bearer ${localStorage.getItem('authToken')}`,
        }),
        // Die leere Abhängigkeitsliste stellt sicher, dass die Funktion nur einmal erstellt wird
        [],
    );

    return createHeaders;
};

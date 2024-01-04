
import { useCallback } from 'react';

export const useAuthHeaders = () => {
    const createHeaders = useCallback(
        () => ({
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('authToken')}`,
        }),
        // Die leere Abhängigkeitsliste stellt sicher, dass die Funktion nur einmal erstellt wird
        [],
    );

    return createHeaders;
};

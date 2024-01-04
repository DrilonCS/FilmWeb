// Erstellen Sie eine neue Datei namens useAuthHeaders.ts
import { useCallback } from 'react';

export const useAuthHeaders = () => {
    const createHeaders = useCallback(
        () => ({
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('authToken')}`,
        }),
        [],
    );

    return createHeaders;
};

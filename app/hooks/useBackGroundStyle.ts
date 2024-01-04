import { useEffect } from 'react';

// Hook für den Hintergrund
export const useBackgroundStyle = () => {
    useEffect(() => {
        const originalStyleHtml = window.getComputedStyle(
            document.documentElement,
        ).background;
        const originalStyleBody = window.getComputedStyle(
            document.body,
        ).background;
        document.documentElement.style.background =
            'linear-gradient(#90AFC5, #3B7EA1)';
        document.body.style.background = 'linear-gradient(#90AFC5, #3B7EA1)';
        document.body.style.margin = '0';
        document.body.style.padding = '0';
        return () => {
            document.documentElement.style.background = originalStyleHtml;
            document.body.style.background = originalStyleBody;
            document.body.style.margin = '';
            document.body.style.padding = '';
        };
    }, []);
};

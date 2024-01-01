
import { Dispatch, SetStateAction } from 'react';

export const handleSearchError = (setError: Dispatch<SetStateAction<string | null>>, err: any) => {
  if (err.response && err.response.status === 404) {
    setError('Es gibt kein Buch mit dieser ID!');
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
            // Verwenden Sie die benutzerdefinierte Fehlermeldung, wenn sie existiert, sonst die ursprüngliche Fehlermeldung
            newErrors[property] = errorMessages[property] || message;
          }
        });
      });
      setErrors(newErrors);
    } else {
      setError(error.message);
    }
  };

  export const handleLoginError = () => {
    
  }
import { useState } from 'react';
import { type BuchProps } from '../types';
import axios from 'axios';

export const useApi = (initialUrl: string) => {
  const [data, setData] = useState<BuchProps | BuchProps[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleError = (err: any) => {
    if (err.response && err.response.status === 404) {
      setError('Es gibt kein Buch mit dieser ID!');
    } else {
      setError(err.message);
    }
    setTimeout(() => setError(null), 5000);
    setData(null);
  };

  const request = (url = initialUrl) => {
    axios
      .get(url)
      .then((response) => {
        if (response.data._embedded) {
          setData(response.data._embedded.buecher);
        } else {
          setData(response.data);
        }
        setError(null);
      })
      .catch(handleError);
  };

  return { data, error, request };
};
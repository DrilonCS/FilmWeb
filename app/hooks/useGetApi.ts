import { useState } from 'react';
import { type BuchProps } from '../components/buch';
import axios from 'axios';

export const useApi = (initialUrl: string) => {
  const [data, setData] = useState<BuchProps | BuchProps[] | null>(null);
  const [error, setError] = useState(null);

  const request = (url = initialUrl) => {
    axios.get(url)
      .then(response => {
        if (response.data._embedded) {
          setData(response.data._embedded.buecher);
        } else {
          setData(response.data);
        }
        setError(null);
      })
      .catch(err => {
        setError(err.message);
        setTimeout(() => setError(null), 5000);
        setData(null);
      });
  };

  return { data, error, request };
};
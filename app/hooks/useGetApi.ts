import { useState } from 'react';
import { type BuchProps } from '../types';
import axios from 'axios';
import { handleSearchError } from '~/handleError';

export const useApi = (initialUrl: string) => {
  const [data, setData] = useState<BuchProps | BuchProps[] | null>(null);
  const [error, setError] = useState<string | null>(null);

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
      .catch((err) => handleSearchError(setError, err));
  };

  return { data, error, request };
};
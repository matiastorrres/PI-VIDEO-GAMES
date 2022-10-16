/* eslint-disable no-throw-literal */
import { useEffec, useState } from "react";

export const useFetch = (url) => {
  const [data, setDate] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);

  useEffec(() => {
    const getData = async (url) => {
      try {
        let resp = await fetch(url);
        if (!resp.ok) {
          throw {
            err: true,
            status: resp.status,
            statusText: !resp.statusText ? "ocurrio un error" : resp.statusText,
          };
        }
        let data = await resp.json();
        setIsPending(false);
        setDate(data);
        setError({ err: false });
      } catch (error) {
        setIsPending(true);
        setError(error);
      }
    };
    getData(url);
  }, [url]);
  return { data, isPending, error };
};

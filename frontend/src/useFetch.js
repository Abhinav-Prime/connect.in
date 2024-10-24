import { useState, useEffect } from "react";
const useFetch = (endpoint) => {
  const [data, setData] = useState(null);
  const [isPending, setPending] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const abortCont = new AbortController();

    fetch(endpoint, { signal: abortCont.signal })
      .then((res) => {
        if (!res?.ok) {
          throw new Error("Slow connection Data not fetched");
        }
        return res.json();
      })
      .then((res) => {
        setPending(false);
        setData(res);
      })
      .catch((err) => {
        if (err.name === "AbortError") {
          console.log("fetch aborted");
        } else {
          setPending(false);
          setError(err.message);
        }
      });

    return () => abortCont.abort(); // used to abort the fetch when the component is unmounted
  }, [endpoint]);
};

export default useFetch;

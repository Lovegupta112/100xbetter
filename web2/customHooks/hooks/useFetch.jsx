import { useEffect, useState } from "react";

const useFetch = (url) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [error, setError] = useState("");

  const fetchUrl = async (url) => {
    try {
      setLoading(true);
      setError("");
      const resp = await fetch(url);
      const data = await resp.json();
      setLoading(false);
      setData(Array.isArray(data) ? data : [data]);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUrl(url);
  }, [url]);

  return {
    loading,
    data,
    error,
  };
};

export default useFetch;

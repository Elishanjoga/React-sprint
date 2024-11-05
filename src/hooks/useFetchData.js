import { useEffect, useState } from "react";

import axios from "axios";

export default function useFetchData() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        "https://rapidtechinsights.github.io/hr-assignment/recent.json"
      );

      setData(response.data?.trips);
      setError(null);
    } catch (err) {
      setError(err?.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };

  return {
    data,
    loading,
    error,
  };
}

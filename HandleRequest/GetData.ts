export const fetchLodges = async () => {
    let data
    try {
      await fetch('/api/lodgedata')
        .then(response => response.json())
        .then(json => data = json )
      return data
    } catch (error) {
      console.error("Error fetching lodges:", error);
    }
  };
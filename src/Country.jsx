import { useEffect, useState } from "react";
import "./index.css";
import { CountryCard } from "./CountryCard";
import AuthorBadge from "./AuthorBadge";

export const Country = () => {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");

  const API =
    "https://restcountries.com/v3.1/all?fields=name,flags,region,capital,population,cca3";

  const fetchCountries = async () => {
    try {
      const res = await fetch(API);
      const data = await res.json();
      console.log("Fetched data:", data);

      const sortedData = data.sort((a, b) => b.population - a.population);
      setTimeout(() => {
        setCountries(sortedData);
        setLoading(false);
      }, 2000);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCountries();
  }, []);

  const searchData = countries.filter((country) =>
    country.name.common.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return <div className="loader"></div>;
  }

  if (error) return <h1>{error.message}</h1>;

  return (
    <section className="container">
      <header>
        <h1>🌍 Explore Countries</h1>
        <AuthorBadge />
      </header>
      <div className="country-search">
        <input
          type="text"
          placeholder="Search Country"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <ul className="cards">
        {searchData.map((country, index) => (
          <CountryCard
            key={country.cca3 || index}
            countryData={country}
            rank={index + 1}
          />
        ))}
      </ul>
    </section>
  );
};

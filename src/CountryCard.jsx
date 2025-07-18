import PropTypes from "prop-types";

export const CountryCard = ({ countryData, rank }) => {
  return (
    <li className="country-card">
      <figure>
        <img
          src={countryData.flags.svg}
          alt={`Flag of ${countryData.name.common}`}
          className="country-image"
        />
      </figure>
      <h1 className="country-name">{countryData.name.common}</h1>
      <div className="country-info country-highlight">
        <p>Rank: #{rank}</p>
      </div>
      <div className="grid-three-cols">
        <p className="country-info">
          <span>Population:</span>{" "}
          {countryData.population?.toLocaleString("en-IN")}
        </p>
        <p className="country-info">
          <span>Region:</span> {countryData.region || "N/A"}
        </p>
        <p className="country-info">
          <span>Capital:</span> {countryData.capital?.[0] || "N/A"}
        </p>
      </div>
    </li>
  );
};

CountryCard.propTypes = {
  countryData: PropTypes.shape({
    name: PropTypes.shape({
      common: PropTypes.string.isRequired,
    }).isRequired,
    flags: PropTypes.shape({
      svg: PropTypes.string.isRequired,
    }).isRequired,
    population: PropTypes.number,
    region: PropTypes.string,
    capital: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
  rank: PropTypes.number.isRequired,
};

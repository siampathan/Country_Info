import { useState, useEffect } from "react";
import "./App.css";

function App() {
  //fetch(`https://restcountries.com/v3.1/name/${countryName}`)

  const [countryName, setCountryName] = useState("bangladesh");
  const [inputText, setInputText] = useState("");
  const [data, setData] = useState({});
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://restcountries.com/v3.1/name/${countryName}`)
      .then((res) => {
        if (res.status === 200) {
          error && setError(false);
          return res.json();
        } else {
          throw new Error("Something went wrong");
        }
      })
      .then((data) => {
        setData(data);
      })
      .catch(() => setError(false))
      .finally(() => setLoading(false));
  }, [countryName, error]);

  const handleSearch = (e) => {
    if (e.key === "Enter") {
      setCountryName(e.target.value);
      setInputText("");
    }
  };

  return (
    <div className="bg">
      {!loading ? (
        <div>
          <div className="search_box">
            <input
              placeholder="Enter Country Name"
              className="input"
              error={error}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={handleSearch}
            />
          </div>

          <div className="flage">
            <img src={data[0].flags.svg} alt="flage" />
          </div>

          <div className="container">
            <div className="title box_model">
              <h1 className="name">{data[0].name.common}</h1>
              <p className="official_name"> {data[0].name.official}</p>
              <p>Population: {data[0].population} </p>
            </div>

            <div className="location box_model">
              <h2>Capital</h2>
              <p> {data[0].capital[0]} </p>
              <p>Region: {data[0].region} </p>
              <p>Subregion: {data[0].subregion} </p>
            </div>

            <div className="arms box_model">
              <h2>Coat of arms</h2>
              <div className="icon">
                <img src={data[0].coatOfArms.png} alt="" />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <h2>Loading</h2>
      )}
    </div>
  );
}
export default App;

// import React, { useEffect,useState } from "react";

// function CountryCard({ name, flag, abbr }) {
//   return (
//     <div
//       style={{
//         display: "flex",
//         flexDirection: "column",
//         border: "1px solid gray",
//         borderRadius: "5px",
//         gap: "5px",
//         width: "200px",
//         height: "200px",
//         justifyContent: "center",
//         alignItems: "center",
//         textAlign: "center",
//       }}
//     >
//       <img
//         src={flag}
//         alt={`flag of ${abbr}`}
//         style={{ width: "100px", height: "100px" }}
//       />
//       <h2>{name}</h2>
//     </div>
//   );
// }

// const API_URL = "https://xcountries-backend.labs.crio.do/all";

// const Countries = () => {
//   const [countrydata, setCountryData] = useState([]);

//   useEffect(() => {
//     fetch(API_URL)
//       .then((res) => res.json())
//       .then((data) => setCountryData(data))
//       .catch((error) => {
//         console.error("Error fetching data: ", error);
//       });
//   }, []);


//   return (
//     <div
//       style={{
//         display: "flex",
//         flexWrap: "wrap",
//         gap: "10px",
//         alignItems: "center",
//       }}
//     >
//       {countrydata.map((item) => (
//         <CountryCard
//           name={item.name}
//           flag={item.flag}
//           abbr={item.abbr}
//           key={item.abbr}
//         />
//       ))}
//     </div>
//   );
// };

// export default Countries;

import React, { useEffect, useState } from "react";

function CountryCard({ name, flag, abbr }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        border: "1px solid gray",
        borderRadius: "5px",
        gap: "5px",
        width: "200px",
        height: "200px",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
      }}
    >
      <img
        src={flag}
        alt={`flag of ${abbr}`}
        style={{ width: "100px", height: "100px" }}
      />
      <h2>{name}</h2>
    </div>
  );
}

const Countries = () => {
  const [countries, setCountries] = useState([]);
  const [error, setError] = useState(false);

  // ✅ The API endpoint must match exactly
  const API_URL = "https://xcountries-backend.azurewebsites.net/all";

  useEffect(() => {
    // ✅ The fetch must run immediately on component mount
    fetch(API_URL)
      .then((res) => {
        if (!res.ok) {
          throw new Error("API failed");
        }
        return res.json();
      })
      .then((data) => setCountries(data))
      // ✅ Error log must include this text exactly:
      .catch((err) => {
        console.error("Error fetching data:", err);
        setError(true);
      });
  }, []); // 👈 Empty array ensures it runs only once on load

  if (error) {
    return (
      <p style={{ color: "red", textAlign: "center" }}>
        ❌ Failed to load countries.
      </p>
    );
  }

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "10px",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {countries.map((item) => (
        <CountryCard
          key={item.abbr}
          name={item.name}
          flag={item.flag}
          abbr={item.abbr}
        />
      ))}
    </div>
  );
};

export default Countries;

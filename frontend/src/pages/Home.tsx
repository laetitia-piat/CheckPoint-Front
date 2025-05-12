import { useMutation, useQuery } from "@apollo/client";
import {
  CREATE_COUNTRY,
  GET_ALL_CONTINENTS,
  GET_ALL_COUNTRIES,
} from "../api/example"; // import your GraphQL requests here
import React, { useState } from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  const {
    loading: loadingCountries,
    error: errorCountries,
    data: dataCountries,
    refetch,
  } = useQuery(GET_ALL_COUNTRIES);
  const {
    loading: loadingContinents,
    error: errorContinents,
    data: dataContinents,
  } = useQuery(GET_ALL_CONTINENTS);

  const [createCountry] = useMutation(CREATE_COUNTRY);
  const [name, setName] = useState("");
  const [emoji, setEmoji] = useState("");
  const [code, setCode] = useState("");
  const [continent, setContinent] = useState("");

  if (loadingCountries) return <p>Loading...</p>;
  if (errorCountries) return <p>Error: {errorCountries.message}</p>;
  if (loadingContinents) return <p>Loading...</p>;
  if (errorContinents) return <p>Error: {errorContinents.message}</p>;
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await createCountry({
        variables: {
          data: {
            name,
            emoji,
            code,
            continent: continent ? { id: parseInt(continent) } : undefined,
          },
        },
      });
      await refetch();
      setName("");
      setEmoji("");
      setCode("");
      setContinent("");
    } catch (err) {
      console.error("Erreur lors de l'ajout :", err);
    }
  };

  if (dataCountries) {
    return (
      <>
        <section className="flex flex-col items-center justify-center p-4">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col lg:flex-row flex-wrap items-end gap-4 w-full max-w-5xl"
          >
            <div className="flex flex-col w-full lg:w-1/5">
              <label>Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="border border-gray-300 p-2 rounded"
              />
            </div>
            <div className="flex flex-col w-full lg:w-1/5">
              <label>Emoji</label>
              <input
                type="text"
                value={emoji}
                onChange={(e) => setEmoji(e.target.value)}
                className="border border-gray-300 p-2 rounded"
              />
            </div>
            <div className="flex flex-col w-full lg:w-1/5">
              <label>Code</label>
              <input
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="border border-gray-300 p-2 rounded"
              />
            </div>
            <div className="flex flex-col w-full lg:w-1/5">
              <label>Continent</label>
              <select
                value={continent}
                onChange={(e) => setContinent(e.target.value)}
                className="border border-gray-300 p-2 rounded"
              >
                <option value="">-- Aucun continent --</option>
                {dataContinents.continents.map((continent: any) => (
                  <option key={continent.id} value={continent.id}>
                    {continent.name}
                  </option>
                ))}
              </select>
            </div>

            <button
              type="submit"
              className="bg-[#f12476] text-white px-6 py-2 rounded w-full lg:w-auto"
            >
              Add
            </button>
          </form>
        </section>

        <section className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-6 gap-4 p-4 mt-10 ml-10 mr-10">
          {dataCountries.countries.map((country: any) => (
            <Link
              to={`/country/${country.code}`}
              className="border border-gray-300 p-4 rounded shadow text-center hover:bg-gray-100 transition"
            >
              <h2 className="text-lg">{country.name}</h2>
              <p className="text-xl mt-2">{country.emoji}</p>
            </Link>
          ))}
        </section>
      </>
    );
  }
};
export default HomePage;

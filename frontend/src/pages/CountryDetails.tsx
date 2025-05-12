import { useNavigate, useParams } from "react-router-dom";
import { GET_COUNTRY } from "../api/example";
import { useQuery } from "@apollo/client";

const CountryDetails = () => {
  const { code } = useParams();
  const navigate = useNavigate();
  const { loading, error, data } = useQuery(GET_COUNTRY, {
    variables: { code: code },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="flex flex-col items-center justify-center p-4 mt-10">
      <p className="text-2xl mt-8 mb-8">{data.country.emoji}</p>
      <p className="text-xl">Name : {data.country.name}</p>
      <p className="text-xl"> Continent : {data.country.continent.name} </p>
      <div className="mt-4">
        <button
          onClick={() => navigate("/")}
          className="bg-[#f12476] text-white px-4 py-2 rounded mt-10"
        >
          Go Back
        </button>
      </div>
    </div>
  );
};

export default CountryDetails;

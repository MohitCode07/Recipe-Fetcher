import { useEffect, useState } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";

const Container = styled.div`
  display: flex;
  align-items: flex-start; /* Adjust alignment as needed */
`;

const Image = styled.img`
  width: 300px; /* Adjust width as needed */
  height: 300px;
  margin-right: 60px; /* Add some space between image and text */
`;

const Recipe = () => {
  let params = useParams();

  const [details, setDetails] = useState({});

  const fetchDetails = async () => {
    try {
      const response = await fetch(
        `https://api.spoonacular.com/recipes/${params.name}/information?apiKey=${process.env.REACT_APP_API_KEY}`
      );
      const detailData = await response.json();
      setDetails(detailData);
    } catch (error) {
      console.error("Error fetching recipe details:", error);
    }
  };

  useEffect(() => {
    fetchDetails();
  }, [params.name]);

  return (
    <Container>
      <Image src={details.image} alt={details.title} />
      <div>
        <h2>{details.title}</h2>
        <h3>Ingredients:</h3>
        <ul>
          {details.extendedIngredients &&
            details.extendedIngredients.map((ingredient) => (
              <li key={ingredient.id}>{ingredient.original}</li>
            ))}
        </ul>
        <h3>Instructions:</h3>
        <div dangerouslySetInnerHTML={{ __html: details.instructions }} />
      </div>
    </Container>
  );
};

export default Recipe;

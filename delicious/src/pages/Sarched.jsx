import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import styled from "styled-components";

function Searched() {
  const [searchedRecipes, setSearchedRecipes] = useState([]);
  const { search } = useParams(); // Get the 'search' parameter from the URL

  useEffect(() => {
    const getSearched = async (query) => {
      try {
        const response = await fetch(
          `https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.REACT_APP_API_KEY}&query=${query}`
        );
        const data = await response.json();
        setSearchedRecipes(data.results);
      } catch (error) {
        console.error("Error fetching searched recipes:", error);
      }
    };

    getSearched(search); // Pass the search query to the getSearched function
  }, [search]); // Fetch recipes whenever the search query changes

  return (
    <Grid>
      {searchedRecipes.map((item) => (
        <Link to={"/recipe/" + item.id} key={item.id}>
          <Card>
            <img src={item.image} alt={item.title} />
            <h4>{item.title}</h4>
          </Card>
        </Link>
      ))}
    </Grid>
  );
}

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
  grid-gap: 3rem;
`;

const Card = styled.div`
  img {
    width: 100%;
    border-radius: 2rem;
  }
  a {
    text-decoration: none;
  }
  h4 {
    text-align: center;
    padding: 1rem;
  }
`;

export default Searched;

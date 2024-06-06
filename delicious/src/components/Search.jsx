import React from "react";
import styled from "styled-components";
import { FaSearch } from "react-icons/fa";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Search() {
  const [input, setInput] = useState("");
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    navigate("/searched/" + input);
  };

  return (
    <FormStyle onSubmit={submitHandler}>
      <div>
        <input
          onChange={(e) => setInput(e.target.value)}
          type="text"
          value={input}
        ></input>
        <FaSearch />
      </div>
    </FormStyle>
  );
}

const FormStyle = styled.form`
  margin: 0 auto; /* Set margin to auto to center horizontally */
  position: relative;
  width: 60%; /* Adjust width as needed */

  input {
    border: none;
    background: linear-gradient(
      35deg,
      #494949,
      #313131
    ); /* Adjusted gradient colors */
    font-size: 1.5rem; /* Moved font-size property */
    color: white;
    padding: 1rem 3rem;
    border-radius: 1rem; /* Added missing border-radius value */
    outline: none;
    width: 100%;
  }

  div {
    width: 100%;
    position: relative;
  }

  svg {
    position: absolute;
    top: 50%;
    right: 1rem; /* Adjusted position to be on the right side */
    transform: translateY(-50%);
    color: white;
  }
`;

export default Search;

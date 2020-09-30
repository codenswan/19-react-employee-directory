import React from "react";
import { Container, FormControl } from "react-bootstrap";

export default function Searchbox(props) {
  return (
    <Container>
      <FormControl 
        className="search"
        type="text"
        value={props.userInput}
        onChange={props.handleInputChange}
        placeholder="Just begin typing to search..."
      />
    </Container>
  );
}

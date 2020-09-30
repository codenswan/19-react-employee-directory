import React, { useState, useEffect } from "react";
import { Container, Jumbotron } from "react-bootstrap";
import API from "./Utils/API";
import "./App.css";
import StaffTable from "./components/StaffTable";
import Searchbox from "./components/Searchbox";

export default function App() {
  const [staffList, setStaffList] = useState([]);
  const [filteredStaff, setFilteredStaff] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [sortColumn, setSortColumn] = useState();

  useEffect(() => {
    API.search()
      .then((response) => {
        setStaffList(response.data.results);
        let formattedStaff = response.data.results.map((staff) => {
          return {
            Photo: staff.picture.medium,
            Name: `${staff.name.first} ${staff.name.last}`,
            Username: staff.login.username,
            Age: staff.dob.age,
            Email: staff.email,
            Phone: staff.phone,
            City: staff.location.city,
            Country: staff.location.country
          };
        });
        setFilteredStaff(formattedStaff);
      })

      .catch((error) => console.log(error));
  }, []);

  function handleInputChange(event) {
    setUserInput(event.target.value);
  }

  function search(rows) {
    let searchResults = rows.filter(
      (row) =>
        row.Name.toLowerCase().indexOf(userInput) > -1 ||
        row.Username.toLowerCase().indexOf(userInput) > -1 ||
        row.Email.toLowerCase().indexOf(userInput) > -1 ||
        row.City.toLowerCase().indexOf(userInput) > -1 ||
        row.Country.toLowerCase().indexOf(userInput) > -1
    ) 

    if (sortColumn === "Name") {
      searchResults.sort((a, b) => {
        return a.Name < b.Name ? -1 : 1;
      });
    } else if (sortColumn === "Username") {
      searchResults.sort((a, b) => {
        return a.Username < b.Username ? -1 : 1;
      })
    }
    return searchResults;
  }

  function onColumnClick(heading) {
    setSortColumn(heading)
  }

  return (
    <Container fluid>
      <Jumbotron
        className="d-flex justify-content-center"
        style={{ backgroundColor: "#7AC9ED" }}
      >
        <h1>Staff Directory</h1>
      </Jumbotron>
      <Searchbox userInput={userInput} handleInputChange={handleInputChange} />
      <StaffTable
        onColumnClick={onColumnClick}
        staffList={search(filteredStaff)}
      />
    </Container>
  );
}

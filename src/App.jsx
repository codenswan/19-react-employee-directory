import React, { useState, useEffect } from "react";
import API from "./Utils/API";
import "./App.css";
import StaffTable from "./components/StaffTable";

export default function App() {
  const [staffList, setStaffList] = useState();
  const [fitleredStaff, setFitleredStaff] = useState();
  const [userInput, setUserInput] = useState();

  useEffect(() => {
    API.search()
      .then((response) => {
        let formattedStaff = response.data.results.map((staff) => {
          return {
            pic: staff.picture.medium,
            id: staff.login.username,
            name: `${staff.name.first} ${staff.name.last}`,
            email: staff.email,
            phone: staff.phone,
          };
        });
        setStaffList(formattedStaff);
        console.log(formattedStaff);
        setFitleredStaff(formattedStaff);
      })

      .catch((error) => console.log(error));
  }, []);

  return (
    <div>
      <div>filter goes here</div>
      <StaffTable/>
    </div>
  );
}

import React from "react";
import { Container, Table } from "react-bootstrap";

export default function StaffTable(props) {
  let headings = [];
  if (props.staffList && props.staffList.length > 0) {
    headings = Object.keys(props.staffList[0]).map((heading) => {
      return (
        <th onClick={() => props.onColumnClick(heading)} key={heading}>
          {heading}
        </th>
      );
    });
  }

  let rows;
  if (props.staffList) {
    rows = props.staffList.map((staff) => {
      const tds = [];
      for (const key in staff) {
        const value = staff[key];
        if (key === "Photo") {
          tds.push(
            <td key={value}>
              <img src={value} alt={value} />
            </td>
          );
        } else {
          tds.push(<td key={value}>{value}</td>);
        }
      }
      return <tr key={staff.Username}>{tds}</tr>;
    });
  } else {
    rows = "Loading...";
  }

  return (
    <Container>
      <Table striped bordered hover>
        <thead>
          <tr >
            {headings}
            {/* {props.headers.map((heading) => (
              <th onClick={()=> props.onColumnClick(heading)} key={heading}>
                {heading}
              </th>
            ))} */}
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
    </Container>
  );
}

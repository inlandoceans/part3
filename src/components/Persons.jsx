import React from "react";

const Persons = ({ newSearch, persons, confirmRemove }) => {
  const personsToShow =
    newSearch === ""
      ? persons
      : persons.filter((person) =>
          person.name.toLowerCase().includes(newSearch.toLowerCase())
        );
  return (
    <React.Fragment>
      <ul>
        {personsToShow.map((person) => (
          <li key={person.name}>
            {person.name}: {person.number}{" "}
            <button onClick={() => confirmRemove(person)}>delete</button>
          </li>
        ))}
      </ul>
    </React.Fragment>
  );
};

export default Persons;

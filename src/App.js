import React, { useState, useEffect } from "react";
import Filter from "./components/Filter";
import Persons from "./components/Persons";
import PersonForm from "./components/PersonForm";
import peopleService from "./services/people";
import Notification from "./components/Notification";
import "./index.css";

const App = () => {
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newSearch, setSearch] = useState("");
  const [persons, setPersons] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    peopleService.getAll().then((initial) => {
      setPersons(initial);
    });
  }, []);

  const handleNewPerson = (event) => setNewName(event.target.value);
  const handleNewNumber = (event) => setNewNumber(event.target.value);
  const handleSearch = (event) => setSearch(event.target.value);

  const addNewPerson = (e) => {
    e.preventDefault();

    const newPerson = {
      name: newName,
      number: newNumber,
    };

    if (persons.some((e) => e.name === newName)) {
      const personId = persons.find((person) => person.name === newName);

      if (window.confirm(`Update the number of ${newName}?`)) {
        peopleService.update(personId.id, newPerson).then((returnedPerson) => {
          setPersons(
            persons.map((item) =>
              item.name === newName ? returnedPerson : item
            )
          );
        });
        newMessage(`${newName}'s number was updated!`);
        setNewName("");
        setNewNumber("");
        setPersons(persons.filter((n) => n.name !== newName));
      } else {
        setNewName("");
        setNewNumber("");
      }
    } else {
      peopleService
        .create(newPerson)
        .then(() => setPersons(persons.concat(newPerson)));
      newMessage(`${newName} was added to the phonebook!`);
      setNewName("");
      setNewNumber("");
    }
  };

  const newMessage = (text) => {
    setMessage(text);
    setTimeout(() => {
      setMessage(null);
    }, 3000);
  };

  const confirmRemove = (person) => {
    const { id } = person;
    if (window.confirm(`Really remove ${person.name}?`)) {
      peopleService
        .removePerson(id)
        .then((e) => {
          setPersons(persons.filter((person) => id !== person.id));
        })
        .catch((error) =>
          newMessage(`${person.name} was already removed from the server!`)
        );
    } else {
      console.log("whatever");
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} />
      <Filter newSearch={newSearch} handleSearch={handleSearch} />
      <PersonForm
        newName={newName}
        handleNewPerson={handleNewPerson}
        newNumber={newNumber}
        handleNewNumber={handleNewNumber}
        addNewPerson={addNewPerson}
      />
      <h2>Numbers</h2>
      <Persons
        persons={persons}
        newSearch={newSearch}
        confirmRemove={confirmRemove}
      />
    </div>
  );
};

export default App;

import React from "react";

const PersonForm = ({
  newName,
  handleNewPerson,
  newNumber,
  handleNewNumber,
  addNewPerson,
}) => (
  <React.Fragment>
    <h2>Add a new person</h2>
    <form>
      <div>
        name: <input value={newName} onChange={handleNewPerson} />
      </div>
      <div>
        number: <input value={newNumber} onChange={handleNewNumber} />
      </div>
      <div>
        <button onClick={addNewPerson} type='submit'>
          add
        </button>
      </div>
    </form>
  </React.Fragment>
);

export default PersonForm;

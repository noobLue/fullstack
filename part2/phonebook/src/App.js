import { useState, useEffect } from 'react'
import Persons from './Persons'
import ControlledInput from './ControlledInput'
import Form from './Form'

import axios from 'axios'


const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')

  const submitFunc = (e) => {
    e.preventDefault();

    if(persons.filter(p=>p.name === newName).length > 0)
    {
      alert(`${newName} is already added to phonebook`)
      return;
    }
    
    setPersons(persons.concat({ name: newName, number: newNumber }));
    setNewNumber('');
    setNewName('');
  };

  useEffect(() => {
    console.log("effect");
    axios
      .get("http://localhost:3001/persons")
      .then(res => {
        console.log(res);
        setPersons(persons.concat(res.data));
      });
      
  }, [])

  const inputs = [
    { key:"name", value: newName, callback: setNewName }, 
    { key:"number", value: newNumber, callback: setNewNumber }
  ]

  return (
    <div>
      <h2>Phonebook</h2>
      <ControlledInput input={{key: 'filter shown with', value: newFilter, callback: setNewFilter}} />
      <Form inputs={inputs} submit={submitFunc} />
      <h2>Numbers</h2>
      <Persons persons={persons} newFilter={newFilter} />
    </div>
  )
}

export default App
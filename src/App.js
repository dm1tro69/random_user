import React, { useState, useEffect } from 'react'
import {
  FaEnvelopeOpen,
  FaUser,
  FaCalendarTimes,
  FaMap,
  FaPhone,
  FaLock,
} from 'react-icons/fa'
const url = 'https://randomuser.me/api/'
const defaultImage = 'https://randomuser.me/api/portraits/men/75.jpg'
function App() {
  const [loading, setLoading] = useState(true)
  const [person, setPerson] = useState(null)
  const [title, setTitle] = useState('name')
  const [value, setValue] = useState('random person')

  const getPerson = async () => {
    const response = await fetch(url)
    const data = await response.json()
    const person = data.results[0]
    const {phone, email} = person
    const {large: image} = person.picture
    const {login: {password}} = person
    const {first, last} = person.name
    const {dob: {age}} = person
    const {street: {number, name}} = person.location
    const newPerson = {
      image,phone, email, password, age, street:`${number} ${name}`, name: `${first} ${last}`

    }
    setPerson(newPerson)
    setLoading(false)
    setTitle('name')
    setValue(newPerson.name)

  }

  useEffect(()=> {
    getPerson()
  }, [])

  const handleValue = (e) => {
    if (e.target.classList.contains('icon')){
        const newValue = e.target.dataset.label
      setTitle(newValue)
      setValue(person[newValue])
    }
  }

  return <main>
    <div className="block bcg-black">

    </div>
    <div className="block">
      <div className="container">
        <img className={'user-img'} src={(person && person.image) || defaultImage} alt="img"/>
        <p className="user-title">my {title} is</p>
        <p className="user-value">{value}</p>
        <div className="values-list">
          <button
              onMouseOver={handleValue}
              className="icon"
              data-label={'name'}
          ><FaUser/></
          button>
          <button
              onMouseOver={handleValue}
              className="icon"
              data-label={'email'}
          ><FaEnvelopeOpen/></
              button>
          <button
              onMouseOver={handleValue}
              className="icon"
              data-label={'age'}
          ><FaCalendarTimes/></
              button>
          <button
              onMouseOver={handleValue}
              className="icon"
              data-label={'street'}
          ><FaMap/></
              button>
          <button
              onMouseOver={handleValue}
              className="icon"
              data-label={'phone'}
          ><FaPhone/></
              button>
          <button
              onMouseOver={handleValue}
              className="icon"
              data-label={'password'}
          ><FaLock/></
              button>
        </div>
        <button onClick={getPerson} className="btn" type={'btn'}>
          {loading? 'loading...': 'random user'}
        </button>
      </div>
    </div>
  </main>
}

export default App

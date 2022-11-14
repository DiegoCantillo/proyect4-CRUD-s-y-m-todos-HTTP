
import axios from 'axios'
import { useEffect, useState } from 'react'
import './App.css'
import UsersForm from './components/UsersForm'
import UsersLists from './components/UsersLists'
import {Toaster, toast} from 'react-hot-toast'

function App() {


  const [listUsers, setListUsers] = useState([])
  const [userSelected, setUserSelected] = useState(null)

useEffect(()=> {
    axios.get('https://users-crud1.herokuapp.com/users/')
        .then(res => setListUsers(res.data))
        .catch(error => console.log(error.response?.data))
}, [])

const getUser = () => {
    axios.get('https://users-crud1.herokuapp.com/users/')
        .then(res => setListUsers(res.data))
}

const deleteUser = (id) => {
  axios.delete(`https://users-crud1.herokuapp.com/users/${id}/`)
      .then(()=> getUser())
      .catch(error => console.log(error.response?.data))
}

const updateUser = (user) => {
  setUserSelected(user)
}

const desSelect = () => {
  setUserSelected(null)
}

  return (
    <div className="App">
      <UsersLists listUsers={listUsers} updateUser={updateUser}
                   deleteUser={deleteUser} Toaster={Toaster} toast={toast}/>
                   
      <UsersForm getUser={getUser} userSelected={userSelected}
                 desSelect={desSelect} setUserSelected={setUserSelected}
                 Toaster={Toaster} toast={toast}/>

    </div>
  )
}

export default App

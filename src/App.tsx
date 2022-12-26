import React, {useEffect, useState} from 'react';
import {json} from "stream/consumers";
import axios from "axios";

function App() {

  type Tuser = {
    id: number
    name: string,
    password: string
  }


  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [updateName, setUpdateName] = useState('')
  const [updatePassword, setUpdatePassword] = useState('')
  const [changeData, setChangeData] = useState<number>(0)
  const [users, setUsers] = useState<Tuser[]>([])
  const url: string = 'http://localhost:3001'

  const createUser = () => {
    axios.post(`${url}/users`, {
      name: name,
      password: password
    })
  }

  const deleteUser = (id: number) => {
    axios.delete(`${url}/users/${id}`)
  }

  const updateUser = (id: number) => {
    axios.put(`${url}/users/${id}`, {
      id: id,
      name: updateName,
      password: updatePassword
    })
  }

  const showEditor = (id: number) => {
    setChangeData(id)
  }

  useEffect(() => {
    const getUsers = async () => {
      const {data} = await axios.get(`${url}/users`)
      setUsers(data)
    }
    getUsers()
  }, [])


  // const getUsers = () => {
  //   const url: string = 'http://localhost:3001'
  //   fetch(`${url}/users`)
  //     .then((response) => response.json())
  //     .then((user) => setUsers(user))
  // }




  return (
    <div>
      <div>Auth</div>

      <div className={'border-black'}>
        <div>
          <input className={'bg-[#ccc]'} value={name} onChange={(event) => setName(event.target.value)}
                 placeholder={'name'} type="text"/>
        </div>

        <div>
          <input className={'bg-[#ccc]'} value={password} onChange={(event) => setPassword(event.target.value)}
                 placeholder={'password'} type="text"/>
        </div>

        <button onClick={() => createUser()}>createUser</button>
      </div>

      {
        users.map((obj, index) =>
          <div className={'bg-[#fff]'} key={index}>

            <div>{obj.id}</div>
            <div>{obj.name}</div>
            <div>{obj.password}</div>

            <div className={changeData === obj.id ? 'block' : 'hidden'}>
              <input value={updateName} onChange={(event) => setUpdateName(event.target.value)} placeholder={'change Name'} type="text"/>
              <input value={updatePassword} onChange={(event) => setUpdatePassword(event.target.value)} placeholder={'change password'} type="text"/>
              <button onClick={() => updateUser(obj.id)}>update value</button>
            </div>

            <button onClick={() => deleteUser(obj.id)} className={'bg-black text-white mr-[20px]'}>Delete</button>
            <button onClick={() => showEditor(obj.id)} className={'bg-black text-white'}>Update</button>
          </div>
        )
      }

    </div>
  );
}

export default App;

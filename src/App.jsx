import React, { useEffect, useState } from 'react'
import './App.css'
import EdiText from 'react-editext'
function App() {

  const [users, setUsers] = useState([]);

  const [newName , setNewName] =  useState("");
  const [newEmail , setNewEmail] = useState("");
  const [newWebsite, setNewWebsite] = useState("");


  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((data) => setUsers(data))
  }, [])


  function adduser(){
    const name = newName.trim();
    const email = newEmail.trim();
    const website = newWebsite.trim();

    if(name && email && website){
      
    }
  }

  return (
    <>
      <table className='table'>
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Email</th>
            <th>Website</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>
                <EdiText value={user.email}/>
                
              </td>
              <td>

                <EdiText value = {user.website}/>
                
              </td>
              <td>
                <button className='btn btn-primary'>Update</button>
                <button className='btn btn-danger'>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>


        <tfoot>
          <tr>
              <td>
                <input 
                type="text"
                value={newName}
                placeholder='Name..'
                onChange={ (e) => setNewName(e.target.value)}
                />
              </td>


              <td>
                <input 
                type="text"
                value={newEmail}
                placeholder='Email..'
                onChange={ (e) => setNewEmail(e.target.value)}
                />
              </td>


              <td>
                <input 
                type="text"
                value={newWebsite}
                placeholder='Website..'
                onChange={ (e) => setNewWebsite(e.target.value)}
                />
              </td>

              <td>
                <button
                 className='btn btn-primary' 
                 onClick={adduser}
                >
                  Add User
                </button>
              </td>
          </tr>
        </tfoot>

      </table>
    </>
  )
}

export default App
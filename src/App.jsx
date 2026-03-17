import React, { useEffect, useState } from "react";
import "./App.css";
import EdiText from "react-editext";

function App() {
  const [users, setUsers] = useState([]);

  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newWebsite, setNewWebsite] = useState("");

  // READ
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((data) => setUsers(data));
  }, []);

  // CREATE
  function addUser() {
    const name = newName.trim();
    const email = newEmail.trim();
    const website = newWebsite.trim();

    if (name && email && website) {
      fetch("https://jsonplaceholder.typicode.com/users", {
        method: "POST",
        body: JSON.stringify({ name, email, website }),
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setUsers([...users, data]);
          alert("User added");
        });

      setNewName("");
      setNewEmail("");
      setNewWebsite("");
    }
  }

  // UPDATE (local state)
  function onchangehandler(id, field, value) {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === id ? { ...user, [field]: value } : user
      )
    );
  }

  // UPDATE (API)
  function updateUser(user) {
    fetch(`https://jsonplaceholder.typicode.com/users/${user.id}`, {
      method: "PUT",
      body: JSON.stringify(user),
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
    })
      .then((res) => res.json())
      .then(() => alert("User updated"));
  }

  // DELETE
  function deleteUser(id) {
    fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
      method: "DELETE",
    }).then(() => {
      setUsers(users.filter((user) => user.id !== id));
      alert("User deleted");
    });
  }

  return (
    <>
      <table className="table">
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
                <EdiText
                  value={user.email}
                  onSave={(val) =>
                    onchangehandler(user.id, "email", val)
                  }
                />
              </td>

              <td>
                <EdiText
                  value={user.website}
                  onSave={(val) =>
                    onchangehandler(user.id, "website", val)
                  }
                />
              </td>

              <td>
                <button
                  className="btn btn-primary"
                  onClick={() => updateUser(user)}
                >
                  Update
                </button>

                <button
                  className="btn btn-danger"
                  onClick={() => deleteUser(user.id)}
                >
                  Delete
                </button>
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
                placeholder="Name.."
                onChange={(e) => setNewName(e.target.value)}
              />
            </td>

            <td>
              <input
                type="text"
                value={newEmail}
                placeholder="Email.."
                onChange={(e) => setNewEmail(e.target.value)}
              />
            </td>

            <td>
              <input
                type="text"
                value={newWebsite}
                placeholder="Website.."
                onChange={(e) => setNewWebsite(e.target.value)}
              />
            </td>

            <td>
              <button className="btn btn-primary" onClick={addUser}>
                Add User
              </button>
            </td>
          </tr>
        </tfoot>
      </table>
    </>
  );
}

export default App;
import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingEdition, setIsLoadingEdition] = useState(false);
  const [updateUsers, setUpdateUsers] = useState(false);
  const [users, setUsers] = useState([]);
  const [showModalCreate, setShowModalCreate] = useState(false);
  const [showModalEdit, setShowModalEdition] = useState(false);
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
  });
  const [formEdition, setFormEdition] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
  });

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleChangeEdition = e => {
    setFormEdition({ ...formEdition, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    setIsLoading(true);
    setShowModalCreate(false);
  };

  const handleSubmitEdition = () => {
    setIsLoadingEdition(true);
    setShowModalEdition(false);
  };

  const handleClickEdition = id => {
    setShowModalEdition(true);
    setFormEdition(users.find(user => user.id === id));
  };

  useEffect(() => {
    if (isLoadingEdition && formEdition.id) {
      setFormEdition({
        name: '',
        phone: '',
        email: '',
        address: '',
      });
      fetch(
        `https://601da02bbe5f340017a19d60.mockapi.io/users/${formEdition.id}`,
        {
          method: 'put',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            fullname: formEdition.fullname,
            address: formEdition.address,
            phone: formEdition.phone,
            email: formEdition.email,
          }),
        },
      )
        .then(res => res.json())
        .then(data => setUpdateUsers(!updateUsers));
    }
  }, [isLoadingEdition]);

  useEffect(() => {
    setForm({
      name: '',
      phone: '',
      email: '',
      address: '',
    });
    if (isLoading) {
      fetch('https://601da02bbe5f340017a19d60.mockapi.io/users', {
        method: 'post', // put // delete // patch
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fullname: form.name,
          address: form.address,
          phone: form.phone,
          email: form.email,
        }),
      })
        .then(res => res.json())
        .then(data => setUpdateUsers(!updateUsers));
    }
  }, [isLoading]);

  useEffect(() => {
    fetch('https://601da02bbe5f340017a19d60.mockapi.io/users')
      .then(res => res.json())
      .then(data => {
        setUsers(data);
        setIsLoading(false);
        setIsLoadingEdition(false);
      });
  }, [updateUsers]);

  return (
    <div>
      {isLoading && <div class="loader"></div>}

      <div className="list__main">
        <div className="list__body">
          <div className="table-title">
            <h2>Manage Employees</h2>
            <button onClick={() => setShowModalCreate(true)}>
              <span>Add New Employee</span>
            </button>
          </div>
          <div className="formularios">
            <input type="text" placeholder="Filter..."></input>
          </div>
          <table id="employees">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Address</th>
                <th>Phone</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, i) => (
                <tr key={user.id + i}>
                  <td>{user.fullname}</td>
                  <td>{user.email}</td>
                  <td>{user.address}</td>
                  <td>{user.phone}</td>
                  <td>
                    <button onClick={() => handleClickEdition(user.id)}>
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {showModalCreate && (
          <div className="modal">
            <div className="modal-form-title">
              <h2>Add Employee</h2>
            </div>
            <form className="modal-form">
              <label>
                Name
                <input
                  type="text"
                  onChange={handleChange}
                  name="name"
                  value={form.name}
                />
              </label>
              <label>
                Email
                <input
                  type="text"
                  onChange={handleChange}
                  name="email"
                  value={form.email}
                />
              </label>
              <label>
                Address
                <input
                  type="text"
                  onChange={handleChange}
                  name="address"
                  value={form.address}
                />
              </label>
              <label>
                Phone
                <input
                  type="text"
                  onChange={handleChange}
                  name="phone"
                  value={form.phone}
                />
              </label>
            </form>
            <div className="div-button">
              <button onClick={() => setShowModalCreate(false)}>Cancel</button>
              <button onClick={handleSubmit}>Add</button>
            </div>
          </div>
        )}

        {showModalEdit && (
          <div className="modal">
            <div className="modal-form-title">
              <h2>Edit Employee</h2>
            </div>
            <form className="modal-form">
              <label>
                Name
                <input
                  type="text"
                  onChange={handleChangeEdition}
                  name="fullname"
                  value={formEdition.fullname}
                />
              </label>
              <label>
                Email
                <input
                  type="text"
                  onChange={handleChangeEdition}
                  name="email"
                  value={formEdition.email}
                />
              </label>
              <label>
                Address
                <input
                  type="text"
                  onChange={handleChangeEdition}
                  name="address"
                  value={formEdition.address}
                />
              </label>
              <label>
                Phone
                <input
                  type="text"
                  onChange={handleChangeEdition}
                  name="phone"
                  value={formEdition.phone}
                />
              </label>
            </form>
            <div className="div-button">
              <button onClick={() => setShowModalEdition(false)}>Cancel</button>
              <button onClick={handleSubmitEdition}>Add</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;

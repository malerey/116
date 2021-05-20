import { useState, useEffect } from 'react';

import Button from './Button';
import Filter from './Filter';
import Modal from './Modal';
import Table from './Table';
import './App.css';

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingEdition, setIsLoadingEdition] = useState(false);
  const [updateUsers, setUpdateUsers] = useState(false);
  const [users, setUsers] = useState([]);
  const [showModalCreate, setShowModalCreate] = useState(false);
  const [showModalEdit, setShowModalEdition] = useState(false);
  const [form, setForm] = useState({
    fullname: '',
    phone: '',
    email: '',
    address: '',
  });
  const [formEdition, setFormEdition] = useState({
    fullname: '',
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
        fullname: '',
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
      fullname: '',
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
          fullname: form.fullname,
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
            <Button
              title="Add new employee"
              action={() => setShowModalCreate(true)}
            />
          </div>
          <Filter />
          <Table users={users} handleClickEdition={handleClickEdition} />
        </div>

        {showModalCreate && (
          <Modal
            title="Add new employee"
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            form={form}
          />
        )}

        {showModalEdit && (
          <Modal
            title="Edit employee"
            handleChange={handleChangeEdition}
            handleSubmit={handleSubmitEdition}
            form={formEdition}
          />
        )}
      </div>
    </div>
  );
}

export default App;

import User from './User'

const Table = ({ users, handleClickEdition}) => {
  return (
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
        {users.map((user, i) => (<User key={id + i} user={user} handleClickEdition={handleClickEdition}/>
        ))}
      </tbody>
    </table>
  );
};

export default Table

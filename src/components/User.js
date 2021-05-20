import Button from './Button'

const User = ({ user, handleClickEdition }) => {
  return (
    <tr key={user.id + i}>
      <td>{user.fullname}</td>
      <td>{user.email}</td>
      <td>{user.address}</td>
      <td>{user.phone}</td>
      <td>
        <Button title="Edit" action={() => handleClickEdition(user.id)} />
      </td>
    </tr>
  );
};

export default User;

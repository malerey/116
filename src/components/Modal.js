import Button from './Button'

const Modal = ({title, handleChange, handleSubmit, form}) => {
  return (
    <div className="modal">
      <div className="modal-form-title">
        <h2>{title}</h2>
      </div>
      <form className="modal-form">
        <label>
          Name
          <input
            type="text"
            onChange={handleChange}
            name="fullname"
            value={form.fullname}
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
      <Button title="Cancel" action={() => setShowModalCreate(false)} />
      <Button title="Add" action={handleSubmit} />
      </div>
    </div>
  );
};


export default Modal

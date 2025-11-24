import { useState } from "react";

export default function OneContact() {
  const [nameQuery, setNameQuery] = useState("");
  const [contact, setContact] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSearch() {
    setContact(null);
    setErrorMessage("");

    const trimmed = nameQuery.trim();
    if (trimmed === "") {
      setErrorMessage("Please enter a name.");
      return;
    }

    try {
      const encoded = encodeURIComponent(trimmed);
      const res = await fetch(`http://localhost:8081/contacts/${encoded}`);

      if (res.status === 404) {
        setErrorMessage("Contact not found.");
        return;
      }

      const data = await res.json();
      setContact(data);
    } catch (err) {
      console.error(err);
      setErrorMessage("Error loading contact.");
    }
  }

  function renderContactCard(contact) {
    const { contact_name, phone_number, message, image_url } = contact;

    return (
      <div className="col">
        <div className="card shadow-sm">
          <img src={image_url} className="card-img-top" alt="Contact" />
          <div className="card-body">
            <p className="card-text">
              <strong>{contact_name}</strong>
              <br />
              {phone_number}
              <br />
              {message}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h2>Find One Contact</h2>

      <div className="row g-2 mb-4 align-items-center">
        <div className="col-md-6">
          <input
            className="form-control"
            placeholder="Enter Contact Name"
            value={nameQuery}
            onChange={(e) => setNameQuery(e.target.value)}
          />
        </div>
        <div className="col-auto">
          <button className="btn btn-primary" onClick={handleSearch}>
            Search
          </button>
        </div>
      </div>

      {errorMessage && (
        <div className="alert alert-warning">{errorMessage}</div>
      )}

      {contact && (
        <div className="album py-5 bg-body-tertiary">
          <div className="container">
            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-3">
              {renderContactCard(contact)}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

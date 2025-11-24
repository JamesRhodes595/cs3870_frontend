import { useEffect, useState } from "react";

const BACKEND_URL = "http://localhost:8081"; // Express+Mongo backend

function Contacts() {
    // State for all contacts
    const [contacts, setContacts] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");

    // Load all contacts on mount
    useEffect(() => {
        loadAllContacts();
    }, []);

    // Fetch all contacts from backend
    async function loadAllContacts() {
        try {
            setErrorMessage("");

            const response = await fetch(`${BACKEND_URL}/contacts`);

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            setContacts(data);
        } catch (err) {
            console.error("Error loading contacts:", err);
            setErrorMessage("Failed to load contacts.");
        }
    }

    // Render one contact card
    function renderContactCard(contact) {
        const { contact_name, phone_number, message, image_url } = contact;

        return (
            <div className="col" key={contact_name}>
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
        <div className="container py-4">
            <h1 className="mb-4">Contacts (React + Express + MongoDB)</h1>

            {errorMessage && (
                <div className="alert alert-warning" role="alert">
                    {errorMessage}
                </div>
            )}

            {/* ALL CONTACTS ONLY */}
            <section>
                <div className="d-flex justify-content-between align-items-center mb-2">
                    <h2 className="mb-0">All Contacts</h2>
                    <button
                        className="btn btn-secondary btn-sm"
                        onClick={loadAllContacts}
                    >
                        Reload All
                    </button>
                </div>

                <div className="album py-5 bg-body-tertiary">
                    <div className="container">
                        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-3">
                            {contacts.map((contact) => renderContactCard(contact))}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Contacts;

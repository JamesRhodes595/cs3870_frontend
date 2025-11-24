import { useState } from "react";

const BACKEND_URL = "https://cs3870-backend-hq0q.onrender.com";

export default function AddContact() {
    const [contact_name, setName] = useState("");
    const [phone_number, setPhone] = useState("");
    const [message, setMessage] = useState("");
    const [image_url, setImage] = useState("");
    const [responseMsg, setResponseMsg] = useState("");

    async function handleSubmit(e) {
        e.preventDefault();
        setResponseMsg("");

        try {
            const response = await fetch(`${BACKEND_URL}/contacts`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    contact_name,
                    phone_number,
                    message,
                    image_url,
                }),
            });

            const data = await response.json();
            setResponseMsg(data.message || "Done!");

            // Optional: clear inputs after success
            if (response.ok) {
                setName("");
                setPhone("");
                setMessage("");
                setImage("");
            }

        } catch (err) {
            setResponseMsg("Error: " + err.message);
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit} className="d-flex flex-column gap-3">

                <input
                    className="form-control"
                    placeholder="Contact Name"
                    value={contact_name}
                    onChange={(e) => setName(e.target.value)}
                />

                <input
                    className="form-control"
                    placeholder="Phone Number"
                    value={phone_number}
                    onChange={(e) => setPhone(e.target.value)}
                />

                <input
                    className="form-control"
                    placeholder="Message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                />

                <input
                    className="form-control"
                    placeholder="Image URL"
                    value={image_url}
                    onChange={(e) => setImage(e.target.value)}
                />

                <button className="btn btn-primary">Add Contact</button>

            </form>

            {responseMsg && (
                <p className="alert alert-info mt-3">{responseMsg}</p>
            )}
        </div>
    );
}

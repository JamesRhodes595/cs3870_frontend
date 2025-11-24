import React, { useState } from "react";

const BACKEND_URL = "https://cs3870-backend-hq0q.onrender.com";

function UpdateContact() {
    const [originalName, setOriginalName] = useState("");
    const [newName, setNewName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [message, setMessage] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [responseMsg, setResponseMsg] = useState("");

    const handleUpdate = async (e) => {
        e.preventDefault();
        setResponseMsg("");

        const trimmedOriginal = originalName.trim();
        if (!trimmedOriginal) {
            setResponseMsg("Please enter the existing contact name.");
            return;
        }

        try {
            const encodedName = encodeURIComponent(trimmedOriginal);

            const res = await fetch(
                `${BACKEND_URL}/contacts/${encodedName}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        contact_name: newName,
                        phone_number: phoneNumber,
                        message: message,
                        image_url: imageUrl,
                    }),
                }
            );

            const data = await res.json().catch(() => null);

            if (!res.ok) {
                setResponseMsg(
                    data?.message ||
                    `Failed to update contact (HTTP ${res.status}).`
                );
            } else {
                setResponseMsg(
                    data?.message ||
                    `Contact '${trimmedOriginal}' updated successfully.`
                );
            }
        } catch (err) {
            console.error("PUT error:", err);
            setResponseMsg("Network error: Could not connect to the server.");
        }
    };

    return (
        <div>
            <h2>Update Contact</h2>

            <form onSubmit={handleUpdate} className="d-flex flex-column gap-3">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Existing Name (to find)"
                    value={originalName}
                    onChange={(e) => setOriginalName(e.target.value)}
                />

                <input
                    type="text"
                    className="form-control"
                    placeholder="New Name"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                />

                <input
                    type="text"
                    className="form-control"
                    placeholder="New Phone Number"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                />

                <input
                    type="text"
                    className="form-control"
                    placeholder="New Message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                />

                <input
                    type="text"
                    className="form-control"
                    placeholder="New Image URL"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                />

                <button type="submit" className="btn btn-warning">
                    Update Contact
                </button>
            </form>

            {responseMsg && (
                <p className="alert alert-info mt-3" role="alert">
                    {responseMsg}
                </p>
            )}
        </div>
    );
}

export default UpdateContact;

'use client'

import React, { useState } from 'react';

interface FormData {
    email: string;
}



const DeleteUser = () => {
    const [formData, setFormData] = useState<FormData>({ email: '' });

    const deleteUser = () => fetch('/api/users', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => console.log('Success:', data))
        .catch(error => console.error('Error:', error));



    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Form submitted:', formData);
        deleteUser();
        // Perform actions with formData, e.g., send to API
    };

    return (
        <form onSubmit={handleSubmit}>
            <p>
                <label>
                    Email:
                    <input type="email" name="email" value={formData.email} onChange={handleChange} />
                </label>
            </p>

            <button type="submit">Submit</button>
        </form>
    );
};

export default DeleteUser;
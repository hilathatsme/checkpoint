'use client'

import React, { useState } from 'react';

interface FormData {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}



const CreateUser = () => {
    const [formData, setFormData] = useState<FormData>({ firstName: '', lastName: '', email: '', password: '' });

    const postReqToUsers = () => fetch('/api/users', {
        method: 'POST',
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
        postReqToUsers();
        // Perform actions with formData, e.g., send to API
    };

    return (
        <form onSubmit={handleSubmit}>
            <div><label>
                First Name:
                <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} />
            </label>
            </div>
            <div><label>
                Last Name:
                <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} />
            </label>
            </div>
            <div>
                <label>
                    Email:
                    <input type="email" name="email" value={formData.email} onChange={handleChange} />
                </label>
            </div>
            <div>
                <label>
                    Password:
                    <input type="password" name="password" value={formData.password} onChange={handleChange} />
                </label>
            </div>

            <button type="submit">Submit</button>
        </form>
    );
};

export default CreateUser;
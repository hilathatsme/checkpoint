'use client'

import React, { useCallback, useEffect, useState } from "react";

interface UserData {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

const UserList = () => {
    const [list, setList] = useState<UserData[]>([]);

    const getUsers = () => fetch('/api/users', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then(async response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const res = await response.json();
            setList(res.data);
            return response.json();
        })
        .then(data => console.log('Success:', data))
        .catch(error => console.error('Error:', error));



    useEffect(() => {
        getUsers();
    }, [getUsers]);

    useEffect(() => {
        list !== null && console.log(list)
    }, [list]);


    const usersData = list.map(a =>
        <>`First Name: ${a?.firstName}, Last Name: ${a?.lastName}, Email: ${a?.email}`</>

    );



    return <div>
        <p>data will show here</p>
        {usersData ?? 'Loading...'}
    </div>
}

export default UserList;
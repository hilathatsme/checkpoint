'use client'

import React, { useEffect, useState } from "react";

interface UserData {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

const UserList = () => {
    const [list, setList] = useState<UserData[]>([]);

    const getUsers = () => fetch('/api/allusers')
        .then(async response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const res = await response.json();
            console.log('response in client', res)

            setList(res);
        })
        .then(data => console.log('Success:', data))
        .catch(error => console.error('Error:', error));



    useEffect(() => {
        getUsers();
    }, [getUsers]);

    useEffect(() => {
        list !== null && console.log(list)
    }, [list]);


    const usersData = list && list.map(a =>
        <p>First Name: {a?.firstName}, Last Name: {a?.lastName}, Email: {a?.email}</p>);



    return <div>
        <p>data will show here</p>
        {usersData ?? 'Loading...'}
    </div>
}

export default UserList;
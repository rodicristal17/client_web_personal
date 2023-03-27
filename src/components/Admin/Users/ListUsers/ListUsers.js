import React, { useState, useEffect } from 'react'
import { User } from "../../../../api";
import { useAuth } from "../../../../hooks";

const userController = new User();


export function ListUsers(props) {
    const { usersActive } = props;
    const [users, setUsers] = useState(null);
    const { accessToken } = useAuth();

    console.log(users);

    useEffect(() => {
        (async () => {
            try {
                const response = await userController.getUsers(accessToken, usersActive);
                setUsers(response)

            } catch (error) {
                console.error(error);
            }
        })()
    }, [usersActive])



    return (
        <div>
            <h2>Estamos viendo los usuarios</h2>
            <p>{usersActive ? "Activos" : "Inactivos"}</p>
        </div>
    )
}

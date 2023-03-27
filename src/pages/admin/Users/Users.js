import React, { useState } from 'react'
import { Tab, Button } from "semantic-ui-react";
import { BasicModal } from "../../../components/Shared";
import { UserForm, ListUsers } from "../../../components/Admin/Users";
import "./Users.scss";

export function Users() {

  const [showModal, setShowModal] = useState(false);
  const onOpenCloseModal = () => setShowModal((prevState) => !prevState);

  const panes = [
    {
      menuItem: "Usuarios activos",
      render: () => (
        <Tab.Pane attached={false}>
          <ListUsers usersActive={true} />
        </Tab.Pane>
      )
    },
    {
      menuItem: "Usuarios inactivos",
      render: () => (
        <Tab.Pane attached={false}>
          <ListUsers usersActive={false} />
        </Tab.Pane>
      )
    }
  ]
  return (
    <>
      <div className='users-page'>
        <Button className='users-page__add' primary onClick={onOpenCloseModal}>
          Nuevo Usuario
        </Button>
        <Tab menu={{ secondary: true }} panes={panes} />
      </div>

      <BasicModal show={showModal} close={onOpenCloseModal} title="Crear nuevo usuario">
        <UserForm close={onOpenCloseModal} />
      </BasicModal>
    </>
  )
}

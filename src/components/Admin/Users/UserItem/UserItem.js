import React, { useState } from 'react';
import { Image, Button, Icon, Confirm } from "semantic-ui-react";
import { image } from "../../../../assets";
import { ENV } from "../../../../utils";
import "./UserItem.scss";
import { BasicModal } from "../../../Shared";

export function UserItem(props) {
    const { user } = props;
    const [showModal, setShowModal] = useState(false);
    const [titleModal, setTitleModal] = useState("");

    const onOpenCloseModal = () => setShowModal((prevState) => !prevState);
    const openUpdateUser = () => {
        setTitleModal(`Actualizar ${user.email}`);
        onOpenCloseModal();
    }


    return (
        <>
            <div className='user-item'>
                <div className='user-item__info'>
                    <Image avatar src={user.avatar ? `${ENV.BASE_PATH}/${user.avatar}` : image.noAvatar} />
                    <div>
                        <p>{user.firstname} {user.lastname}</p>
                        <p>{user.email}</p>
                    </div>
                </div>

                <div>
                    <Button icon primary onClick={openUpdateUser}>
                        <Icon name='pencil' />
                    </Button>
                    <Button icon color={user.active ? "orange" : "teal"}>
                        <Icon name={user.active ? "ban" : "check"} />
                    </Button>
                    <Button icon color='red'>
                        <Icon name='trash' />
                    </Button>
                </div>
            </div>

            <BasicModal show={showModal} close={onOpenCloseModal} title={titleModal}>
                <p>UserForm</p>
            </BasicModal>
        </>
    )
}

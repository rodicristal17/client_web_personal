import React, { useState } from 'react';
import "./MenuItem.scss";
import { Button, Icon, Confirm } from "semantic-ui-react";
import { BasicModal } from "../../../Shared";
import { MenuForm } from "../MenuForm";
import { Menu } from "../../../../api";
import { useAuth } from "../../../../hooks";

const menuController = new Menu();

export function MenuItem(props) {
    const { menu } = props;
    const { accessToken } = useAuth();

    const [showModal, setShowModal] = useState(false);
    const [titleModal, setTitleModal] = useState("");

    const onOpenCloseModal = () => setShowModal((prevState) => !prevState);

    const openUpdateMenu = () => {
        setTitleModal(`Actualizar menu: ${menu.title}`);
        onOpenCloseModal();
    }

    return (
        <>
            <div className='menu-item'>
                <div className='menu-item__info'>
                    <span className='menu-item__info-title'>{menu.title}</span>
                    <span className='menu-item__info-path'>{menu.path}</span>
                </div>

                <div>
                    <Button icon primary>
                        <Icon name='pencil' />
                    </Button>
                    <Button icon color={menu.active ? "orange" : "teal"}>
                        <Icon name={menu.active ? "ban" : "check"} />
                    </Button>
                    <Button icon color='red'>
                        <Icon name='trash' />
                    </Button>
                </div>
            </div>

            <BasicModal show={showModal} close={onOpenCloseModal} title={titleModal}>
                <MenuForm onClose={}/>
            </BasicModal>
        </>
    );
}

import React from "react";

import Typography from "../../../shared/ui/typography/Typography";
import GroupButtons from "../../../shared/ui/group_buttons/GroupButtons";
import Button from "../../../shared/ui/button/Button";
import Block from "../../../shared/ui/block/Block";
import {useAppContext} from "../../../context/AppContext";

import Logger from '../../../internal/Logger';
import Modal from "../../../shared/ui/modal/Modal";
const logger = new Logger('Logout');
export default function LogoutForm({onClose=f=>f}) {

    const { authHandler } = useAppContext();
    const { logout } = authHandler;

    return(<>
        <Modal minWidth={360} maxWidth={400} onClose={onClose}>
            <Block isAlignCenter={true}>
                <Typography weight={700} size={24} bottom={12} align={'center'}>Вы точно хотите выйти из аккаунта?</Typography>
                {/*<Typography weight={500} size={16} color={'#65727D'} align={'center'}>Мы можем помочь вам найти вам идеальный вариант согласно вашим запросам</Typography>*/}
            </Block>

            <GroupButtons top={20}>
                <Button onClick={async e => {
                    logger.log(await logout());
                    // navigate('/');
                }}>Выйти</Button>
                <Button variant={'cancel'} onClick={onClose}>Отмена</Button>
            </GroupButtons>
        </Modal>
    </>)
}
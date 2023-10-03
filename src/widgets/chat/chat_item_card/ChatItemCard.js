import React from 'react'
import Card from "../../../shared/ui/card/Card";
import CardServiceHeader from "../../../shared/ui/card_service/CardServiceHeader";
import CardServiceBody from "../../../shared/ui/card_service/CardServiceBody";
import CardServiceFooter from "../../../shared/ui/card_service/CardServiceFooter";
import Typography from "../../../shared/ui/typography/Typography";
import GroupFlex from "../../../shared/ui/group_flex/GroupFlex";
import ButtonLike from "../../../shared/ui/button_like/ButtonLike";
import CardService from "../../../shared/ui/card_service/CardService";
import Gallery from "../../../shared/ui/gallery/Gallery";
import Stars from "../../../shared/ui/stars/Stars";
import Chip from "../../../shared/ui/chip/Chip";
import CardHeader from "../../../shared/ui/card/CardHeader";
import CardBody from "../../../shared/ui/card/CardBody";
import Badge from "../../../shared/ui/badge/Badge";
import Avatar from "../../../shared/ui/avatar/Avatar";

export default function ChatItemCard({
     key,
     name='Название чата',
     unread_num,
     last_message,
     onClick=f=>f,
}) {


    const style = {
        width: '100%',
        display: 'flex',

    }

    return(<>
        <CardService onClick={onClick}>
            <CardBody>
                <div style={style}>
                    <Avatar right={12} />
                    <div style={{width: '100%'}}>
                        <GroupFlex align={'ais'} justify={'jcsb'}>
                            <div>
                                <div><Typography size={16} weight={600} bottom={2}>{name}</Typography></div>
                                <div> <Typography size={16} weight={600} bottom={4} color={'#959BA1'}>{`Заказ #${key}`}</Typography></div>
                            </div>
                            {unread_num > 0 && <Badge text={unread_num.toString()} />}
                        </GroupFlex>
                        <div>
                            <Typography size={14} weight={500} bottom={2} color={'#959BA1'}>{last_message}</Typography>
                        </div>
                    </div>
                </div>
            </CardBody>
        </CardService>
    </>)
}
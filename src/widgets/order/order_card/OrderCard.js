import React, {useEffect, useMemo} from 'react'

import {useAppContext} from "../../../context/AppContext";

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
import Logger from "../../../internal/Logger";

import getOrderInfo from "../../../internal/order/getOrderInfo";
import getBookingInfo from "../../../internal/order/getBookingInfo";

export default function OrderCard({ order={}, onClick=f=>f }) {
    const logger = useMemo(()=>new Logger('OrderCard'), []);

    const {orderHandler} = useAppContext();
    const {extendedOrders} = orderHandler;

    const extendedOrder = extendedOrders.find(eo => eo.id === order.id);
    const firstBookingInfo = getBookingInfo(extendedOrder.bookings[0], extendedOrder);
    const orderInfo = getOrderInfo(extendedOrder);

    return(<>
        <CardService onClick={onClick}>

            <CardBody>
                <GroupFlex align={'ais'} justify={'jcsb'}>
                    <div>
                        <div><Typography size={16} weight={600} bottom={2}>{firstBookingInfo.name}</Typography></div>
                        <div> <Typography size={16} weight={600} bottom={4} color={'#959BA1'}>Заказ #{orderInfo.last4IDDigits}</Typography></div>
                        <div> <Typography size={16} weight={600} bottom={4} color={'#959BA1'}>{firstBookingInfo.customerName}</Typography></div>
                    </div>
                    <Chip text={orderInfo.status.text} variant={orderInfo.status.variant} />
                </GroupFlex>
            </CardBody>

            <CardBody>
                <div>
                    <Typography size={14} weight={500} bottom={2}>{firstBookingInfo.start_date} - {firstBookingInfo.final_date} - {firstBookingInfo.number_of_adults}</Typography>
                </div>
                <div>
                    <Typography size={14} weight={500} bottom={2} color={'#959BA1'}>{firstBookingInfo.description}</Typography>
                </div>
            </CardBody>

        </CardService>
    </>)
}
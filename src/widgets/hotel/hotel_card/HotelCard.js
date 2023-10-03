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


export default function HotelCard({title='', price='', addInfo='', onClick=f=>f}) {


    return(<>
        <CardService onClick={onClick}>
            <CardServiceHeader>
                <Stars />
                {title}
            </CardServiceHeader>
            <CardServiceBody>
                <Gallery height={160} />
            </CardServiceBody>
            <CardServiceFooter>
                <GroupFlex>
                    <div>
                        <div><Typography size={16} weight={700} bottom={4}>{price}</Typography></div>
                        <div><Typography size={12} weight={500}>{addInfo}</Typography></div>
                    </div>
                    <ButtonLike />
                </GroupFlex>
            </CardServiceFooter>
        </CardService>
    </>)
}
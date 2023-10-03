import React, { useState, useEffect } from 'react';

import Box from '../../shared/ui/box/Box'
import NavigationPanel from '../../widgets/navigation_panel/NavigationPanel';

import ServiceChoice from "../../widgets/service_choice/ServiceChoice";
import Container from "../../shared/ui/box/Container";
import Logo from "../../shared/ui/logo/Logo";
import Block from "../../shared/ui/block/Block";
import EventCategoryTabs from "../../widgets/event/event_category_tabs/EventCategoryTabs";
import AppBar from "../../shared/ui/app_bar/AppBar";
import GroupInline from "../../shared/ui/group_inline/GroupInline";
import Nav from "../../shared/ui/nav/Nav";
import NavLink from "../../shared/ui/nav/NavLink";
import Button from "../../shared/ui/button/Button";
import EventPublishAction from "../../widgets/event/event_publish_action/EventPublishAction";
import Typography from "../../shared/ui/typography/Typography";
import EventLocationSelect from "../../widgets/event/event_location_select/EventLocationSelect";
import EventList from "../../widgets/event/event_list/EventList";
import ToggleButtonWrapper from "../../shared/ui/toggle_button/ToggleButtonWrapper";
import MapModal from "../../widgets/map/Map";
import Leaflet from "../../widgets/map/Leaflet";
import {useAppContext} from "../../context/AppContext";
import Burger from "../../widgets/burger/Burger";
import HorizontalList from "../../shared/ui/horizontal_list/HorizontalList";
import EventCard from "../../widgets/event/event_card/EventCard";
import HorizontalListItem from "../../shared/ui/horizontal_list/HorizontalListItem";
import AppFooter from "../../widgets/app_footer/AppFooter";
import styles from "../../shared/ui/box/box.module.css";
import Banner from "../../widgets/banner/Banner";
import {useNavigate} from "react-router-dom";
import ToggleTheme from "../../widgets/toggle_them/ToggleTheme";
import EventsConf from "../../widgets/events_conf/EventsConf";

export default function New(){

    const navigate = useNavigate();
    const { authHandler, adaptiveHandler } = useAppContext();
    const { user, isAuthenticated, userLoading, isOffline } = authHandler;
    const { device } = adaptiveHandler;

    const eventsInfo = [
        {id: 1, caption: 'Название', start_date: '', end_date: '', registration_deadline: '', cost: null},
        {id: 2, caption: 'Название мероприятия воркшоп по анау мынау', start_date: '', end_date: '', registration_deadline: '', cost: null},
        {id: 3, caption: 'Название мероприятия', start_date: '', end_date: '', registration_deadline: '', cost: null},
        {id: 4, caption: 'Название мероприятия воркшоп по анау мынау мероприятия воркшоп по анау мынау', start_date: '', end_date: '', registration_deadline: '', cost: null},
        {id: 5, caption: 'Название мероприятия воркшоп по анау мынау', start_date: '', end_date: '', registration_deadline: '', cost: null},
        // {id: 6, caption: 'Название мероприятия воркшоп по анау мынау', start_date: '', end_date: '', registration_deadline: '', cost: null},
    ]

    const events = [
        // {id: 1, name: 'Event1', description: 'descr1', coordinates: {lat: 71.40785727041447, lng: 51.100919392489374}, },
        {id: 2, caption: 'Event2', description: 'descr2', coordinates: [51.11170294584818,71.40717028568645], },
        {id: 3, caption: 'Event3', description: 'descr3', coordinates: [51.127011269153854,71.41266616351251], },
        {id: 4, caption: 'Event4', description: 'descr4', coordinates: [51.117525018611616,71.43190173591029], },
        {id: 5, caption: 'Event5', description: 'descr5', coordinates: [51.13886634304586,71.4288103046323], },
        {id: 6, caption: 'Event6', description: 'descr6', coordinates: [51.08603395715704,71.42297093444037], },
        {id: 7, caption: 'Event7', description: 'descr7', coordinates: [51.1026449300918,71.4332757053682], },
    ]

    return (
        <>
            {/*<AppBar padding={'10px'}>*/}
            {/*    <GroupInline>*/}
            {/*        {device !== 'mobile'*/}
            {/*            ? <>*/}
            {/*                <Logo />*/}
            {/*                <Nav left={40}>*/}
            {/*                    <NavLink text={'Главная'} onClick={e => navigate('/', {replace: true,})}/>*/}
            {/*                    /!*<NavLink text={'Мероприятия'} onClick={e => navigate('/event', {replace: true,})}/>*!/*/}
            {/*                    /!*<NavLink text={'Блог'}/>*!/*/}
            {/*                </Nav>*/}
            {/*            </>*/}
            {/*            : <Burger />*/}
            {/*        }*/}
            {/*    </GroupInline>*/}

            {/*    <GroupInline>*/}
            {/*        <ToggleTheme />*/}
            {/*        /!*<Block left={20} width={'auto'}><EventPublishAction /></Block>*!/*/}
            {/*    </GroupInline>*/}
            {/*</AppBar>*/}
            <Box navbar={true} isDesktop={device === 'desktop'}>
                <Leaflet markersData={events} />
                {/*<EventsConf />*/}
                {/*<Banner slides={[1,2,3,4,5]} />*/}
                {/*<HorizontalList title={'Воркшопы'}>*/}
                {/*    {eventsInfo.map( (eventInfo, eventIndex) => {*/}
                {/*        return(<>*/}
                {/*            <HorizontalListItem key={eventIndex}>*/}
                {/*                <EventCard item={eventInfo} />*/}
                {/*            </HorizontalListItem>*/}
                {/*        </>)*/}
                {/*    })}*/}
                {/*</HorizontalList>*/}
                {/*<HorizontalList title={'Конференции'}>*/}
                {/*    {eventsInfo.map( (eventInfo, eventIndex) => {*/}
                {/*        return(<>*/}
                {/*            <HorizontalListItem key={eventIndex}>*/}
                {/*                <EventCard item={eventInfo} />*/}
                {/*            </HorizontalListItem>*/}
                {/*        </>)*/}
                {/*    })}*/}
                {/*</HorizontalList>*/}
                {/*<HorizontalList title={'Митапы'}>*/}
                {/*    {eventsInfo.map( (eventInfo, eventIndex) => {*/}
                {/*        return(<>*/}
                {/*            <HorizontalListItem key={eventIndex}>*/}
                {/*                <EventCard item={eventInfo} />*/}
                {/*            </HorizontalListItem>*/}
                {/*        </>)*/}
                {/*    })}*/}
                {/*</HorizontalList>*/}
            </Box>
            {/*{(device === 'mobile' || device === 'tablet') ? <NavigationPanel /> : <AppFooter /> }*/}
        </>
    )
}

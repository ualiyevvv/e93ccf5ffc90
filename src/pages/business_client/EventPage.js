import React from 'react';

import Box from '../../shared/ui/box/Box'
import NavigationPanel from '../../widgets/navigation_panel/NavigationPanel';

import AppBar from "../../shared/ui/app_bar/AppBar";
import {useAppContext} from "../../context/AppContext";
import {useNavigate} from "react-router-dom";
import GroupInline from "../../shared/ui/group_inline/GroupInline";
import Logo from "../../shared/ui/logo/Logo";
import Nav from "../../shared/ui/nav/Nav";
import NavLink from "../../shared/ui/nav/NavLink";
import Block from "../../shared/ui/block/Block";
import EventPublishAction from "../../widgets/event/event_publish_action/EventPublishAction";
import AppFooter from "../../widgets/app_footer/AppFooter";
import Container from "../../shared/ui/box/Container";
import IconLocation from '../../assets/icons/location_on_FILL0_wght400_GRAD0_opsz48.svg'
import IconCalendar from '../../assets/icons/event_FILL0_wght400_GRAD0_opsz48.svg'

import './eventPage.css'
import EventSlider from "../../widgets/event/event_slider/EventSlider";
import ToggleTheme from "../../widgets/toggle_them/ToggleTheme";

export default function EventPage(){

    const { authHandler, adaptiveHandler } = useAppContext();
    const { user, isAuthenticated, userLoading, isOffline } = authHandler;
    const { device } = adaptiveHandler;

    const navigate = useNavigate()

    const eventsInfo = {
        caption: 'Митап для QA инженеров от KoronaPay',
        description: `🌟 Meetup: "Визуализация данных при помощи WebGL"
⠀
🔍 Хочешь погрузиться в мир визуализации данных в вебе? Тогда этот митап именно для тебя! Присоединяйся к нам и узнай все об особенностях и применении WebGL.
⠀
🎙Эксперт в этой области – Роман Башарин поделится практическими примерами применения WebGL в проектах из сферы drug research.
⠀
Роман уже более 10 лет в IT, работал над десятками приложений в сферах от e-commerce до фондов благотворительности. Написал 5 собственных фреймворков, прежде чем достиг просветления и начал использовать готовые.
⠀
🏢 Quantori — ведущая международная IT-компания в области здравоохранения и медицинской биологии, создает интеллектуальные проекты, применяя инновационные технологии и научную экспертизу.
⠀
Не упусти шанс узнать о популярных способах визуализации данных в web, научиться работать с 3D и WebGL, а также погрузиться в мир Life Science разработки.
⠀
❗️ Регистрируйся на митап по ссылке https://forms.amocrm.ru/rrdwvxm`,
        start_date: '21 сентября',
        address: "Astana Hub (Астана, пр-т. Мангилик Ел. 55/8, павильон С4.6), зал Event hall",
        end_date: '31 октября',
        registration_deadline: '',
        cost: null
    }

    function toDisplayedLinkText(text) {
        if (text) {
            // Регулярное выражение для поиска ссылки
            const linkRegex = /(https?:\/\/[^\s]+)/g;

            // Замена ссылок в тексте на ссылки с тегом <a>
            let replacedText = text.replace(linkRegex, function (url) {
                return '<a href="' + url + '">' + url + '</a>';
            });
            // // Замена символа новой строки (\n) на тег <br>
            // replacedText = replacedText.replace(/\n/g, '<br>');
            //
            // // Замена символа табуляции (\t) на тег <span> с CSS классом для отступа
            // replacedText = replacedText.replace(/\t/g, '<span class="tab"></span>');
            //
            // // Замена символа возврата каретки (\b) на тег <span> с CSS классом для удаления символа
            // replacedText = replacedText.replace(/\b/g, '<span class="backspace"></span>');

            return replacedText
        }
    }

    return (<>
        <AppBar padding={'10px'}>
            {device !== 'mobile' ? <GroupInline>
                    <Logo />
                    <Nav left={40}>
                        <NavLink text={'Главная'} onClick={e => navigate('/', {replace: true,})}/>
                        <NavLink text={'Мероприятия'} onClick={e => navigate('/event', {replace: true,})}/>
                        <NavLink text={'Блог'}/>
                    </Nav>
                </GroupInline> : <>
                    <button onClick={e => {navigate(-1)}}>back</button>
                </>
            }

            <GroupInline>
                <ToggleTheme />
                <Block left={20} width={'auto'}><EventPublishAction /></Block>
            </GroupInline>
        </AppBar>
        <Box navbar={true} isDesktop={device === 'desktop'}>
            <EventSlider photos={[1,2,3,4]}/>

            <Container>
                <div className="event-page">
                    <div className="event-page__title">{eventsInfo?.caption}</div>
                    <div className="event-page__categories">
                        <div className="event-page__category">category1gory</div>
                        <div className="event-page__category">category2cat</div>
                        <div className="event-page__category">category3</div>
                        <div className="event-page__category">category4category</div>
                    </div>
                    <div className="event-page-row">
                        <div className="event-page-block">
                            <div className="event-page-block__icon">
                                <IconLocation width={25} height={25} />
                            </div>
                            <div className="event-page-block__text">
                                {eventsInfo?.address}
                            </div>
                        </div>
                        <div className="event-page-block">
                            <div className="event-page-block__icon">
                                <IconCalendar width={25} height={25} />
                            </div>
                            <div className="event-page-block__text">
                                {eventsInfo?.start_date} {eventsInfo?.end_date && ' - '+eventsInfo?.end_date}
                            </div>
                        </div>
                    </div>
                    {/*<div className="event-page-block">*/}
                    {/*    <div className="event-page-block__icon">*/}

                    {/*    </div>*/}
                    {/*    <div className="event-page-block__text">*/}

                    {/*    </div>*/}
                    {/*</div>*/}
                    <div className="event-page-description">
                        <div className="event-page-description__title">
                            Описание
                        </div>
                        <div className="event-page-description__text"
                             dangerouslySetInnerHTML={{ __html: toDisplayedLinkText(eventsInfo?.description) }}
                        >
                            {/*<pre>*/}
                            {/*    {toDisplayedLinkText(eventsInfo?.description)}*/}
                            {/*</pre>*/}
                        </div>
                    </div>
                    {/*<EventPageHeader />*/}
                </div>
            </Container>
        </Box>
        {(device === 'mobile' || device === 'tablet') ? <NavigationPanel /> : <AppFooter /> }
    </>)
}
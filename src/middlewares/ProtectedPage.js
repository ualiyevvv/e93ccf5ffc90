import React, {useEffect} from 'react';

import {useAppContext} from "../context/AppContext";

import Logger from '../internal/Logger';
import {Navigate, useNavigate} from "react-router-dom";
import Alert from "../shared/ui/alert/Alert";
import Block from "../shared/ui/block/Block";
import Loader from "../shared/ui/loader/Loader";
import Overlay from "../shared/ui/overlay/Overlay";
import Loading from "../shared/loading/Loading";
import Modal from "../shared/ui/modal/Modal";
import Typography from "../shared/ui/typography/Typography";
const logger = new Logger('ProtectedPage');

/**
 * Тестить нужно с выключенным и включенным сервером для имитации потери сигнала.
 *
 * Нужно пересмотреть. Здесь идет race isAuthenticated, изначально он null и если перейти по ссылке с этим middleware, то он перебросит на /authentication, хотя user(whoami) просто не успел догрузиться.
 * Может быть можно блокировать все, пока userLoading?
 * Решил эту проблему простым бездействием пока userLoading=true
 *
 * Пересмотрел.
 * Добавил проверку на userLoading. Мы не перебрасываем на страницу аутентификации, если userLoading.
 * userLoading изначально true.
 * Сразу при старте приложения, если socket подключен, кидается запрос на whoami.
 * Если socket не подключен то, пользователь продолжает ждать пока socket не выдаст ошибку.
 * Есть причины, почему мы не можем кинуть запрос на whoami, когда сокет не подключен,
 * а вдруг просто связь пропала во время пользования приложением.
 * Ошибка того, что пользователь не аутентифицирован прилетит сразу, а вот ошибка подключения нет, как в принципе и должно быть.
 *
 * Мы ставим обработчик, который каждый раз, когда userLoading и userError меняет состояние, будет проверять аутентифицированность.
 * Почему нужен еще и userError?
 * Например, при отсутствии подключения на первой загрузке у нас прилетает connect_error -> loading=false, user={}, error={message: 'Unauthorized'}
 *
 * if(userLoading) означает неопределенность, он может быть как аутентифицирован, так и нет.
 * if(userLoading && !wasAuthenticated) позволяет не показывать loading, когда пользователь был подключен, но сокет из-за чего-то отключился.
 * if(!userLoading && isAuthenticated) уже точно говорит об аутентифицированности.
 * */
export default function ProtectedPage({ children }){

    const { authHandler, adaptiveHandler } = useAppContext();
    const { user, userLoading, userError, isAuthenticated, wasAuthenticated, isOffline, authenticate } = authHandler;

    // Что вообще должно происходить здесь?
    // оффлайн не повод скидывать нас на страницу аутентификации, поэтому мы перекидываем на home page ('/')
    useEffect(()=>{
        if(userLoading){
            return logger.log("We can't say anything yet, the user is loading");
        }
        // isAuthenticated = (!userLoading && !userError) && Object.keys(user).length > 0, - 100% пользователь аутентифицирован
        // wasAuthenticated = (userLoading || userError) && Object.keys(user).length > 0, - пользователь был аутентифицирован, но соединение прервано или произошла ошибка
        // isOffline = userError?.message === 'xhr poll error' - 100% оффлайн
        logger.log({isAuthenticated, wasAuthenticated, isOffline});
        if(!isAuthenticated && !wasAuthenticated && !isOffline){
            authenticate({ replace: true });
        }

    }, [userLoading, userError])

    const { device } = adaptiveHandler;

    // if(device !== 'mobile' && (!isAuthenticated || isAuthenticated && user.role !== 'admin')){
    //     return <>
    //         <Modal minWidth={360} maxWidth={400}>
    //             <Block isAlignCenter={true}>
    //                 <Typography weight={700} size={24} bottom={12}>Адаптация в разработке</Typography>
    //                 <Typography weight={500} size={16} color={'#65727D'} align={'center'}>Пожалуйста, перейдите на ваше мобильное устройство, чтобы воспользоваться всеми функциями.</Typography>
    //             </Block>
    //         </Modal>
    //     </>
    // }

    // Если был залогинен, то мы не дергаем страницу.
    if(isOffline){
        if(!wasAuthenticated){
            return (<Navigate to={'/'} />);
        }
        return (<>
            <Alert variant={'danger'}>
                <p>offline</p>
            </Alert>
            {children}
        </>);
    }
    else if(userLoading){
        console.log("ProtectedPage.js: user loading");

        return (<>
            <Loading />
            {wasAuthenticated && children}
        </>);
    }
    // Здесь может выдаться непредвиденная ошибка только, потому что в useEffect рассчитываю некоторые ошибки.
    // Никогда не будет выполняться?
    else if(!isAuthenticated) {
        return <p>Unhandled error: {userError?.message}</p>
    }
    else {
        return children;
    }

}
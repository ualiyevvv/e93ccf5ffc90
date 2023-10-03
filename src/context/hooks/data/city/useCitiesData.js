import React, {useEffect, useMemo, useState} from 'react';

import useFreshData from "../../useFreshData";

import Logger from "../../../../internal/Logger";

export default function useCitiesData({ socketHandler }){
    const logger = useMemo(()=>new Logger('useCitiesData'), [])

    const { socket } = socketHandler;

    const { data, upsertData } = useFreshData({ socket, modelName:'city' });

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState();

    useEffect(()=>{
        const abortController = new AbortController();

        preload({ signal: abortController.signal });

        return (() => {
            abortController.abort();
        });
    }, []);

    /** функция должна вызываться в начале приложения, а дальше по просьбе user-а или при изменении user-a подгружать */
    async function preload(opts={ signal: undefined }){
        setLoading(true);
        try{
            // В любом случае, если пользователь не админ, ему вернутся только его заказы, нужно сделать какую-то сортировку для админов.
            const res = await fetch('/api/city/', opts);

            if(!res){
                // Случится только если signal сработает, вообще зачем этот signal, если хук работает в контексте
                return;
            }

            const json = await res.json();

            if(res.status === 200){
                logger.log("success", json);
                upsertData(json);
                setError(null);
            }
            else {
                logger.log("error", json);
                setError(json);
            }
        }
        catch (err){
            logger.log(err);
            setError(err);
        }
        setLoading(false);
    }

    return ({
        cities: data,
        citiesLoading: loading,
        citiesError: error,
    });
}
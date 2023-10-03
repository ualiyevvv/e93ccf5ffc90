import React, {useEffect, useRef, useState} from "react";
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet.markercluster/dist/MarkerCluster.css';
import 'leaflet.markercluster/dist/MarkerCluster.Default.css';
import 'leaflet.markercluster';
import 'leaflet/dist/leaflet.css';
import 'leaflet.locatecontrol';
import markerIcon from './images/marker-icon.png';
import markerIcon2x from './images/marker-icon-2x.png';
import jsonData from './geoJson.json';
import kzJson from './data/country_boundary.geojson'
import kostanayJson from './data/kostanay.geojson'
import villagesJson from './data/villages.geojson'
import regionsJson from './data/regions.geojson'
import didarsJson from './data/output.geojson'

import styles from './map.module.css'


import EventCardMap from "../event/event_card_map/EventCardMap";
import ContentDrawer from "../../shared/ui/content_drawer/ContentDrawer";


import 'leaflet-simple-map-screenshoter';

// import {MapContainer, Marker, Popup, TileLayer} from "react-leaflet";

const InfoCard = ({data= {}, onClose=f=>f}) => {
    const objProps = Object.entries(data);

    return (<>
        {/*<div className={styles.infocard} id={'info'}>*/}
        {/*    <div className={styles.infocard__header}>*/}
        {/*        <div className={styles.infocard__close} onClick={onClose}>X</div>*/}
        {/*    </div>*/}
            <div className="infocard__body">
                <h2>{data['display_name']}</h2>
                {objProps.map(([key, value]) => (
                    <>
                        <tr className={styles.infocard__tr}><td className={styles.infocard__td}>{key}</td><td className={styles.infocard__td}>{value}</td></tr>
                        {/*<strong>:</strong> <br/>*/}
                    </>
                ))}

            </div>
        {/*</div>*/}
    </>)
}

export default function Leaflet({markersData}) {
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

    const geoPosition = [53.214496, 63.632100]
    const mapContainerRef = useRef();
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [infoCard, setInfoCard] = useState(null)

    // Create additional Control placeholders
    function addControlPlaceholders(map) {
        let corners = map._controlCorners,
            l = 'leaflet-',
            container = map._controlContainer;
        function createCorner(vSide, hSide) {
            let className = l + vSide + ' ' + l + hSide;
            corners[vSide + hSide] = L.DomUtil.create('div', className, container);
        }
        createCorner('verticalcenter', 'left');
        createCorner('verticalcenter', 'right');
    }
    useEffect(() => {
        // Создание карты и установка начальных координат и масштаба
        const map = L.map(mapContainerRef.current).setView(geoPosition, 7);

        // Добавление тайлового слоя OpenStreetMap
        // L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        //     attribution: 'Map data &copy; OpenStreetMap contributors',
        // }).addTo(map);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: false,
        }).addTo(map);

        addControlPlaceholders(map);
        // Change the position of the Zoom Control to a newly created placeholder.
        map.zoomControl.setPosition('verticalcenterright');
        // You can also put other controls in the same placeholder.
        L.control.scale({position: 'bottomleft'}).addTo(map);

        // Add the geolocation control
        L.control
            .locate({
                position: 'topright',
                locateOptions: {
                    enableHighAccuracy: true,
                },
                markerStyle: {
                    draggable: true,
                    opacity: 0.5,
                },
                circleStyle: {
                    radius: 200,
                    weight: 2,
                    color: 'blue',
                    fillColor: 'blue',
                    fillOpacity: 0.1,
                },
            })
            .addTo(map);


        L.simpleMapScreenshoter().addTo(map)
        // // Load your local GeoJSON file here
        // fetch(kzJson)
        //     .then((response) => response.json())
        //     .then((data) => {
        //         setGeojsonData(data);
        //     });

        // Function to handle click events on each polygon feature
        function onEachFeature(feature, layer) {
            layer.on('click', function (e) {

                displayPolygonProps(feature.properties);
            });
        }

        // Function to display polygon properties in the 'info' div
        function displayPolygonProps(props) {
            setInfoCard(props)
            setIsContentDrawerActive(true)
        }

        // let kzjsonLayer = L.geoJSON(kzJson, {
        //     onEachFeature: onEachFeature
        // }).addTo(map); // Добавляем GeoJSON слой на карту
        // let kostjsonLayer = L.geoJSON(kostanayJson, {
        //     onEachFeature: onEachFeature
        // }).addTo(map); // Добавляем GeoJSON слой на карту

        // let regionsjsonLayer = L.geoJSON(regionsJson, {
        //     onEachFeature: onEachFeature
        // }).addTo(map); // Добавляем GeoJSON слой на карту
        // map.fitBounds(kzjsonLayer.getBounds());


        // Create a marker cluster group
        const markers = L.markerClusterGroup();


        // Создание иконки маркера
        const customIcon = L.icon({
            iconUrl: markerIcon,
            iconRetinaUrl: markerIcon2x,
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            tooltipAnchor: [16, -28],
            shadowUrl: null,
            shadowSize: null,
            shadowAnchor: null,
        });

        markersData.forEach((markerData) => {
            const { caption, coordinates } = markerData;
            const marker = L.marker(coordinates, {icon: customIcon}).bindPopup(caption);

            marker.on('click', () => {
                // Handle the click event here
                setSelectedEvent(markerData)
                console.log('Marker clicked:', caption);
            });

            markers.addLayer(marker);
        });

        // Добавление слоя GeoJSON в слой с кластеризацией
        // markers.addLayer(geojsonLayer);
        // Add markers to the cluster group
        // const marker1 = L.marker([51.5, -0.09]).bindPopup('Marker 1');
        // const marker2 = L.marker([51.51, -0.1]).bindPopup('Marker 2');
        // const marker3 = L.marker([51.49, -0.08]).bindPopup('Marker 3');
        // markers.addLayers([marker1, marker2, marker3]);

        // Add the marker cluster group to the map
        // map.addLayer(markers);


        // *****
        let villagesMarkers = L.markerClusterGroup();
        L.geoJSON(villagesJson, {
            pointToLayer: function (feature, latlng) {
                let marker = L.marker(latlng, {icon: customIcon});

                marker.on('click', function () {
                    // Access the properties of the GeoJSON feature
                    let properties = feature.properties;

                    // Create a popup with the feature properties
                    let popupContent = "<b>Name:</b> " + properties.name + "<br>" +
                        "<b>Description:</b> " + properties.description;

                    // Bind the popup to the marker and open it
                    marker.bindPopup(popupContent).openPopup();

                    setInfoCard(properties)
                    setIsContentDrawerActive(true)
                });

                // Add the marker to the MarkerClusterGroup
                villagesMarkers.addLayer(marker);
                return marker;
            },
            onEachFeature: function (feature, layer) {
                if (feature.properties && feature.properties.popupContent) {
                    layer.bindPopup(feature.properties.popupContent);
                }
            }
        })
        // .addTo(villagesMarkers);
        // Add the MarkerClusterGroup to the map
        // map.addLayer(villagesMarkers);
        //  !!!******!!!



        // *****
        let didarMarkers = L.markerClusterGroup();
        L.geoJSON(didarsJson, {
            pointToLayer: function (feature, latlng) {
                let marker = L.marker(latlng, {icon: customIcon});

                marker.on('click', function () {
                    // Access the properties of the GeoJSON feature
                    let properties = feature.properties;

                    // Create a popup with the feature properties
                    let popupContent = "<b>Name:</b> " + properties.name + "<br>" +
                        "<b>Description:</b> " + properties.description;

                    // Bind the popup to the marker and open it
                    marker.bindPopup(popupContent).openPopup();

                    setInfoCard(properties)
                    setIsContentDrawerActive(true)
                });

                // Add the marker to the MarkerClusterGroup
                marker.addTo(map)
                // didarMarkers.addLayer(marker);
                return marker;
            },
            onEachFeature: function (feature, layer) {
                if (feature.properties && feature.properties.popupContent) {
                    layer.bindPopup(feature.properties.popupContent);
                }
            }
        })
        // .addTo(villagesMarkers);
        // Add the MarkerClusterGroup to the map
        // map.addLayer(didarMarkers);
        //  !!!******!!!


        // map.addLayer(markers);
        // console.log("valueNames", valueNames);
        return () => {
            // Очистка карты при размонтировании компонента
            map.remove();
        };
    }, []);

    const [isContentDrawerActive, setIsContentDrawerActive] = useState(false);
    const [isLayerDrawerActive, setIsLayerDrawerActive] = useState(false);

    return (<div style={{display:'flex',height: '100%'}}>
        <ContentDrawer isExpand={isLayerDrawerActive} onClose={() => setIsLayerDrawerActive(false)} Body={infoCard && <InfoCard />} />

        <div ref={mapContainerRef} style={{ width: '100%', height: '100%' }}></div>
        {selectedEvent && <EventCardMap item={selectedEvent} />}

        {/*{infoCard && <InfoCard data={infoCard} onClose={() => setInfoCard(null)} /> }*/}
        <ContentDrawer isExpand={isContentDrawerActive} onClose={() => setIsContentDrawerActive(false)} Body={infoCard && <InfoCard data={infoCard}/>} />
    </div>)
}

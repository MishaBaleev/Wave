import { useEffect } from "react";
import "./Contacts.scss";
import mapboxgl from "mapbox-gl";
import 'mapbox-gl/dist/mapbox-gl.css';
import address from "./img/address.png";
import email from "./img/email.png";
import phone from "./img/phone.png";
import sfedu from "./img/sfedu.png";
import foundFPI from "./img/foundFPI.png";
import ictis from "./img/ictis.png";

const Contacts = (props) => {
    useEffect(() => {
        mapboxgl.accessToken = "pk.eyJ1IjoiYmFsZWV2IiwiYSI6ImNsYXBqNmk4dTE5Y3UzcWxiYmt1bTJtcG8ifQ.aE8lRdfDnWq52szIP7gAHw"
        let map = new mapboxgl.Map({
            container: "map",
            style: 'mapbox://styles/mapbox/streets-v12',
            center: [38.943917, 47.203948],
            zoom: 16,
            minZoom: 2,
            attributionControl: false
        })
        new mapboxgl.Marker({"color": "#ff0000"}).setLngLat([38.943917, 47.203948]).addTo(map)
    }, [])

    return <div className="contacts">
        <div className="window">
            <div id="map"/>
            <div className="title">
                <p>Появились вопросы? Свяжись с нами!</p>
            </div>
            <div className="contact_box">
                <img src={address} alt="address"/>
                <p>Улица Чехова, 2, Таганрог, Ростовская область, 347922</p>
            </div>
            <div className="contact_box">
                <img src={email} alt="email"/>
                <p>vmihaylova@sfedu.ru</p>
            </div>
            <div className="partners">
                <img src={sfedu} alt="sfedu"/>
                <img src={ictis} alt="ictis"/>
                <img src={foundFPI} alt="foundFPI"/>
            </div>
            <div className="contact_box">
                <img src={phone} alt="email"/>
                <p>+ 7 (928) 171-05-14</p>
            </div>
        </div>
    </div>
}
export default Contacts
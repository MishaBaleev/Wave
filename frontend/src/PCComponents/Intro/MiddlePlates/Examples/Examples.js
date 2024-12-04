import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import "./Examples.scss";
import Card from "./Card";

const Examples = (props) => {
    const examples = [
        {
            description: "БАС гоночного типа предназначен для быстрого преодоления малых расстояний с преимущественно ручным управлением посредством установки бортовой камеры.",
            price: 73040,
            //31900
            frame: "Holybro Kopis Cinematic X8 7",
            frame_url: "https://rccopter.ru/product/karbonovaya-rama-holybro-kopis-cinematic-x8-7-frame-kit",
            //16610
            battery: "АКБ Gens Ace 5000mAh 6S1P",
            battery_url: "https://rccopter.ru/product/akb-gens-ace-tattu-5000mah-6s1p-45c-222v-lipo-battery-pack-ec5",
            //3850
            motor: "T-Motor VELOX V2808 KV1300",
            motor_url: "https://rccopter.ru/product/t-motor-velox-v2808-kv1300",
            //12100
            propellers: "Falcon C2D 20х12",
            propellers_url: "https://rccopter.ru/product/propeller-falcon-c2d-20h12-karbonovyy-marshevyy",
            //8580
            optionaly: "Pro HS1207 600TVL 2.5mm Lens FPV Camera PAL",
            optionally_url: "https://rccopter.ru/product/kursovaya-kamera-foxeer-arrow-mini-pro-hs1207-600tvl-25mm-lens-fpv-camera-pal"
        },
        {
            description: "БАС тяжелого типа предназначен для перевозки грузов с большой массой. БАС данного типа обладают массивной рамой, оснащенной мощными моторами.",
            price: 41360,
            //15400
            frame: "TAROT 650",
            frame_url: "https://rccopter.ru/product/skladnaya-karbonovaya-rama-tarot-650",
            //8580
            battery: "Gens ace 5000mAh 14.8V 50C",
            battery_url: "https://rccopter.ru/product/akb-gens-ace-5000mah-148v-45c-4s1p-lipo-battery-pack-deans-t-plug",
            //13750
            motor: "T-Motor Air Gear 200",
            motor_url: "https://rccopter.ru/product/t-motor-air-gear-200-esc-komplekt",
            //3630
            propellers: "P 11x3.7 T-Motor",
            propellers_url: "https://rccopter.ru/product/propeller-karbonovyy-11x37-komplekt-t-motor",
            //8580
            optionaly: null,
            optionally_url: ""
        },
        {
            description: "БАС мониторинга предназначен для патрулирования/облета заранее заданной территории с целями получения графической информации о местности.",
            price: 111212,
            //63912
            frame: "TAROT T18 TL18T00",
            frame_url: "https://rccopter.ru/product/skladnaya-karbonovaya-rama-oktokoptera-tarot-t18-tl18t00",
            //16610
            battery: "Gens Ace 5000mAh 6S1P 45C",
            battery_url: "https://rccopter.ru/product/akb-gens-ace-tattu-5000mah-6s1p-45c-222v-lipo-battery-pack-ec5",
            //12430.00
            motor: "T-Motor P60 KV340",
            motor_url: "https://rccopter.ru/product/t-motor-p60-kv340",
            //9680
            propellers: "P 18x6.1 T-Motor",
            propellers_url: "https://rccopter.ru/product/propeller-karbonovyy-18x61-t-motor",
            //8580
            optionaly: "Foxeer Arrow Mini Pro HS1207 600TVL 2.5mm Lens FPV Camera PAL",
            optionally_url: "https://rccopter.ru/product/kursovaya-kamera-foxeer-arrow-mini-pro-hs1207-600tvl-25mm-lens-fpv-camera-pal"
        },
    ]
    return <div className="examples">
        <Swiper navigation={true} modules={[Navigation]} loop={true} className="swiper">
            {examples.map((item, index) => {
                return <SwiperSlide className="swiper_item" key={index}>
                    <Card data={item} index={index}/>
                </SwiperSlide>
            })}
        </Swiper>
    </div>
}
export default Examples
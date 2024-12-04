import "./Info.scss";
import demonstration from "./img/demonstration.png";
import controller from "./img/controller.png";
import collaboration from "./img/collaboration.png";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";

const Info = (props) => {
    return <div className="info">
        <Swiper navigation={true} modules={[Navigation]} loop={true} className="window">
            <SwiperSlide className="window_item">
                <p className="main_text">
                    Платформа "Волна" позволит сформировать конфигурацию БПЛА под большинство пользовательских целей: от мониторинга территории, до перевозки грузов высокой массы. Пройдите путь от выбора цели до готовой конфигурации.
                </p>
                <div className="demonstration">
                    <img src={demonstration} alt="demonstration"/>
                </div>
            </SwiperSlide>
            <SwiperSlide className="window_item center">
                <p className="all_place">
                    Платформа предназначена для централизованного и самостоятельного 
                    подбора комплектующих для сборки различных видов беспилотных летательных аппаратов. 
                    На платформе размещены рекомендации по сборке беспилотных летательных аппаратов, так 
                    как не все комплектующие технически совместимы друг к другу.
                </p>
                <div className="demonstration">
                    <img src={controller} alt="controller"/>
                </div>
            </SwiperSlide>
            <SwiperSlide className="window_item center">
                <p className="all_place small">
                    Первым этапом сборки дрона является конструирование рамы. Рама обеспечивает прочную конструкцию дрона и удерживает на месте все остальные компоненты. Рама может быть изготовлена из различных материалов, таких как углеродное волокно или пластик, а ее размер и форма зависят от предназначения дрона.
                    Второй этап - установка двигателя и пропеллера. Двигатель обеспечивает необходимую мощность для полета дрона, а пропеллер помогает создать подъемную силу. Количество двигателей и пропеллеров зависит от конструкции дрона и его предназначения. Большинство дронов имеют четыре или шесть двигателей и пропеллеров.
                    Третий этап - установка полетного контроллера. Полетный контроллер - это мозг дрона, который управляет его движением и стабильностью. Он получает данные от пульта дистанционного управления и соответствующим образом регулирует скорость, высоту и ориентацию дрона.
                    Четвертый этап - установка камеры и других аксессуаров. Камера является одним из основных компонентов дрона и часто используется для аэрофото- и видеосъемки. В зависимости от назначения дрона могут быть установлены и другие аксессуары, такие как GPS, датчики и фонари.
                </p>
                <div className="demonstration">
                    <img src={collaboration} alt="collaboration"/>
                </div>
            </SwiperSlide>
        </Swiper>
    </div>
}
export default Info
import "./Mob.scss";
import ParticlesBg from "particles-bg";
import { useEffect } from "react";

const Mob = () => {
    useEffect(() => {
        document.querySelector(".particles-bg-canvas-self").classList.add("background")
    }, [])

    return <div className="mob">
        <ParticlesBg type="cobweb" bg={true} color="#B9CAEA"/>
        <div className="window">
            <p className="title">Предупреждение</p>
            <p className="text">
                Похоже Вы используете мобильное устройство для использования этого приложения. Пожалуйста, используйте персональный компьютер с установленной ОС Windows или любой другой ОС
            </p>
        </div>
    </div>
}
export default Mob 
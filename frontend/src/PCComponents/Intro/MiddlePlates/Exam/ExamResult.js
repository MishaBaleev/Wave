const ExamResult = (props) => {

    //handlers
    const checkAnswerCount = () => {
        if (props.good_answers < 7){
            return "bad"
        }else if (props.good_answers < 13){
            return "middle"
        }else{
            return "good"
        }
    }

    return <div className="exam_result">
        <div className="exam_result_window">
            <div className="top"><span>Результаты тестирования</span></div>
            <ul className="results">
                <li><span>Общее число вопросов - 15</span></li>
                <li><span>Число правильных ответов - {props.good_answers}</span></li>
                <li><span>Число неправильных ответов - {15 - props.good_answers}</span></li>
                <li><span className={checkAnswerCount()}>Доля правильных ответов - {Math.round(props.good_answers/15*100)}%</span></li>
                <li><span>Время прохождения теста - {(props.user_time/1000).toFixed(2)} с</span></li>
            </ul>
            <button className="refresh" onClick={props.refresh}>Пройти заново</button>
        </div>
    </div>
}

export default ExamResult
import { useEffect, useState } from "react";
import "./Exam.scss";
import bank from "./bank.json";
import { connect } from "react-redux";
import { updateModal } from "../../../../AppSlice";
import ExamResult from "./ExamResult";

const Exam = (props) => {
    //state
    const [quest_bank, setQuestBank] = useState([])
    const [good_answers, setGoodAnswers] = useState(0)
    const [user_unswers, setUserAnswers] = useState(0)
    const [active_answers, setActiveAnswers] = useState(Array(15).fill(true))
    const [answer_status, setAnswerStatus] = useState(Array(15).fill(""))
    const [user_time, setUserTime] = useState(null)

    //handlers
    const getRandomElements = (arr, arr_len) => {
        const shuffled = arr.slice();
        
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        
        // Возвращаем первые `count` элементов
        return shuffled.slice(0, arr_len);
    }

    const updateAnswerStatus = (answer, status) => {
        quest_bank.forEach((item, index) => {
            if (JSON.stringify(item) === JSON.stringify(answer)){
                let cur_active_answers = [...active_answers]
                cur_active_answers[index] = false 
                setActiveAnswers(cur_active_answers)
                let cur_answer_status = answer_status
                cur_answer_status[index] = status
                setAnswerStatus(cur_answer_status)
            }
        })
    }

    const checkUserAnswer = (answer, user_choice) => {
        if (user_unswers === 0){
            setUserTime(performance.now())
            console.log(performance.now())
        }
        if (user_unswers === 14){
            console.log(performance.now())
            setUserTime((prev_time) => {
                let new_time = performance.now() - prev_time
                return new_time
            })
        }
        if (answer.correct_answer === user_choice){
            let cur_good_answers = good_answers
            cur_good_answers += 1
            setGoodAnswers(cur_good_answers)
            updateAnswerStatus(answer, "good")
        }else{
            updateAnswerStatus(answer, "bad")
            props.updateModal({title: "Правильный ответ", message: answer.options[answer.correct_answer]})
        }
        setUserAnswers((prev_data) => {
            let new_data = prev_data + 1
            return new_data
        })
    }

    const refreshCmp = () => {
        let new_bank = getRandomElements(bank.questions, 15)
        setQuestBank(new_bank)
        setGoodAnswers(0)
        setUserAnswers(0)
        setActiveAnswers(Array(15).fill(true))
        setAnswerStatus(Array(15).fill(""))
    }

    useEffect(() => {
        let new_bank = getRandomElements(bank.questions, 15)
        setQuestBank(new_bank)
    }, [])

    return <div className="exam">
        <div className="window">
            {/* <div className="exam_header">
                <p>Проверка знаний</p>
                <p>Всего вопросов - {quest_bank.length}</p>
                <p>Вопросов пройдено - {user_unswers}</p>
                <p className={checkAnswerCount()}>Правильных - {good_answers} ({Math.round(good_answers/quest_bank.length*100)}%)</p>
            </div> */}
            <ul className="exam_list">
                {quest_bank.map((item, index) => {
                    return <li key={index} className={"exam_item " + answer_status[index]}>
                        <p className="exam_title">{item.question}</p>
                        <ul className="exam_answers">
                            {item.options.map((option, opt_index) => {
                                return <li key={opt_index} className="answer" onClick={() => {
                                        if (active_answers[index] === true){checkUserAnswer(item, opt_index)}
                                    }}>
                                    <span>{option}</span>
                                </li>
                            })}
                        </ul>
                    </li>
                })}
            </ul>
        </div>
        {user_unswers===15?
            <ExamResult good_answers={good_answers} user_time={user_time} refresh={refreshCmp}/>:""
        }
    </div>
}

const mapStateToProps = (state) => {return state}
const mapDispatchToProps = (dispatch) => {return {
    "updateModal": (data) => {dispatch(updateModal(data))}
}}
export default connect(mapStateToProps, mapDispatchToProps)(Exam)
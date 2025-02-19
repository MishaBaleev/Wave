import { useEffect, useState } from "react";
import "./Exam.scss";
import bank from "./bank.json";
import { connect } from "react-redux";
import { updateModal } from "../../../../AppSlice";

const Exam = (props) => {
    //state
    const [quest_bank, setQuestBank] = useState([])
    const [good_answers, setGoodAnswers] = useState(0)
    const [active_answers, setActiveAnswers] = useState(Array(15).fill(true))
    const [answer_status, setAnswerStatus] = useState(Array(15).fill(""))

    //handlers
    const getRandomElements = (arr, arr_len) => {
        let w = arr.length, t, i;
        while (w) {
            i = Math.floor(Math.random() * w--);
            t = arr[w];
            arr[w] = arr[i];
            arr[i] = t;
        }
        return arr.slice(0, arr_len)
    }

    const checkAnswerCount = () => {
        if (good_answers < 7){
            return "bad"
        }else if (good_answers < 13){
            return "middle"
        }else{
            return "good"
        }
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
        if (answer.correct_answer === user_choice){
            let cur_good_answers = good_answers
            cur_good_answers += 1
            setGoodAnswers(cur_good_answers)
            updateAnswerStatus(answer, "good")
        }else{
            updateAnswerStatus(answer, "bad")
            props.updateModal({title: "Правильный ответ", message: answer.options[answer.correct_answer]})
        }
    }

    useEffect(() => {
        let new_bank = getRandomElements(bank.questions, 15)
        setQuestBank(new_bank)
    }, [])

    return <div className="exam">
        <div className="window">
            <div className="exam_header">
                <p>Проверка знаний</p>
                <p>Всего вопросов - {quest_bank.length}</p>
                <p className={checkAnswerCount()}>Правильных - {good_answers} ({Math.round(good_answers/quest_bank.length*100)}%)</p>
            </div>
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
    </div>
}

const mapStateToProps = (state) => {return state}
const mapDispatchToProps = (dispatch) => {return {
    "updateModal": (data) => {dispatch(updateModal(data))}
}}
export default connect(mapStateToProps, mapDispatchToProps)(Exam)
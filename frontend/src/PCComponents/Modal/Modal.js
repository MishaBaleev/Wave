import "./Modal.scss";
import { connect } from "react-redux";
import { updateModal } from "../../AppSlice";

const Modal = (props) => {
    return <div className="modal">
        <button className="close" onClick={() => {props.updateModal({title:"", message:""})}}/>
        <div className="title"><p>{props.app.modal.title}</p></div>
        <div className="message"><p>{props.app.modal.message}</p></div>
    </div>
}
const mapStateToProps = (state) => {return state}
const mapDispatchToProps = (dispatch) => {return {
    "updateModal": (data) => dispatch(updateModal(data))
}}
export default connect(mapStateToProps, mapDispatchToProps)(Modal)
import './App.scss';
import '@fontsource-variable/jetbrains-mono';
import { connect } from 'react-redux';
import PC from './PCComponents/PC';
import Mob from './MobComponents/Mob';

const App = (props) => {
  const user_agent = navigator.userAgent.toLocaleLowerCase()
  const is_pc = (user_agent.search("iphone") > -1)?false:((user_agent.search("android") > -1)?false:true)
  
  return (
    <div className={"App " + (is_pc===true?"pc_comp":"mob_comp")}>
      {is_pc===true?
        <PC/>:<Mob/>
      }
    </div>
  );
}

const mapStateToProps = (state) => {
  return state
}
const mapDispatchToProps = (dispatch) => {
  return{}
}
export default connect(mapStateToProps, mapDispatchToProps)(App)

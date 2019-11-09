import * as React from "react";
import "../Login/Login.css";
import { signIn } from "../../common/const/image-const";
import adalContext from "../../common/authConfig";
import { TOKEN_KEY, STATIC_ROUTE } from "../../common/Constants";
import { State } from "../../root";
import { bindActionCreators } from "redux";
import * as actionCreators from "../Login/AuthAction";
import { connect } from "react-redux";
interface Props {
    getUserInfo?: any;
    syncUserInfo?: any;
    history?: any;
    isLoading?: boolean;
}
class SignIn extends React.Component<Props> {
    constructor(props: any) {
        super(props);
    }
    componentDidMount() {
        adalContext.GetToken().then(async tokens => {
            localStorage.setItem(TOKEN_KEY, tokens || "");
            await this.props.syncUserInfo();
            this.redirectToAdmin();
        });
    }
    redirectToAdmin = () => {
        this.props.history.push(STATIC_ROUTE.HOME);
    }

    render() {
        return (
            <div className="wapper">
                <img className="img" src={signIn} alt="" />
                <form className="form-signin">
                    <h1 className="txt-sign">Sign In</h1>
                    <div className="btn btn-sign" onClick={() => adalContext.Login()}><span style={{ verticalAlign: "middle" }}>Sign in</span></div>
                </form>
            </div>
        );
    }
}
const mapStateToProps = (state: State) => ({
    ...state.authState
});
const mapDispatchToProps = (dispatch: any) => ({
    getUserInfo: bindActionCreators<any>(actionCreators.getUserInfo, dispatch),
    syncUserInfo: bindActionCreators<any>(actionCreators.syncUserInfo, dispatch)

});
export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
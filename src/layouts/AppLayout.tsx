import React from "react";
import ReduxToastr from "react-redux-toastr";
import { connect } from "react-redux";

import LeftSideBarComponent from "../components/LeftSideBarComponent";
import { TopBarComponet } from "../components/TopBarComponent";
import { State } from "../root";
import { UserModel } from "../app/Login/models/AuthState";

import "../css/app.css";
import "antd/dist/antd.css";
import "../css/antd.css";
import "font-awesome/css/font-awesome.min.css";
import "react-redux-toastr/lib/css/react-redux-toastr.min.css";

interface Props {
  userInfo: UserModel;
}

class AppLayout extends React.Component<Props, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      activeNavClass: true
    };
  }

  toogleClass = () => {
    const currentState = this.state.activeNavClass;
    this.setState({ activeNavClass: !currentState });
  }

  render() {
    return (
      <div
        className={
          this.state.activeNavClass ? "wrapper" : "wrapper  slide-menu"
        }
      >
        <TopBarComponet
          userInfo={this.props.userInfo}
          toogleClass={this.toogleClass}
        ></TopBarComponet>
        <div className="container-fluid">
          <div className="row">
            <LeftSideBarComponent></LeftSideBarComponent>
            <div className="content-wrapper">
              <ReduxToastr
                timeOut={4000}
                newestOnTop={false}
                preventDuplicates={true}
                position="top-right"
                transitionIn="fadeIn"
                transitionOut="fadeOut"
              />
              {this.props.children}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state: State) => ({
  userInfo: state.authState.userInfo
});
export default connect(mapStateToProps)(AppLayout);

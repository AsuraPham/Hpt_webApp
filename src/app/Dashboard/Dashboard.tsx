import * as React from "react";
import { userDashboard, cloud, errorAdvise } from "../../common/const/image-const";
import { DashboardState } from "./models/DashboardState";
import * as actionCreators from "./DashboardAction";
import { bindActionCreators } from "redux";
import { State } from "../../root";
import { connect } from "react-redux";
import "../Dashboard/dashboard.css";
import DeviceLocationStatisticComponent from "./components/DeviceLocationStatisticComponent";
interface Props extends DashboardState {
    actions: typeof actionCreators;
}
class Dashboard extends React.Component<Props> {
    constructor(props: any) {
        super(props);
        this.state = { visible: false };
    }
    componentDidMount() {
        this.props.actions.getDeviceLocationStatistic();
    }
    render() {
        const { deviceLocationStatistic } = this.props;
        return (
            <div>
                <div className="page-title">
                    <div className="row">
                        <div className="mb-30 col">
                            <h3 className="mb-0 title-page">Dashboard</h3>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="mb-30 col-md-4">
                        <div className="card-statistics h-100 card">
                            <div className="card-body"><div className="clearfix">
                                <div className="float-left">
                                    <img className="mt-20 ml-20 mb-10" src={userDashboard} />
                                </div>
                                <div className="float-right text-right mt-20 mr-20 mb-10">
                                    <p className="card-text">Realtime active users</p><h1 className="txt-bold">285</h1>
                                </div>
                            </div>
                            </div>
                        </div>
                    </div>
                    <div className="mb-30 col-md-4">
                        <div className="card-statistics h-100 card">
                            <div className="card-body"><div className="clearfix">
                                <div className="float-left">
                                    <img className="mt-20 ml-20 mb-10" src={cloud} />
                                </div>
                                <div className="float-right text-right mt-20 mr-20 mb-10">
                                    <p className="card-text">Total Storage</p><h1 className="txt-bold">285 M</h1>
                                </div>
                            </div>
                            </div>
                        </div>
                    </div>
                    <div className="mb-30 col-md-4">
                        <div className="card-statistics h-100 card">
                            <div className="card-body"><div className="clearfix">
                                <div className="float-left">
                                    <img className="mt-20 ml-20 mb-10" src={errorAdvise} />
                                </div>
                                <div className="float-right text-right mt-20 mr-20 mb-10">
                                    <p className="card-text">Errors occurred</p><h1 className="txt-bold">25</h1>
                                </div>
                            </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <DeviceLocationStatisticComponent
                        deviceLocationStatistic={deviceLocationStatistic}
                    />
                </div>
            </div>
        );
    }
}
const mapStateToProps = (state: State) => ({
    ...state.dashboardState
});

const mapDispatchToProps = (dispatch: any) => ({
    actions: bindActionCreators<any>(actionCreators, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
import * as React from 'react';
import '../css/app.css';
import 'antd/dist/antd.css';
import '../css/antd.css';
import 'font-awesome/css/font-awesome.min.css';
import 'react-redux-toastr/lib/css/react-redux-toastr.min.css';
import ReduxToastr from 'react-redux-toastr';
import LeftSideBarComponent from '../components/LeftSideBarComponent';
import TopBarComponet  from '../components/TopBarComponent';

class AppLayout extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      activeNavClass: true,
    };
  }
  toogleClass = () => {
    const currentState = this.state.activeNavClass;
    this.setState({ activeNavClass: !currentState });
  }
  render() {
    return (
      <div className={this.state.activeNavClass ? 'wrapper' : 'wrapper  slide-menu'}>
        <TopBarComponet
          toogleClass={this.toogleClass}
        ></TopBarComponet>
        <div className='container-fluid'>
          <div className='row'>
            <LeftSideBarComponent></LeftSideBarComponent>
            <div className='content-wrapper'>
              <ReduxToastr
                timeOut={4000}
                newestOnTop={false}
                preventDuplicates={true}
                position='top-right'
                transitionIn='fadeIn'
                transitionOut='fadeOut' />
              {this.props.children}
            </div>
          </div>
        </div>
      </ div>
    );
  }
}

export default AppLayout;
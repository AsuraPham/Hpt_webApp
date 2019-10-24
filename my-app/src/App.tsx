import * as React from 'react';
import { Switch, Route } from 'react-router-dom';
class App extends React.Component {
  public token = '';
  constructor(props: any) {
    super(props);
  }
  render() {
    return (
      <Switch>
        <Route path='/'/>
      </Switch>
    );
  }
}

export default App;

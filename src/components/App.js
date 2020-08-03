import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import '../stylesheets/App.scss';
import Landing from './Landing';
import Form from './Form';


class App extends Component {
  constructor(props) {
    super(props);

    // this.updateAvatar = this.updateAvatar.bind(this);
  }

  // updateAvatar(img) {
  //   const { profile } = this.state;
  //   this.setState((prevState) => {
  //     const newProfile = { ...profile, avatar: img };
  //     return {
  //       profile: newProfile,
  //       isAvatarDefault: false,
  //     };
  //   });
  // }

  render() {
    return (
      <div className='App'>
        <Switch>
          <Route exact path="/" component={Landing} />
          <Route path="/form" component={Form} />

          {/* <Landing />
          <Form
            avatar={profile.avatar}
            isAvatarDefault={isAvatarDefault}
            updateAvatar={this.updateAvatar}
          /> */}
        </Switch>

      </div>
    );
  }
}

export default App;

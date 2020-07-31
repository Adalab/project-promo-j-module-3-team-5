import React, { Component } from 'react';
import '../stylesheets/App.scss';
import Landing from './Landing';
import Form from './Form';
import defaultImage from './form/defaultImage';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAvatarDefault: true,
      profile: {
        avatar: defaultImage,
      },
    };
    this.updateAvatar = this.updateAvatar.bind(this);
  }

  updateAvatar(img) {
    const { profile } = this.state;
    this.setState((prevState) => {
      const newProfile = { ...profile, avatar: img };
      return {
        profile: newProfile,
        isAvatarDefault: false,
      };
    });
  }

  render() {
    const { profile, isAvatarDefault } = this.state;
    return (
      <div className='App'>
        <Landing />
        <Form
          avatar={profile.avatar}
          isAvatarDefault={isAvatarDefault}
          updateAvatar={this.updateAvatar}
        />
      </div>
    );
  }
}

export default App;

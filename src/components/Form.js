import React from 'react';
import '../stylesheets/App.scss';
import Header from './form/Header';
import Card from './form/Card';
import Footer from './landing/Footer';
import Collapsable from './form/Collapsable';
import Evilbot from './form/Evilbot';
import defaultImage from './form/defaultImage';

class Form extends React.Component {
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
      <div className='Form card-generator'>
        <Header />
        <main className='main__card-generator'>
          <div className='card-generator__wrapper'>
            <Card avatar={this.state.profile.avatar} />
            <Collapsable
              avatar={this.state.profile.avatar}
              isAvatarDefault={this.state.isAvatarDefault}
              updateAvatar={this.updateAvatar}
            />
          </div>
          <Evilbot />
        </main>
        <Footer />
      </div>
    );
  }
}

export default Form;

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
      input: {
        name: '',
        job: '',
        email: '',
        phone: '',
        linkedin: '',
        github: '',
        photo: '',
      }
    };
    this.updateAvatar = this.updateAvatar.bind(this);
    this.handleChangeInput = this.handleChangeInput.bind(this);
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

  handleChangeInput(event){
    // TODO (guardar en el estado el objeto)
    // console.log(event)
    // const key = event.name;
    // console.log(key)
    // const value = key === 'photo' ? this.props.avatar : event.value;
    
    // this.setState({
    //   [key]: value,
    // });
    // console.log(this.state)
  }

  render() {
    const { profile, isAvatarDefault } = this.state;
    console.log(this.state.input.name);
    return (
      <div className='Form card-generator'>
        <Header />
        <main className='main__card-generator'>
          <div className='card-generator__wrapper'>
            <Card 
              avatar={this.state.profile.avatar} 
              userName={this.state.input.name}
              userEmail={this.state.input.email}
            />
            <Collapsable
              avatar={this.state.profile.avatar}
              isAvatarDefault={this.state.isAvatarDefault}
              updateAvatar={this.updateAvatar}
              handleChangeInput={this.handleChangeInput}
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

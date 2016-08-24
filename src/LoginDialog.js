
import React, { Component } from 'react';

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import PersonIcon from 'material-ui/svg-icons/social/person';
//import MailIcon from 'material-ui/svg-icons/communication/mail-outline';

import * as firebase from 'firebase';

/*
import t from 'tcomb-form';
const Form = t.form.Form;

import TextFieldTemplate from './form/MaterialUITextFieldTemplate';
import FormTemplate from './form/FormTemplate';

const LoginFormSchema = t.struct({
  email: t.String,
  password: t.String,
});
*/

export default class LoginDialog extends Component {

  constructor(props){
    super(props);

    this.state = {
      open: false,
      error: null
    };
  }

  open(){
    this.setState({
      open: true
    })
  }

  close(){
    this.setState({
      open: false
    })
  }

  loginWithGoogle(){
    let provider = new firebase.auth.GoogleAuthProvider();
    let loginPromise;
    if(window.navigator.standalone){
      loginPromise = firebase.auth().signInWithRedirect(provider);
    }else{
      loginPromise = firebase.auth().signInWithPopup(provider)
    }
    loginPromise.then( result => {
      this.close();
    }).catch( error => {
      this.setState({
        error
      });
    });
  }

  render(){
    /*
    let options = {
      template: FormTemplate,
      fields: {
        email: {
          template: TextFieldTemplate,
        },
        password: {
          label: 'Senha',
          template: TextFieldTemplate
        }
      }
    };
    */
    const actions = [
      <RaisedButton
        icon={<PersonIcon color="white"/>}
        backgroundColor="#DF4933"
        labelStyle={{color: 'white'}}
        label="Login com Google"
        style={{margin: 10}}
        onTouchTap={() => this.loginWithGoogle()}/>,
      //<FlatButton label="Criar conta" />,
      <FlatButton
        label="Cancelar"
        onTouchTap={this.close.bind(this)}
      />
    ];
    return (
      <Dialog
        title="Login Poke Trainers"
        actions={actions}
        modal={true}
        open={this.state.open}
        onRequestClose={this.close.bind(this)}>
        Você pode salvar seus cálculos no site se você estiver logado.
        {/*
        <div style={{ margin: 'auto'}}>
          <Form ref="form"
            type={LoginFormSchema}
            options={options}
            value={this.props.form}
            onChange={this.onFormChange}/>
          <RaisedButton
            icon={<MailIcon color="white"/>}
            backgroundColor="#3b5998"
            labelStyle={{color: 'white'}}
            label="Login Email/Senha"/>
        </div>
        */}
      </Dialog>
    )
  }
}

import React, { Component } from 'react';
import './App.scss';

const user = {
    email: "test@test.pl",
    password: "Password1"
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: this.props.email,
      password: this.props.password,
      isRemember: true,
      notice: '',
      renderSuccess: false,
      displayError: 'DisplayNone'
    };
  }

  validEmail(e) {
    const email = e.target.value;
    const emailValid = email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
    if(!emailValid) {
      this.setState({notice: "invalid email", displayError: "ErrorNotification"});
    } else {
      this.setState({email: email, displayError: "DisplayNone"});
    }
  }

  validPassword(e) {
    const password = e.target.value;
    const passwordValid = password.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).{6,}$/);
    if(!passwordValid) {
      this.setState({notice: "invalid password", displayError: "ErrorNotification"});
    } else {
      this.setState({password: password, displayError: "DisplayNone"});
    }
  }

  handleInputChange() {
    this.setState({isRemember: !this.state.isRemember});
    console.log(this.state.isRemember);
  }

  mockedSubmit() {
    if ((this.state.email === user.email) && (this.state.password === user.password)) {
      this.setState({renderSuccess: true})
    } else {
      this.setState({notice: "invalid email or password", displayError: "ErrorNotification"});
    }
  }

  submitForm(e) {
    e.preventDefault();
    this.mockedSubmit();
  }

  render() {
    return this.state.renderSuccess ? this.renderLoginSuccess() : this.renderUserForm();
  }

  renderLoginSuccess() {
    return (
      <div>
        <h1 className="LoginSuccess">Login successful!</h1>
      </div>
    )
  }

  renderUserForm() {
    return (
      <div className="App">
        <form method="POST" onSubmit={(event) => this.submitForm(event)} action="" className="FormApp">
          <fieldset>
            <div className="InputControl">
              <label htmlFor="email">email </label>
              <input type="text" className="EmailInput" name="email" id="email" placeholder="example@example.com" value={this.props.email} onChange={(event) => this.validEmail(event)} required="required"/>
            </div>
            <div className="InputControl">
              <label htmlFor="password">password</label>
              <input type="password" className="PasswordInput" name="password" id="password" placeholder="password" value={this.props.password} onChange={(event) => this.validPassword(event)} required="required"/>
            </div>
            <div className="InputControl">
              <label htmlFor="remember">remember me</label>
              <input type="checkbox" onChange={this.handleInputChange.bind(this)} className="Checkbox" name="remember" id="remember" />
            </div>
            <div className="InputControl">
              <input type="submit" className="SubmitButton"  value="login"/>
            </div>
          </fieldset>
        </form>
        <div className={this.state.displayError}>
          <span> {this.state.notice} </span>
        </div>
      </div>
    );
  }
}

export default App;

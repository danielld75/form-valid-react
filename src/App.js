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
    !emailValid ? this.setState({notice: "invalid email", displayError: "ErrorNotification"}) : this.setState({email: email, notice: "", displayError: "DisplayNone"})
  }

  validPassword(e) {
    const password = e.target.value;
    const passwordValid = password.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).{6,}$/);
    !passwordValid ? this.setState({notice: "invalid password", displayError: "ErrorNotification"}) : this.setState({password: password, notice: "", displayError: "DisplayNone"});
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
        <form method="POST" action="" className="FormApp">
          <fieldset>
            <div className="InputControl">
            <label htmlFor="email">email </label>
            <input type="text" className="Email_input" name="email" id="email" value={this.props.email}
                   onChange={(event) => this.validEmail(event)}
                   required="required"/>
            </div>
            <div className="InputControl">
            <label htmlFor="password">password</label>
            <input type="password" className="Password_input" name="password" id="password" value={this.props.password}
                   onChange={(event) => this.validPassword(event)} required="required"/>
            </div>
            <div className="InputControl">
            <label htmlFor="remember">remember me</label>
            <input type="checkbox" onChange={this.handleInputChange.bind(this)} className="Checkbox" name="remember" id="remember" />
            </div>
            <div className="InputControl">
            <input type="submit" className="SubmitButton" onClick={(event => this.submitForm(event))} value="login"/>
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

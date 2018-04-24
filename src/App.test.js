import React from 'react';
import {mount} from 'enzyme';
import {spy} from 'sinon';
import App from './App';


describe('login', () => {
  it('fill in correct email', () => {
    const validEmail = spy();
    const wrapper = mount(<App onChange={validEmail}/>);
    wrapper.find('.EmailInput').simulate('change', {target: {value: "test@test.pl"}});
    expect(wrapper.state().notice).toBe('');
  });

  it('fill in incorrect email', () => {
    const validEmail = spy();
    const wrapper = mount(<App onChange={validEmail}/>);
    wrapper.find('.EmailInput').simulate('change', {target: {value: "test.pl"}});
    expect(wrapper.state().notice).toBe('invalid email');
  });

  it('fill in correct password', () => {
    const validPassword = spy();
    const wrapper = mount(<App onChange={validPassword}/>);
    wrapper.find('.PasswordInput').simulate('change', {target: {value: "Password1"}});
    expect(wrapper.state().notice).toBe('');
  });

  it('fill in incorrect password with no upper letter', () => {
    const validPassword = spy();
    const wrapper = mount(<App onChange={validPassword}/>);
    wrapper.find('.PasswordInput').simulate('change', {target: {value: "1sassword"}});
    expect(wrapper.state().notice).toBe('invalid password');
  });

  it('fill in incorrect password with no lower letter', () => {
    const validPassword = spy();
    const wrapper = mount(<App onChange={validPassword}/>);
    wrapper.find('.PasswordInput').simulate('change', {target: {value: "1PASSWORD"}});
    expect(wrapper.state().notice).toBe('invalid password');
  });

  it('fill in incorrect password with no digit', () => {
    const validPassword = spy();
    const wrapper = mount(<App onChange={validPassword}/>);
    wrapper.find('.PasswordInput').simulate('change', {target: {value: "noPASSWORD"}});
    expect(wrapper.state().notice).toBe('invalid password');
  });

  it('fill in incorrect password with too short password', () => {
    const validPassword = spy();
    const wrapper = mount(<App onChange={validPassword}/>);
    wrapper.find('.PasswordInput').simulate('change', {target: {value: "1Pass"}});
    expect(wrapper.state().notice).toBe('invalid password');
  });

  it('click for remember me', () => {
    const handleInputChange = spy();
    const wrapper = mount(<App onChange={handleInputChange}/>);
    wrapper.find('.Checkbox').simulate('click');
    expect(wrapper.state().isRemember).toBe(true);
  });

  it('click submit with correct email and password to login return true', () => {
    const submitForm = spy();
    const wrapper = mount(<App onChange={submitForm}/>);
    wrapper.find('.EmailInput').simulate('change', {target: {value: "test@test.pl"}});
    wrapper.find('.PasswordInput').simulate('change', {target: {value: "Password1"}});
    wrapper.find('.SubmitButton').simulate('submit');
    expect(wrapper.state().renderSuccess).toBe(true);
  });

  it('click submit with incorrect email and password to login return false', () => {
    const submitForm = spy();
    const wrapper = mount(<App onChange={submitForm}/>);
    wrapper.find('.EmailInput').simulate('change', {target: {value: "test.pl"}});
    wrapper.find('.PasswordInput').simulate('change', {target: {value: "Password"}});
    wrapper.find('.SubmitButton').simulate('submit');
    expect(wrapper.state().renderSuccess).toBe(false);
  });

});

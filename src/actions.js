export const LOGIN = 'LOGIN';

export function login({form}) {
  return {
    type: LOGIN,
    form: form,
  }
}

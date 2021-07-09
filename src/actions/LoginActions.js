import { FirebaseService, GoogleService } from '../services';
import { LOGIN, LOGIN_FAIL, LOGIN_SUCCESS } from './types';

import { Actions } from 'react-native-router-flux';
import { Alert } from 'react-native';
import i18n from '../i18n';

export const login = (idToken, accessToken) => {
  return (dispatch) => {
    dispatch({ type: LOGIN });
    console.log('idToken', idToken);

    FirebaseService.signIn(idToken, accessToken)
      .then((user) => loginSuccess(dispatch, user))
      .catch((error) => {
        console.error(error);
        GoogleService.signOut();
        loginFail(dispatch, error);
      });

    // GoogleService.signIn()
    //   .then(userInfo => {

    //   })
    //   .catch(error => loginFail(dispatch, error));
  };
};

const loginSuccess = (dispatch, user) => {
  dispatch({ type: LOGIN_SUCCESS, payload: user });
  Actions.main();
};

const loginFail = (dispatch, error) => {
  dispatch({ type: LOGIN_FAIL });

  if (error) {
    Alert.alert(i18n.t('app.attention'), i18n.t('login.enter.message'), [{ text: i18n.t('app.ok') }], { cancelable: true });
  }
};

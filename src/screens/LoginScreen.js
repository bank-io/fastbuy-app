import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';

import { Image, StyleSheet, Text, View } from 'react-native';
import { LoadingView, SocialButton } from '../components';
import React, { Component } from 'react';

import colors from '../colors';
import { connect } from 'react-redux';
import fonts from '../fonts';
import i18n from '../i18n';
import imgAppIcon from '../../assets/images/app-icon.png';
import imgGoogleIcon from '../../assets/images/google-icon.png';
import { login } from '../actions';

WebBrowser.maybeCompleteAuthSession();

const LoginScreen = (props) => {
  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    expoClientId: '550593315055-n978m2cbucae5oudkfgaarmpkug80gv5.apps.googleusercontent.com',
    iosClientId: 'GOOGLE_GUID.apps.googleusercontent.com',
    androidClientId: 'GOOGLE_GUID.apps.googleusercontent.com',
    webClientId: '550593315055-n978m2cbucae5oudkfgaarmpkug80gv5.apps.googleusercontent.com',
  });

  React.useEffect(() => {
    if (response?.type === 'success') {
      const {
        authentication,
        params: { id_token: idToken },
      } = response;
      console.log('authentication', idToken);

      props.login(idToken);
    }
  }, [response]);

  const onPressButton = () => {
    //
    promptAsync();
  };

  const renderLoading = () => {
    return <LoadingView />;
  };

  const renderWelcome = () => {
    const { containerStyle, welcomeViewStyle, imageStyle, titleStyle, buttonStyle } = styles;

    return (
      <View style={containerStyle}>
        <View style={welcomeViewStyle}>
          <Image style={imageStyle} source={imgAppIcon} />

          <Text style={titleStyle}>{i18n.t('login.welcome')}</Text>
        </View>

        <SocialButton style={buttonStyle} color={colors.red} icon={imgGoogleIcon} title={i18n.t('login.button')} onPress={onPressButton} />
      </View>
    );
  };

  if (props.loading) {
    return renderLoading();
  }

  return renderWelcome();
};

const margin = 14;
const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: colors.white,
    margin,
  },
  welcomeViewStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageStyle: {
    height: 100,
    width: 100,
    margin,
  },
  titleStyle: {
    fontFamily: fonts.regular,
    color: colors.grayDark,
    fontSize: 24,
    margin,
  },
  buttonStyle: {
    position: 'absolute',
    bottom: 0,
  },
});

const mapStateToProps = (state) => {
  const { loading, errorMessage } = state.login;
  return { loading, errorMessage };
};

export default connect(mapStateToProps, { login })(LoginScreen);

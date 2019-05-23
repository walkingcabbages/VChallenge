{/*npm start to run app*/}

import React from 'react';
import { Platform, StatusBar, StyleSheet, View, Text } from 'react-native';
import { AppLoading, Asset, Font, Icon } from 'expo';
import AppNavigator from './navigation/AppNavigator';
import ApolloClient from "apollo-boost";
import { gql } from "apollo-boost";
import { ApolloProvider } from "react-apollo";

const client = new ApolloClient({
  uri: "https://www.graphqlhub.com/graphql"
});

client
  .query({
    query: gql`
      {
      graphQLHub
      giphy {
        random(tag: "food", rating: pg13) {
          id
          url
        }
      }
    }
    `
  })
  .then(result => console.log(result));

{/*process.env['GIPHY_API_KEY'] = 'ERT4qd6eXCDUvDPfc1tw9gB7dXEwbSxt';*/}

{/*let schema = new GraphQLSchema({
  query: Giphy.QueryObjectType
});*/}

{/*let query = '' { user(username: "kn0thing") { username } } '';
graphql(schema, query).then((result) => {
  console.log(result);
});*/}

export default class App extends React.Component {
  state = {
    isLoadingComplete: false,
  };

  render() {
    console.log('got to app');
    if (!this.state.isLoadingComplete && !this.props.skipLoadingScreen) {
      return (
        <AppLoading
          startAsync={this._loadResourcesAsync}
          onError={this._handleLoadingError}
          onFinish={this._handleFinishLoading}
        />
      );
    } else {
      return (
        <View style={styles.container}>
          <ApolloProvider client={client}>
            {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
              <AppNavigator />
          </ApolloProvider>
        </View>
      );
    }
  }

  _loadResourcesAsync = async () => {
    return Promise.all([
      Asset.loadAsync([
        require('./assets/images/robot-dev.png'),
        require('./assets/images/robot-prod.png'),
      ]),
      Font.loadAsync({
        // This is the font that we are using for our tab bar
        ...Icon.Ionicons.font,
        // We include SpaceMono because we use it in HomeScreen.js. Feel free
        // to remove this if you are not using it in your app
        'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf'),
      }),
    ]);
  };

  _handleLoadingError = error => {
    // In this case, you might want to report the error to your error
    // reporting service, for example Sentry
    console.warn(error);
  };

  _handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true });
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

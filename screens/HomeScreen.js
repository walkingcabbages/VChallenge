import React from 'react';
import { Button } from 'react-native-elements';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
} from 'react-native';
import { WebBrowser } from 'expo';

import { MonoText } from '../components/StyledText';

import gql from "graphql-tag";
import { Query, Mutation} from "react-apollo";

const GET_GIF = gql`
  query ugh {
    giphy {
      random(tag: "food", rating: pg) {
        id
        images {
          original {
            url
          }
        }
      }
    }
  }
`;
{/* default url --> 'https://media.giphy.com/media/QMHKAxfkujtDi/giphy.gif'*/}
const GIF = () => (
  <Query query={GET_GIF}>
    {({ loading, error, data, refetch }) => {
      if (loading) return null;
      if (error) return "Error!";
      
      if(data.giphy.random === undefined || !data.giphy.random) {
        var url = 'https://media.giphy.com/media/QMHKAxfkujtDi/giphy.gif';
      }
      else {
        var url = data.giphy.random.images.original.url;
      }

      return (
        <View>
          <Image source={{uri: url}} style={styles.gif} />
          <View style={styles.containerButton}>
            <Button title="Re-roll" onPress={() => refetch()} />
            {/*<View style={styles.myButton}>
              <Text onPress={() => refetch()}>Re-roll</Text>
            </View>*/}
          </View>
        </View>
      );
    }}
  </Query>
);

{/*const updateStar = gql`
  mutation updateStar($input: SetValueForKeyInput!) {
    keyValue_setValue(input:$input) {
      item {
        id
        value
      }
    }
  }
`;

const STAR = ( idd, value) => {
  var input = {
    id: idd,
    value: value,
    clientMutationId: "a",
  };
    return (
      <View>
      <Mutation mutation={updateStar} refetchQueries={[{ query: dogQuery }]}>
        {(keyValue_setValue, { data }) => (
      <View style={styles.container}>
        <Button onPress={() => { keyValue_setValue({ variables: {
                id: input.id,
                value: input.value,
                clientMutationId: input.clientMutationId
              }
            })
            .then(res => res)
            .catch(err => <Text>{err}</Text>);
            input.id = "";
            input.value = "";
          }}
         title="ToggleStar"
        />
      </View>
      )}
      </Mutation>
      </View>
    );
  }*/}

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={{flex: 2, backgroundColor: 'white'}} />
          <View style={styles.welcomeContainer}>
            {/*{let ugh = 'https://media.giphy.com/media/QMHKAxfkujtDi/giphy.gif'}
            <Image source={{uri: {ugh}}}
              style={{width: 400, height: 400}} />
            }*/}
            <GIF/>
          </View>
          {/*<View>
            <STAR idd={url} value="liked"/>
          </View>*/}

          {/*<View style={styles.getStartedContainer}>
            {this._maybeRenderDevelopmentModeWarning()}

            <Text style={styles.getStartedText}>Get started by opening</Text>

            <View style={[styles.codeHighlightContainer, styles.homeScreenFilename]}>
              <MonoText style={styles.codeHighlightText}>screens/HomeScreen.js</MonoText>
            </View>

            <Text style={styles.getStartedText}>
              Change this text and your app will automatically reload.
            </Text>
          </View>

          <View style={styles.helpContainer}>
            <TouchableOpacity onPress={this._handleHelpPress} style={styles.helpLink}>
              <Text style={styles.helpLinkText}>Help, it didn’t automatically reload!</Text>
            </TouchableOpacity>
          </View>*/}

        {/*<View style={styles.tabBarInfoContainer}>
          <Text style={styles.tabBarInfoText}>This is a tab bar. You can edit it in:</Text>

          <View style={[styles.codeHighlightContainer, styles.navigationFilename]}>
            <MonoText style={styles.codeHighlightText}>navigation/MainTabNavigator.js</MonoText>
          </View>
        </View>*/}
      </View>
    );
  }

  _maybeRenderDevelopmentModeWarning() {
    if (__DEV__) {
      const learnMoreButton = (
        <Text onPress={this._handleLearnMorePress} style={styles.helpLinkText}>
          Learn more
        </Text>
      );

      return (
        <Text style={styles.developmentModeText}>
          Development mode is enabled, your app will be slower but you can use useful development
          tools. {learnMoreButton}
        </Text>
      );
    } else {
      return (
        <Text style={styles.developmentModeText}>
          You are not in development mode, your app will run at full speed.
        </Text>
      );
    }
  }

  _handleLearnMorePress = () => {
    WebBrowser.openBrowserAsync('https://docs.expo.io/versions/latest/guides/development-mode');
  };

  _handleHelpPress = () => {
    WebBrowser.openBrowserAsync(
      'https://docs.expo.io/versions/latest/guides/up-and-running.html#can-t-see-your-changes'
    );
  };
}

const styles = StyleSheet.create({
  gif: {
    width: Dimensions.get('window').width,
    height: 400,
  },
  containerButton: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    backgroundColor: '#fff',
  },
  myButton:{
    padding: 5,
    height: 150,
    width: 150,  //The Width must be the same as the height
    borderRadius:300, //Then Make the Border Radius twice the size of width or Height   
    backgroundColor:'rgb(195, 125, 198)',

  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  contentContainer: {
    paddingTop: 30,
  },
  welcomeContainer: {
    alignItems: 'center',
    textAlign: 'center',
    justifyContent: 'center',
    flex: 10,
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
  navigationFilename: {
    marginTop: 5,
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
});

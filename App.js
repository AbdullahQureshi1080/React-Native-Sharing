/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import SocialShare from './Share';

const App = () => {
  const socialsharing = new SocialShare();
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const icons = [
    {
      name: 'facebook',
      imageImport: require('./icons/facebook-icon.png'),
      title: 'Facebook Share',
      message: 'Hi, sharing this awesome post',
      url: 'https://react-native-share.github.io/react-native-share/docs/share-single',
      shareImageBase64: '',
      imageUrl:
        'https://images.unsplash.com/photo-1438449805896-28a666819a20?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80',
    },
    {
      name: 'twitter',
      imageImport: require('./icons/twitter-icon.png'),
      title: 'Twitter Share',
      message: 'Hi, sharing this awesome post',
      url: 'https://react-native-share.github.io/react-native-share/docs/share-single',
      shareImageBase64: '',
      imageUrl:
        'https://images.unsplash.com/photo-1438449805896-28a666819a20?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80',
    },
    {
      name: 'instagram',
      imageImport: require('./icons/instagram-icon.png'),
      title: 'Instagram Share',
      message: 'Hi, sharing this awesome post',
      url: 'https://react-native-share.github.io/react-native-share/docs/share-single',
      shareImageBase64: '',
      imageUrl:
        'https://images.unsplash.com/photo-1438449805896-28a666819a20?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80',
    },
  ];

  const RenderIcon = ({image, name, data}) => {
    return (
      <TouchableOpacity
        style={styles.iconView}
        onPress={() =>
          handleShareOption(
            data.title,
            data.message,
            data.url,
            data.imageUrl,
            data.shareImageBase64,
            name,
          )
        }>
        <Image source={image} style={styles.image} />
      </TouchableOpacity>
    );
  };

  const handleShareOption = async (
    title,
    message,
    url,
    imageUrl,
    shareImageBase64,
    socialType,
  ) => {
    await socialsharing.open(
      title,
      message,
      url,
      imageUrl,
      shareImageBase64,
      socialType,
    );
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <Text style={styles.head}>React Native Sharing</Text>
        <View style={styles.iconContainer}>
          {icons.map((icon, index) => {
            return (
              <RenderIcon
                image={icon.imageImport}
                name={icon.name}
                data={icon}
                key={index}
              />
            );
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  head: {
    marginTop: 20,
    textAlign: 'center',
    fontSize: 26,
    fontWeight: 'bold',
    color: 'white',
  },
  iconView: {
    backgroundColor: 'red',
    borderRadius: 50 / 2,
  },
  image: {
    height: 50,
    width: 50,
    backgroundColor: 'white',
    borderRadius: 50 / 2,
  },
  iconContainer: {
    marginTop: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 50,
  },
});

export default App;

/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';
import pako from 'pako';
import 'whatwg-fetch';
const Realm = require('realm');
import RNFetchBlob from 'react-native-fetch-blob'

class testRN extends Component {
  componentWillMount() {
    fetch('http://127.0.0.1:8125/bonjour.txt.gz', {
      mode: 'no-cors'
    })
    // fetch('https://api.invesmart.net/bonjour.txt.gz')
    .then(function(response) {
      console.log('response: ', response);
      return response.text();
    })
    .then(function(text) {
      console.log('text %o', text);
      var buf = new ArrayBuffer(text.length*2);
      var bufView = new Uint16Array(buf);
      for (var i=0, strLen=text.length; i < strLen; i++) {
        bufView[i] = text.charCodeAt(i);
      }
      // var buffer = new ArrayBuffer(text.length);
      // var bufferView = new Uint8Array(buffer);
      const unzip = pako.ungzip(text, {to: 'string'}); // Show the HTML for the Google homepage.
      console.log('unzip %o ', unzip);
      return text
    })
    .catch(function(err) {
    	console.log('err %o', err);
    });
  }
  render() {
    let realm = new Realm({
      schema: [{name: 'Dog', properties: {name: 'string'}}]
    });

    realm.write(() => {
      realm.create('Dog', {name: 'Rex'});
    });

    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Count of Dogs in Realm: {realm.objects('Dog').length}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('testRN', () => testRN);

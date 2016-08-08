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
  constructor(props) {
   super(props);
   let cedictArray = [];
   this.state = {
     cedictArray,
   };
  //  this.onRadChange = this.onRadChange.bind(this);
  }
  componentDidMount() {
    RNFetchBlob.fetch('GET', 'http://127.0.0.1:8125/cedict.txt.gz')
    .then((response) => {
      console.log('response %o ', response.ok);
      return response.text();
    })
    .then(text => {
      const unzip = pako.ungzip(text, {to: 'string'});
      console.log('unzip %o ', unzip[0]);
      const cedictArray = this.parse(unzip);
      console.log('cedictArray %o ', cedictArray[100]);
      console.log('cedictArray %o ', cedictArray[101]);
      console.log('cedictArray %o ', cedictArray[102]);
      console.log('cedictArray %o ', cedictArray[103]);
      const cedict = {
        name: 'cedict',
        properties: {
          simplified: 'string',
          traditional: 'string',
          pronunciation: 'string',
          definitions: 'string',
        }
      };
      let realm = new Realm({
        schema: [cedict]
      });

      realm.write(() => {
        console.log('1 realm.objects(cedict).length %o', realm.objects('cedict').length);
        let allBooks = realm.objects('cedict');
        realm.delete(allBooks);
        console.log('2 realm.objects(cedict).length %o', realm.objects('cedict').length);
        console.log('date %o', new Date());
        for (const entry of cedictArray) {
          realm.create('cedict', entry);
        }
        console.log('date %o', new Date());
      });
      console.log('finished writing realm, realm.length %o at %o', realm.objects('cedict').length);
      console.log('start setState cedictArray ');
      this.setState({ cedictArray, realm });
      console.log('finish setState cedictArray ');
    })
    .catch(error => {
      console.log('componentDidMount Error %o ', error);
    })
  }
  parse(contents) {
    const lineRegex = /(\S+)\s+(\S+)\s+\[([^\]]*)\]\s+\/(.*)\/\s*$/;
    const definitions = [];
    const lines = contents.split('\n');
    lines.forEach((line, i) => {
        if(line.startsWith('#') || line === '') return; // skip comments and blanks
        const match = lineRegex.exec(line);
        if(match !== null)
            definitions.push({
                simplified: match[1],
                traditional: match[2],
                pronunciation: match[3],
                definitions: match[4],
            });
        else
          console.log(`Invalid line format ${i + 1}: ${line}\n`);
    });
    return definitions;
  }
  render() {
    // console.log('cedictArray %o ', this.state.cedictArray);
    let cedict;
    let numberOfEntries = 0;
    if (this.state.realm) {
      cedict = this.state.realm.objects('cedict');
      // console.log('cedict from realm %o', cedict);
      console.log('cedict[0].pronunciation %o', cedict[0].pronunciation);
      console.log('cedict.length %o', cedict.length);
      numberOfEntries = cedict.length;
      searchResult = cedict.filtered('simplified == "乘"');
      console.log('searchResult.length %o', searchResult.length);
      console.log('searchResult %o', searchResult);
    }
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Count of entries in Realm: { numberOfEntries }
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

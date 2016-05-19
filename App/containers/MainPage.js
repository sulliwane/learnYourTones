import React, { Component } from 'react';
import {
  StyleSheet,
  ScrollView,
  Text,
  View
} from 'react-native';
import Button from '../utils/Button';
import pinyin from 'pinyin';

class MainPage extends Component {

  constructor(props) {
    super(props);
    this._paste = this._paste.bind(this);
    this.state = {
    };
  }

  _paste() {
    var tones = pinyin('学习声调',{style: pinyin.STYLE_TONE2,});
    for (var i = 0; i < tones.length; i++) {
      var tone = tones[i][0];
      console.log(tone,tone.substr(-1));
    }
  }

  render() {
    return (
      <View style={styles.mainContainer}>
        <Text>MainPage</Text>
        <ScrollView />
        <Button title={'Paste'} onPress={this._paste}/>
      </View>
    );
  }

}

const styles = StyleSheet.create({
  mainContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  }
});

module.exports = MainPage;

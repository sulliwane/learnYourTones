import React, { Component } from 'react';
import {
  StyleSheet,
  ScrollView,
  Clipboard,
  Dimensions,
  Alert,
  Text,
  View
} from 'react-native';
import Button from '../utils/Button';
import pinyin from 'pinyin';
var SCREEN_WIDTH = Dimensions.get('window').width;

class MainPage extends Component {

  constructor(props) {
    super(props);
    this._getTones = this._getTones.bind(this);
    this._setClipboardContent = this._setClipboardContent.bind(this);
    this.state = {
      content: '',
      tones:[],
    };
  }

  async _setClipboardContent(){
    try {
      var content = await Clipboard.getString();
      console.log(content);
      this.setState({content});
     } catch (e) {
       Alert.alert(e.message);
     }
   }

  _getTones() {
    var tones = pinyin(this.state.content,{style: pinyin.STYLE_TONE2,});
    this.setState({tones});
    for (var i = 0; i < tones.length; i++) {
      var tone = tones[i][0];
      console.log(tone,tone.substr(-1));
    }
  }

  render() {
    var tones;
    for (var i = 0; i < this.state.tones.length; i++) {
      tones += this.state.tones[i][0] + ' ';
    }
    return (
      <View style={[styles.mainContainer,{flex:1}]}>
        <Text style={styles.welcome}>
          Welcome to learnYourTones!
        </Text>
        <ScrollView
          automaticallyAdjustContentInsets={false}
          style={{flex: 1}}
          contentContainerStyle={styles.mainContainer}>
          <View style={{flexDirection: 'row',margin:10,justifyContent:'center',width:SCREEN_WIDTH}}>
            <Text>PasteBoard:</Text>
            <Text style={{width:SCREEN_WIDTH - 100}}>{this.state.content}</Text>
          </View>
          <View style={{flexDirection: 'row',margin:10,justifyContent:'center',width:SCREEN_WIDTH}}>
            <Text>Tones:</Text>
            <Text style={{width:SCREEN_WIDTH - 100}}>{tones}</Text>
          </View>
          <Button title={'GetTones'} onPress={this._getTones}/>
          <Button title={'Paste'} onPress={this._setClipboardContent}/>
        </ScrollView>
      </View>
    );
  }

}

const styles = StyleSheet.create({
  mainContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    marginTop: 40,
    marginBottom: 20,
  },
});

module.exports = MainPage;

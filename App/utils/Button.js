import React, { Component } from 'react';
import {
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Text,
  View
} from 'react-native';

class Button extends Component {
  Static: {
  }
  PropTypes: {
    title: React.PropTypes.string,
    containStyle: React.PropTypes.object,
    titleStyle: React.PropTypes.object,
    onPress: React.PropTypes.func,
  }

  render() {
    return (
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={this.props.onPress}>
        <View style={[this.props.containStyle,styles.shadow,styles.containStyle]}>
          <Text style={[this.props.titleStyle,styles.titleStyle]}>{this.props.title}</Text>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  shadow:{
    shadowColor: 'white',
    shadowOffset: {width:2,height:2},
    shadowOpacity: 0.7,
  },
  containStyle: {
    backgroundColor: '#408ffa',
    padding: 5,
    borderRadius: 5,
    margin: 5,
  },
  titleStyle: {
    fontSize: 15,
    color:'white'
  },
});

module.exports = Button;

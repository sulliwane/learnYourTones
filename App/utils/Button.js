import React, { Component } from 'react';
import {
  Component,
  StyleSheet,
  ScrollView,
  Text,
  View
} from 'react-native';

class Button extends Component {
  PropTypes: {
    title: React.PropTypes.string,
    containStyle: React.PropTypes.object,
    titleStyle: React.PropTypes.object,
    onPress: React.PropTypes.func,
  }

  getDefaultProps: function () {
    return {
      title: 'Button',
      containStyle: {backgroundColor: '#408ffa',padding: 5,borderRadius: 5},
      titleStyle: {fontSize: 15,color:'white'},
      onPress: () => {},
    };
  }

  render: function() {
    return (
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={this.props.onPress}>
        <View style={[this.props.containStyle,styles.shadow]}>
          <Text style={this.props.titleStyle}>{this.props.title}</Text>
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
});

module.exports = Button;

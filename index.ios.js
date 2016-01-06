const React = require('react-native')
const {
  Text,
  View,
  TouchableHighlight,
  StyleSheet,
  AppRegistry
} = React


const StopWatch = React.createClass({
  getInitialState() {
      return {
        timeElapsed: null
      };
  },
  render: function() {
    return (
      <View style={style.container}>
        {this.header()}
        {this.footer()}
      </View>
    )
  },
  header: function() {
    return(
      <View style={[style.header, this.border('yellow')]}>
        {this.timerDisplay()}
        <View style={[style.buttonWrapper, this.border('green')]}>
          {this.startStopButton()}
          {this.lapButton()}
        </View>
      </View>
    )
  },
  timerDisplay: function() {
    return(
      <View style={[style.timerWrapper, this.border('red')]}>
        <Text style={style.timer}>
          {this.state.timeElapsed}
        </Text>
      </View>
    )
  },
  startStopButton: function() {
    return(
      <TouchableHighlight
        underlayColor="gray"
        onPress={this.handleStartPress}
      >
        <Text>
          Start
        </Text>
      </TouchableHighlight>
    )
  },
  lapButton: function() {
    return(
      <View style={style.button}>
        <Text>
          Lap
        </Text>
      </View>
    )
  },

  footer: function() {
    return(
      <View style={[style.footer, this.border('blue')]}>
        <Text>I am a list of Laps</Text>
      </View>
    )
  },
  lapList: function() {
    return(
      <View>
      </View>
    )
  },
  handleStartPress: function() {
    let startTime = new Date()

    setInterval(() => {
      this.setState({
        timeElapsed: new Date() - startTime
      })
    }, 30)
  },
  border: (color) => ({borderColor: color, borderWidth: 4})
})

const style = StyleSheet.create({
  container: {
    flex: 1, // Fill the entire screen
    alignItems: 'stretch'
  },

  header: { // Yellow
    flex: 1
  },
  footer: { // Blue
    flex: 1
  },

  timerWrapper: { // Red
    flex: 5,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonWrapper: {
    flex: 3,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },

  timer: {},
  button: {},

})

AppRegistry.registerComponent('stopwatch', () => StopWatch)

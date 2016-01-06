const formatTime = require('minutes-seconds-milliseconds')
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
      <View style={[style.header]}>
        {this.timerDisplay()}
        <View style={[style.buttonWrapper]}>
          {this.startStopButton()}
          {this.lapButton()}
        </View>
      </View>
    )
  },
  timerDisplay: function() {
    return(
      <View style={[style.timerWrapper]}>
        <Text style={style.timer}>
          {formatTime(this.state.timeElapsed)}
        </Text>
      </View>
    )
  },
  startStopButton: function() {
    return(
      <TouchableHighlight
        underlayColor="gray"
        onPress={this.handleStartPress}
        style={[style.button, style.startButton]}>
        <Text>
          Start
        </Text>
      </TouchableHighlight>
    )
  },
  lapButton: function() {
    return(
      <TouchableHighlight style={style.button}>
        <Text>
          Lap
        </Text>
      </TouchableHighlight>
    )
  },

  footer: function() {
    return(
      <View style={[style.footer]}>
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
  }
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

  timer: {
    fontSize: 60,
    fontFamily: 'HelveticaNeue-Light',
    fontWeight: '100'
  },
  button: {
    borderWidth: 2,
    height: 100,
    width: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center'
  },
  startButton: {
    borderColor: 'green'
  }

})

AppRegistry.registerComponent('stopwatch', () => StopWatch)

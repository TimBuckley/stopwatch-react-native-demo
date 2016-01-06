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
        timeElapsed: null,
        startTime: null,
        running: false,
        laps: []
      }
  },
  render: function() {
    return (
      <View style={styles.container}>
        {this.header()}
        {this.footer()}
      </View>
    )
  },
  header: function() {
    return(
      <View style={[styles.header]}>
        {this.timerDisplay()}
        <View style={[styles.buttonWrapper]}>
          {this.startStopButton()}
          {this.lapButton()}
        </View>
      </View>
    )
  },
  timerDisplay: function() {
    return(
      <View style={[styles.timerWrapper]}>
        <Text style={styles.timer}>
          {formatTime(this.state.timeElapsed)}
        </Text>
      </View>
    )
  },
  startStopButton: function() {
    let style = this.state.running ? styles.stopButton : styles.startButton
    return(
      <TouchableHighlight
        underlayColor="gray"
        onPress={this.handleStartPress}
        style={[styles.button, style]}>
        <Text>
          {this.state.running ? 'Stop' : 'Start'}
        </Text>
      </TouchableHighlight>
    )
  },
  lapButton: function() {
    return(
      <TouchableHighlight
        onPress={this.handleLapPress}
        style={styles.button}>
        <Text>
          Lap
        </Text>
      </TouchableHighlight>
    )
  },

  footer: function() {
    return(
      <View style={[styles.footer]}>
        {this.laps()}
      </View>
    )
  },
  laps: function() {
    return this.state.laps.map((time, index) => (
      <View
        key={index}
        style={styles.lap}>
        <Text style={styles.lapText}>
          Lap #{index + 1}
        </Text>
        <Text style={styles.lapText}>
           {formatTime(time)}
        </Text>
      </View>))
  },
  handleStartPress: function() {
    if (this.state.running) {
      clearInterval(this.interval)
      this.setState({running: false})
      return
    }

    this.setState({startTime: new Date()})

    this.interval = setInterval(() => {
      this.setState({
        timeElapsed: new Date() - this.state.startTime,
        running: true
      })
    }, 30)
  },
  handleLapPress: function() {
    let lap = this.state.timeElapsed
    this.setState({
      startTime: new Date(),
      laps: this.state.laps.concat([lap])
    })
  }
})


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch'
  },

  header: {flex: 1},
  footer: {flex: 1},

  timerWrapper: {
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
  },
  stopButton: {
    borderColor: 'red'
  },

  lap: {
    justifyContent: 'space-around',
    flexDirection: 'row'
  },
  lapText: {
    fontSize: 30
  }

})

AppRegistry.registerComponent('stopwatch', () => StopWatch)

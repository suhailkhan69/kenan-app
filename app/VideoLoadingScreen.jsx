// VideoLoadingScreen.js
import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import Video from 'react-native-video';

const { width, height } = Dimensions.get('window');

const VideoLoadingScreen = () => {
  return (
    <View style={styles.container}>
      <Video
        source={require('../assets/white-pulse.mp4')} // Replace with the path to your video file
        style={styles.backgroundVideo}
        repeat
        resizeMode="cover"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  backgroundVideo: {
    width,
    height,
    position: 'absolute',
  },
});

export default VideoLoadingScreen;

import React, { useState, useEffect } from 'react';
import { View, Image, StyleSheet } from 'react-native';

import LoadingGif from '../assets/loading-moto.gif';

const Loading = ({ onComplete }) => { 
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      if (onComplete) { 
        onComplete();
      }
    }, 5000); 

    return () => clearTimeout(timer); 
  }, []);

  if (!isVisible) {
    return null; 
  }

  return (
    <View style={styles.container}>
      <Image source={LoadingGif} style={styles.loadingImage} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff', 
  },
  loadingImage: {
    width: 150, 
    height: 150,
  },
});

export default Loading;
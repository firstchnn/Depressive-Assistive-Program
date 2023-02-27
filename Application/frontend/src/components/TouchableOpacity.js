import React from 'react';
import {TouchableOpacity, Image} from 'react-native';

function ArrowButton({onPress}) {
  return (
    <TouchableOpacity onPress={onPress}>
      <Image
        source={require('path/to/arrow.png')}
        style={{width: 20, height: 20}}
      />
    </TouchableOpacity>
  );
}

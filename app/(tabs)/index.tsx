import { Text, View } from 'react-native';

import React from 'react';

const Index = (): React.JSX.Element => {
  return (
    <View
      className="flex-1 justify-center items-center"
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Text>Edit app/index.tsx to edit this screen.</Text>
    </View>
  );
};

export default Index;

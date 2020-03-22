import React, { useState } from 'react';
import { View, TouchableOpacity, Text, Dimensions, Animated, PanResponder, LayoutAnimation, UIManager, NavigationEvents, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import ToggleSwitch from '../components/ToggleSwitch';
import { customColors } from '../styles';
import Title from '../components/Title';

const SWIPE_THRESHOLD = 124;
const SCREEN_WIDTH = Dimensions.get('window').width;

function ListItem({ item, navigation, toggleFunction, onListNavigate, onItemDelete }) {

  const _position = new Animated.ValueXY(0,0);
  const [position, setPosition] = useState(_position)

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: (event, gesture) => {
    	position.setValue({ x: gesture.dx, y: 0 });
    },
    onPanResponderRelease: (event, gesture) => {
      if(gesture.dx > SWIPE_THRESHOLD - 40) {
        position.setValue({ x: 124, y: 0 });
      } else if(gesture.dx < -SWIPE_THRESHOLD + 40) {
        position.setValue({ x: -124, y: 0 });
      } else {
        resetItem();
      }
      UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
      LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
    }
  });

  const resetItem = () => {
    Animated.spring(position, {
      toValue: { x: 0, y: 0 }
    }).start()
  }

  return (

    <TouchableOpacity activeOpacity={1} style={{height: 140, position: 'relative'}} onPress={() => resetItem()}>
      <Animated.View key={item.socket} style={[position.getLayout(), styles.itemContainer]} {...panResponder.panHandlers}>
        <View style={styles.itemLeft}>
          <Title title={item.name} size={20} />
          <Text style={styles.room}>{item.room}</Text>
          <Text style={styles.socket}>- Socket # {item.socket} -</Text>
        </View>
        <View style={styles.itemRight}>
          <ToggleSwitch onPress={() => {
            toggleFunction(item);
          }} />
        </View>
      </Animated.View>
      <View style={styles.backgroundView}>
        <TouchableOpacity
          onPress={() => {
            onListNavigate(item)
            resetItem();
          }}
          style={styles.editButton}
        >
          <FontAwesome name={'edit'} size={48} color={customColors.mainDark} />
          <Text style={{fontSize: 16, color: customColors.mainDark}}>Edit Device</Text>
        </TouchableOpacity>
        <View style={{ width: (SCREEN_WIDTH - (124 * 2)), height: '100%'}}></View>
        <TouchableOpacity
          onPress={() => {
            onItemDelete(item);
          }}
          style={styles.deleteButton}
        >
          <FontAwesome name={'trash-o'} size={48} color={customColors.mainBlack} />
          <Text style={{fontSize: 16, color: customColors.mainBlack}}>Delete Device</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>

  )
}

const styles = StyleSheet.create({
  backgroundView: {
    height: '100%',
    width: '100%',
    position: 'absolute',
    flexDirection: 'row',
    backgroundColor: customColors.mainBlack,
    top: 0,
    right: 0
  },
  editButton: {
    height: '100%',
    width: 124,
    backgroundColor: customColors.mainGreen,
    alignItems: 'center',
    justifyContent: 'center',
  },
  deleteButton: {
    height: '100%',
    width: 124,
    backgroundColor: customColors.mainRed,
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemContainer: {
    flex: 1,
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: customColors.mainBlack,
    paddingHorizontal: 24,
    paddingVertical: 12,
    zIndex: 2,
    backgroundColor: customColors.mainDark
  },
  itemLeft: {
    width: '70%',
  },
  itemRight: {
    width: '30%',
    justifyContent: 'center',
    alignItems: 'flex-end'
  },
  room: {
    color: customColors.mainGrey,
    fontStyle: 'italic'
  },
  socket: {
    color: customColors.secondaryGreen,
    marginVertical: 8
  }
})


export default ListItem;

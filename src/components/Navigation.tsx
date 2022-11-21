import { FC } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { HistoryScreen } from '../screens/HistoryScreen';
import { TodayScreen } from '../screens/TodayScreen';
import { StyleSheet } from 'react-native';

import { colors, HISTORY_NAME, TODAY_NAME } from '../../constants';

import Today from '../../assets/images/today.svg';
import History from '../../assets/images/history.svg';

const Tab = createBottomTabNavigator();

export const Navigation:FC = () => (
  <NavigationContainer>
    <Tab.Navigator
      initialRouteName={TODAY_NAME}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused }) => {
          const iconColor = focused ? colors.active : colors.inactive;

          if (route.name === TODAY_NAME) {
            return <Today stroke={iconColor} />;
          } else if (route.name === HISTORY_NAME) {
            return <History stroke={iconColor} />;
          }
        },
        tabBarActiveTintColor: '#9763ff',
        tabBarInactiveTintColor: '#c1c3c6',
        tabBarStyle: {
          alignItems: 'center',
          paddingBottom: 10,
          paddingTop: 10,
          height: 68,
        },
        tabBarItemStyle: {
          flexGrow: 0.2,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          lineHeight: 16,
        },
      })}
    >
      <Tab.Screen
        name={TODAY_NAME}
        component={TodayScreen}
        options={{
          title: TODAY_NAME,
          headerStyle: styles.header,
          headerTitleStyle: styles.headerTitle,
        }}
      />
      <Tab.Screen
        name={HISTORY_NAME}
        component={HistoryScreen}
        options={{
          title: HISTORY_NAME,
          headerStyle: styles.header,
          headerTitleStyle: styles.headerTitle,
        }}
      />
    </Tab.Navigator>
  </NavigationContainer>
);

const styles = StyleSheet.create({
  navigationContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    height: 144,
    borderBottomColor: '#e6e6e6',
    borderBottomWidth: 1,
  },
  headerTitle: {
    fontFamily: 'Inter-Bold',
    fontWeight: '700',
    fontSize: 36,
    marginTop: 40,
  }
});

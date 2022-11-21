import { StyleSheet, View } from 'react-native';
import { CurrentJoke } from '../components/CurrentJoke';
import { colors } from '../../constants';


export const TodayScreen = () => (
  <View style={styles.container}>
    <CurrentJoke />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    backgroundColor: colors.white,
  },
});

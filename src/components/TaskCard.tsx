import React, { FC, ReactElement } from 'react';
import {
    View,
    StyleSheet,
    Text,
} from 'react-native';

const TaskCard: FC<{list: Array<string>}> = ({list}) : ReactElement => {

return (
<View style={styles.card}>
    <Text>Placeholder text.</Text>
</View>
);
};

const styles = StyleSheet.create({
card: {
    backgroundColor: "green",
    marginTop: 32,
    paddingHorizontal: 24
}
});

export default TaskCard;
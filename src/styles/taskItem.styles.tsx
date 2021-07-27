// React
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    itemContainer: {
        position: "relative",
        borderRadius: 6,
        width: 300,
        height: 80,
        backgroundColor: '#24292e',
        marginBottom: 10,
        shadowColor: "#000",
        elevation: 8,
    },
    itemFont: {
        color: 'white',
        fontSize: 20,
        fontFamily: "Rubik-Regular",
    },
    checkboxContainer: {
        marginLeft: 10,
        marginTop: 19
    },
    notesIconContainer: { alignSelf: "flex-end", marginRight: 10, marginTop: -40 },
    dateText: {elevation: 12, fontFamily: "Rubik-Light", fontSize: 15, position: "absolute", top: 55, left: 10}
});
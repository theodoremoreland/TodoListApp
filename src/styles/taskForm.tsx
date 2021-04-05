// React
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    modal: {
        backgroundColor: "black"
    },
    modalHeader: {
        zIndex: 1,
        elevation: 1,
        position: "absolute",
        top: 0,
        backgroundColor: "#0366d6",
        height: 50,
        width: "100%"
    },
    title : {
        fontFamily: "Rubik-Medium",
        fontSize: 20,
        color: "white",
        position: "absolute",
        top: 13,
        left: 45
    },
    form: {
        marginTop: 65,
    },
    label: {
        fontSize: 20,
        fontFamily: "Rubik-Light",
        marginLeft: 13,
        marginTop: 10
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        flexShrink: 0
    },
    button: {
        height: 80,
        width: 80,
        borderRadius: 200,
        backgroundColor: "blue"
    },
    buttonText: {
        color: "white",
        marginTop: 15
    }
});
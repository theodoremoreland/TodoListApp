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
    backArrow : {marginTop: 7},
    form: {
        marginTop: 65,
    },
    datePicker: {alignSelf: "center"},
    label: {
        fontSize: 20,
        fontFamily: "Rubik-Light",
        color: "#24292e",
        marginLeft: 13,
        marginTop: 10
    },
    input: {
        height: 50,
        margin: 12,
        borderWidth: 0,
        flexShrink: 0,
        backgroundColor: "#24292e",
        color: "#f6f8fa",
        fontSize: 16
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
    },
    addTaskButtonContainer : { alignSelf: "flex-end", marginRight: 5 },
    deleteTaskButtonContainer : { alignSelf: "flex-start" },
    updateTaskButtonContainer: { alignSelf: "flex-end", marginTop: -55 }

});
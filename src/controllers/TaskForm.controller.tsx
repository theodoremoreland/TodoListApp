import { Alert } from "react-native";

export const validateSubmission = (newTaskName : string, newDueDate : Date) : boolean => {
    let alert : string = "";
    const fieldIsFalsy : boolean = newTaskName == "";
    const dateIsInPast : boolean = (newDueDate < new Date());
    alert = fieldIsFalsy ? "Task must have a name." : alert;
    alert = dateIsInPast ? alert + "\nDue date must be in the future." : alert;

    if(fieldIsFalsy || dateIsInPast) {
        Alert.alert(alert);
        return false;
    };

    return true;
};
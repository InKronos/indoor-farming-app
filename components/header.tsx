import { StyleSheet } from "react-native";
import { Appbar } from "react-native-paper";

const HeaderComponent = (props: HeaderComponentParams) => {

    return (
        <>
            <Appbar.Header style={{backgroundColor: "#0082fc"}}>
                <Appbar.Content title={props.title} color={headerStyle.appBack.color}/>
            </Appbar.Header>
        </>
    )
}

interface HeaderComponentParams {
    title: string;
    hasBackButton: boolean;
}

export default HeaderComponent;

export const headerStyle = StyleSheet.create({

    appBack: {
        backgroundColor: "0082fc",
        color: "white"
    },
 
}) 
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Badge } from "react-native-paper";

export default function AverageComponent(props) {
    // Style the OIS
    const renderOIS = (ois) => {
        ois = ois.map((oi, index) => {
            if (index === ois.length - 1) {
                return <Text key={oi + ""}> {oi} </Text>;
            }
            return <Text key={oi + ""}> {oi}, </Text>;
        });
        return ois;
    };

    const styles = StyleSheet.create({
        container: {
            marginTop: 10,
            width: "80%",
            borderLeftWidth: 5,
            borderLeftColor: props.option.op === "CE" ? "green" : "red",
            backgroundColor: "#ccc",
            elevation: 5,
            textAlign: "center",
            padding: 2,
        },
        txt: {
            textAlign: "center",
            fontSize: 18,
        },
    });

    return (
        <View style={styles.container}>
            <Text style={styles.txt} numberOfLines={3}>
                Average is {props.avg} ({renderOIS(props.ois)}){" "}
                {props.option.op} ({props.option.value})
            </Text>
        </View>
    );
}

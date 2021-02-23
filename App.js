import React from "react";
import {
    Provider,
    Button,
    RadioButton,
    TextInput,
    Divider,
    IconButton,
} from "react-native-paper";
import { StyleSheet, Text, View, LogBox } from "react-native";
import AverageComponent from "./src/components/AverageComponent";

export default function App() {
    LogBox.ignoreAllLogs();

    const [checked, setChecked] = React.useState("CE");
    const [cepeValue, setCepeValue] = React.useState("");
    const [currentOI, setCurrentOI] = React.useState("");
    const [oiArray, setOiArray] = React.useState([]);
    const [oiTotalValue, setOiTotalValue] = React.useState(0);
    const [oiCounter, setOiCounter] = React.useState(0);
    const [currentAvg, setCurrentAvg] = React.useState(0);
    const [avgComponents, setAvgComponents] = React.useState([]);

    const clearUp = () => {
        setAvgComponents([
            ...avgComponents,
            <AverageComponent
                avg={oiTotalValue / oiCounter}
                ois={oiArray}
                option={{ op: checked, value: cepeValue }}
                key={new Date().toISOString()}
            />,
        ]);
        setCepeValue("");
        setCurrentOI("");
        setOiArray([]);
        setOiTotalValue(0);
        setOiCounter(0);
    };
    return (
        <Provider>
            <View style={styles.container}>
                {/* CE / PE */}
                <View style={styles.cepe}>
                    <View style={styles.cepeRadioButtons}>
                        <View style={styles.cepeRadioButton}>
                            <Text style={styles.cepeRadioButtonsText}>CE</Text>
                            <RadioButton
                                value="CE"
                                status={
                                    checked === "CE" ? "checked" : "unchecked"
                                }
                                onPress={() => setChecked("CE")}
                                color="green"
                            />
                        </View>

                        <View style={styles.cepeRadioButton}>
                            <Text style={styles.cepeRadioButtonsText}>PE</Text>
                            <RadioButton
                                value="PE"
                                status={
                                    checked === "PE" ? "checked" : "unchecked"
                                }
                                onPress={() => setChecked("PE")}
                                color="red"
                            />
                        </View>
                    </View>
                    <View style={styles.cepeInput}>
                        <TextInput
                            label="Value of CE / PE"
                            value={cepeValue + ""}
                            mode="outlined"
                            onChangeText={(cepeValue) =>
                                setCepeValue(cepeValue)
                            }
                        />
                    </View>
                </View>

                {/* OI */}
                <View style={styles.oi}>
                    <TextInput
                        label="OI"
                        value={currentOI + ""}
                        mode="outlined"
                        onChangeText={(currentOI) => setCurrentOI(currentOI)}
                    />
                    <Button
                        icon="plus"
                        mode="contained"
                        style={{ marginTop: 6 }}
                        onPress={() => {
                            let newOI = oiTotalValue + parseFloat(currentOI);
                            setOiTotalValue(newOI);
                            setOiArray([...oiArray, parseFloat(currentOI)]);
                            setCurrentOI("");
                            setOiCounter(oiCounter + 1);
                        }}
                        disabled={!currentOI}
                    >
                        Add OI
                    </Button>
                </View>

                {/* Average Button */}
                <View>
                    <Button
                        icon="plus"
                        mode="contained"
                        color="green"
                        disabled={!oiTotalValue}
                        onPress={() => {
                            setCurrentAvg(oiTotalValue / oiCounter);
                            clearUp();
                        }}
                    >
                        Average
                    </Button>
                </View>

                {/* List of averages */}
                {avgComponents ? avgComponents : null}

                {/* Refresh App */}
                <View style={styles.refresh}>
                    <IconButton
                        icon="refresh"
                        color="red"
                        mode="contained"
                        size={40}
                        onPress={() => {
                            setAvgComponents([]);
                            setCepeValue("");
                            setCurrentOI("");
                            setOiArray([]);
                            setOiTotalValue(0);
                            setOiCounter(0);
                        }}
                    ></IconButton>
                </View>
            </View>
        </Provider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "flex-start",
        paddingTop: 100,
    },

    cepe: {
        // backgroundColor: "pink",
        flexDirection: "row",
    },
    cepeRadioButtons: {
        flexDirection: "row",
    },
    cepeRadioButton: {
        marginRight: 20,
    },
    cepeRadioButtonsText: {
        textAlign: "center",
    },
    cepeInput: {
        width: "40%",
        marginLeft: 5,
    },

    oi: {
        width: "80%",
        padding: 20,
    },

    refresh: {
        paddingBottom: 20,
    },
});

import React, {useState} from "react";
import { 
    View, 
    Text, 
    TextInput, 
    TouchableOpacity,
    Vibration,
    Pressable,
    Keyboard
    } from "react-native";
import ResultIMC from "./ResultIMC/";
import styles from "./style";

export default function Form(){
    const [height, setHeight] = React.useState(null);
    const [weight, setWeight] = React.useState(null);
    const [messageIMC, setmessageIMC] = React.useState("Preencha o Peso e Altura.");
    const [imc, setImc] = React.useState(null);
    const [textButton, setTextButton] = React.useState("Calcular");
    const [errorMessage, setErrorMessage] = React.useState(null);


function imcCalculator(){
    let heightFormat = height.replace(",",".");
    let weightFormat = weight.replace(",",".");
    return setImc((weightFormat/(heightFormat*heightFormat)).toFixed(2))
}

function verificationImc(){
    if (imc == null){
        Vibration.vibrate();
        
        setErrorMessage("Campo Obrigatório*");
    }
}

function validationImc(){
    if(weight != null && height != null){
            imcCalculator()
            setHeight(null)
            setWeight(null)
            setmessageIMC("Seu IMC é igual:")
            setTextButton("Calcular Novamente.")
            setErrorMessage(null);
            return
    }
    verificationImc();
    setImc(null);
    setTextButton("Calcular");
    setmessageIMC("Preencha o Peso e Altura");
}

    return (
        <Pressable onPress={Keyboard.dismiss} style = {styles.formContext}>
            <View style = {styles.form}>
                <Text style = {styles.formLabel}>Altura <Text style = {styles.errorMessage}>{errorMessage}</Text></Text>
                
                <TextInput 
                    style = {styles.input}
                    onChangeText={setHeight}
                    value={height}
                    placeholder="Ex: 1.75"
                    keyboardType="numeric"
                />
                
                <Text style={styles.formLabel}>Peso <Text style={styles.errorMessage}>{errorMessage}</Text></Text>
                <TextInput
                    style = {styles.input}
                    onChangeText={setWeight}
                    value={weight}
                    placeholder="Ex: 75.365"
                    keyboardType="numeric"
                />
                <TouchableOpacity
                    style = {styles.buttonCalculator}
                    onPress={() => validationImc()}
                >
                    <Text style={styles.textButtonCalculator}>{textButton}</Text>
                </TouchableOpacity>
            </View>
            <ResultIMC messageResultIMC={messageIMC} resultIMC={imc}/>
        </Pressable>
    );
}
import { SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View, Keyboard } from "react-native"
import api from "./src/services/api"
import { useState, useRef } from "react"

export default function App() {
    const [cep, setCep] = useState('')
    const inputRef = useRef(null)
    const [cepUser, setCepUser] = useState(null)

    async function buscar() {
        if (cep == '') {
            alert('Digite um cep valido')
            setCep('')
            return;
        }
        try {
            const response = await api.get(`/${cep}/json`);
            console.log(response.data);
            setCepUser(response.data);
            Keyboard.dismiss();
        } catch (error) {
            console.log('Error ' + error);
        }

    }

    function limpar() {
        setCep('');
        inputRef.current.focus()
    }


    return (
        <SafeAreaView style={styles.container}>
            <View style={{ alignItems: "center", marginTop: '5%' }}>
                <Text style={styles.text}> Digite o cep desejado</Text>
                <TextInput style={styles.input}
                    placeholder="000000"
                    value={cep}
                    onChangeText={(texto) => setCep(texto)}
                    keyboardType="numeric"
                    ref={inputRef}
                />
            </View>

            <View style={styles.areaBtn}>
                <TouchableOpacity style={[styles.botao, { backgroundColor: '#1d75cd' }]}
                    onPress={buscar}>
                    <Text style={styles.botaotext}>Buscar</Text>
                </TouchableOpacity>

                <TouchableOpacity style={[styles.botao, { backgroundColor: '#cd3e1d' }]}
                    onPress={limpar}>
                    <Text style={styles.botaotext}>Limpar</Text>
                </TouchableOpacity>
            </View>

            {cepUser &&
                <View style={styles.resultado}>
                    <Text style={styles.itemText}> CEP: {cepUser.cep}</Text>
                    <Text style={styles.itemText}> Logradouro: {cepUser.logradouro}</Text>
                    <Text style={styles.itemText}> Bairro: {cepUser.bairro}</Text>
                    <Text style={styles.itemText}> Cidade: {cepUser.localidade}</Text>
                    <Text style={styles.itemText}> Estado: {cepUser.uf}</Text>
                    <Text style={styles.itemText}> DDD: {cepUser.ddd}</Text>
                </View>
            }


        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center"
    },
    text: {
        marginTop: 25,
        marginBottom: 15,
        fontSize: 25,
        fontWeight: "bold"
    },
    input: {
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 5,
        width: '90%',
        padding: 10,
        fontSize: 18,
    },
    areaBtn: {
        alignItems: "center",
        flexDirection: "row",
        marginTop: 15,
        justifyContent: "space-around"
    },
    botao: {
        height: 55,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 5,
        padding: 15
    },
    botaotext: {
        fontSize: 20,
        color: '#fff'
    },
    resultado: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    itemText: {
        fontSize: 22
    }
})
import { StyleSheet, View } from 'react-native'
import React, {useState} from 'react'
import { Button, Input } from 'react-native-elements';

const LoginScreen = ({navigation}) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
  return (
    <View style={styles.container}>
        <Input leftIcon={{ type:"font-awesome", name:"book"}} onChange={text => setEmail(text) 
        }
        label="Email"
        placeholder="email"
        value={email}
        />
        <Input leftIcon={{ type:"font-awesome", name:"lock"}} onChange={text => setPassword(text) 
        }
        label="Password"
        placeholder="password"
        value={password}
        secureTextEntry
        />
        <Button title={"Register"} style={styles.button} onPress={ ()=>{navigation.navigate("Register")}} />
        <Button title={"Login"} style={styles.button} />
    </View>
  )
}

const styles = StyleSheet.create({
    button:{
        width: 200,
        marginTop: 10,
    },
    container: {
        flex: 1,
        padding: 10,
        alignItems: 'center'
    }
})

export default LoginScreen
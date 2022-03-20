import { StyleSheet, View } from 'react-native'
import React, {useState, useEffect} from 'react'
import { Button, Input } from 'react-native-elements';
import { auth } from '../firebase';

const LoginScreen = ({navigation}) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");



    const signIn = () => {
      auth.createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Signed in
        var user = userCredential.user;
        // ...
        console.log(user)
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        // ..
      });


    }



    const unsuscribe = () => {

        auth.onAuthStateChanged((user) => {
            if (user) {
              // User is signed in, see docs for a list of available properties
              // https://firebase.google.com/docs/reference/js/firebase.User
              var uid = user.uid;
              // ...
              navigation.replace('Chat');
              console.log(uid)
            } else {
              // User is signed out
              // ...
              navigation.canGoBack() && navigation.popToTop();
            }
          });
    

    }

    useEffect(() => {  
            unsuscribe()
    }, [])
    

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
        <Button title={"Login"} onPress={signIn} style={styles.button} />
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
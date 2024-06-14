import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, SafeAreaView, TextInput, Alert } from "react-native";
import React, { useState, useEffect } from "react";
import styles from "./login.style";
import { COLORS } from '../constants';
import { BackBtn, Button } from "../component";
import {Formik} from 'formik';
import * as Yup from 'yup';
import {MaterialCommunityIcons} from "@expo/vector-icons";
import axios from "axios";

const validationSchema= Yup.object().shape({
    password: Yup.String()
        .min(8, 'Must be at least 8 characters')
        .required('Required'),
    email: Yup.String()
        .email('Invalid email address')
        .required('Required'),
});

const LoginPage = ({ navigation }) => {
    const [loader,setLoader] = useState(false);
    const [responseData,setResponseData] = useState(null);
    const [obsecureText,setObsecureText] = useState(false)
    /*const [input,setInput] = useState({
        email: '',
        password: ''

    })*/

    const inValidForm = () => {
        Alert.alert(
            "Invalid Form",
            "Please provide all required fields",
            (
                {
                    text: "Cancel", onPress: () => {}
                },
                {
                    text: "Continue", onPress: () => {}
                },
                { defaultIndex: 1 }
            )
        )
    }

    const login = async(values) => {
        setLoader(true)

        try {
            const endpoint = "http://localhost:3000/api/login"
            const data = values;

            const response = await axios.post(endpoint, data)
            if (response.status === 200) {
                setLoader(false);
                setResponseData(response.data)
                //console.log('user${responseData._id}');
                await AsyncStorage.setItem(
                    'user${responseData._id}', 
                    JSON.stringify(responseData)
                );
                await AsyncStorage.setItem('id', JSON.stringify(responseData._id));
                navigation.replace('BottomNavigation');

               // const newUser = await AsyncStorage.getItem('user${responseData._id}')
                //console.log(newUser);
            }else{
                Alert.alert(
                    "Error logging in",
                    "Please provide valid credential",
                    (
                        {
                            text: "Cancel", onPress: () => { }
                        },
                        {
                            text: "Continue", onPress: () => { }
                        },
                        { defaultIndex: 1 }
                    )
                )
            }
        } catch (error) {
            Alert.alert(
                "Error",
                "Oops, Error logging in try again with correct credential",
                (
                    {
                        text: "Cancel", onPress: () => { }
                    },
                    {
                        text: "Continue", onPress: () => { }
                    },
                    { defaultIndex: 1 }
                )
            )
        }
        finally{
            setLoader(false);
        }
    };

    return (
       <ScrollView>
        <SafeAreaView style={{marginHorizontal: 20}}>
            <View>
                <BackBtn onPress={()=>navigation.goBack()}/>
                <Image
                    source={require('../assets/images/splash.png')}
                    style={styles.cover}
                />

                <Text style={styles.title}>Unlimited Luxurious Furniture</Text>

                <Formik
                    initialValues={{email: '',password: ''}}
                    validationSchema={validationSchema}
                    onSubmit={values => login(values)}
                >
                {({handleChange,handleBlur,handleSubmit,values,errors,touched,isValid,setFieldTouched}) => (
                     <View>

                        <View style={styles.wrapper}>
                            <Text style={styles.label}>Email</Text>
                            <View style={styles.inputWrapper(touched.email ? COLORS.secondary: COLORS.offwhite)}>
                                <MaterialCommunityIcons
                                    name='email-outline'
                                    size={20}
                                    color={COLORS.gray}
                                    style={styles.iconStyle}
                                />

                                <TextInput
                                    placeholder="Enter email"
                                    onFocus={()=>{setFieldTouched('email')}}
                                    onBlur={()=>{setFieldTouched('email','')}}
                                    value={values.email}
                                    onChangeText={handleChange('email')}
                                    autoCapitalize="none"
                                    autoCorrect={false}
                                    style={{flex: 1}}
                                />
                            </View>
                            {touched.email && errors.email && (
                                <Text style={styles.errorMessage}>{errors.email}</Text>
                            )}
                        </View>

                        <View style={styles.wrapper}>
                            <Text style={styles.label}>Password</Text>
                            <View style={styles.inputWrapper(touched.password ? COLORS.secondary: COLORS.offwhite)}>
                                <MaterialCommunityIcons
                                    name='lock-outline'
                                    size={20}
                                    color={COLORS.gray}
                                    style={styles.iconStyle}
                                />

                                <TextInput
                                    secureTextEntry={obsecureText}
                                    placeholder="Password"
                                    onFocus={()=>{setFieldTouched('password')}}
                                    onBlur={()=>{setFieldTouched('password','')}}
                                    value={values.email}
                                            onChangeText={handleChange('password')}
                                    autoCapitalize="none"
                                    autoCorrect={false}
                                    style={{flex: 1}}
                                />
                                <TouchableOpacity onPress={()=> {setObsecureText(!obsecureText)}}>
                                    <MaterialCommunityIcons
                                        name={obsecureText? "eye-outline" : "eye-off-outline"}
                                        size={18}
                                    />
                                </TouchableOpacity>
                            </View>
                                 {touched.password && errors.password && (
                                    <Text style={styles.errorMessage}>{errors.password}</Text>
                            )}
                        </View>
                       
                        <Button 
                            loader={loader}
                            title={"L O G I N"} 
                            onPress={isValid ?handleSubmit: inValidForm} 
                            isValid={isValid}
                        />

                        <Text style={styles.registration} onPress={()=> {navigation.navigate('Signup')}}>Register</Text>
                    </View>
                )}
                    
                    
                </Formik>
            </View>
        </SafeAreaView>
       </ScrollView>
    )
}

export default LoginPage

const styles = StyleSheet.create({})
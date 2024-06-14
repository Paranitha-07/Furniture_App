import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useEffect, useState } from "react";
import {Ionicons, Fontisto} from "@expo/vector-icons";
import styles from './home.style'; 
import { Welcome } from "../components/index.js/index.js";
import Carousel from "../components/home/Carousel";
import Headings from "../components/home/Headings";
import ProductRow from "../components/products/ProductRow";
const Home = () => {
    const [userData, setUserData] = useState(null)
    const [userLogin, setUserLogin] = useState(false)

    useEffect(()=>{
        checkExistingUser();
    },[]);

    const checkExistingUser = async () => {
        const id = await AsyncStorage.getItem('id')
        const useId = 'user${JSON.parse(id)}';

        try {
            const currentUser = await AsyncStorage.getItem(useId);

            if (currentUser !== null) {
                const parsedData = JSON.parse(currentUser)
                setUserData(parsedData)
                setUserLogin(true)
            }
        } catch (error) {
            console.log("Error retrieving the data: ", error)
        }
    };

    return (
        <SafeAreaView>
            <View style={styles.appBarWrapper}>
                <View style={styles.appBar}>
                    <Ionicons name="location-outline" size={24}/>
                    <Text style={styles.location}>{ userData ? userData.location: 'Jaffna SriLanka'}</Text>

                    <View style={{alignItems: "flex-end"}}>
                        <View style={styles.cartCount}>
                            <Text style={styles.cartNumber}> 8 </Text>
                        </View>
                        <TouchableOpacity>
                            <Fontisto name="shopping-bag" size={24}/>
                        </TouchableOpacity>
                    </View>
                </View>
            </View> 

            <ScrollView>
                <Welcome/>
                <Carousel/>
                <Headings/>
                <ProductRow/>
            </ScrollView>
        </SafeAreaView>
    )
}

export default Home

const styles = StyleSheet.create({})
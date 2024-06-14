import { StyleSheet, Text, TouchableOpacity, view } from 'react-native'
import React from 'react'
import styles from './headings.style';
import { Ionicons } from "@expo/vector-icons"
import { COLORS } from '../../constants/index.js/index.js';
import { useNavigation } from '@react-navigation/native';

const Headings = ()=> {
    const navigation=useNavigation();
    return (
    <view style={styles.container}>
        <view style={styles.header}>
        <Text style={styles.headerTitle}>New Rivals</Text>
        <TouchableOpacity onPress={()=>navigation.navigate("ProductList")}>
            <Ionicons name='ios-grid' size={24} color={COLORS.primary}/>
        </TouchableOpacity>
        </view>
    </view>
    )
}

export default Headings
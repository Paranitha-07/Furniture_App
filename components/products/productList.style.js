import { StyleSheet } from "react-native";
import {COLORS,SIZES} from "../../constants/index.js/index.js"

const styles =StyleSheet.create({
    loadingContainer:{
        flex:1,
        alignItems:"center",
        justifyContent:"center"
    },
    container:{
        alignItems:"center",
        paddingTop:SIZES.xxLarge,
        paddingLeft:SIZES.small/2


    }
})

export default styles;
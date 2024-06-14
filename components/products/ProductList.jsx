import { ActivityIndicator, StyleSheet,Text,View } from "react-native";
import React from "react";
import useFetch from "../../hooks/useFetch";
import { COLORS, SIZES } from "../../constants/index.js/index.js";
import styles from "./productCardView.style";
import styles from "./productList.style";
import { FlatList } from "react-native-gesture-handler";
import ProductCardView from "./ProductCardView";

const ProductList = () => {
    const {data,isLoading,error}=useFetch();
    
    if(isLoading){
    return(
        <View>
            <ActivityIndicator size={SIZES.xxLarge} color={COLORS.primary}/>
        </View>
    );
}
return(
    <View styles={styles.container}>
        <FlatList
        data={data}
        numColumns={2}
        renderItem={item => (<ProductCardView item={item}/>)}
        contentContainerStyle={styles.container}
        ItemSeparatorComponent={()=> <View style={styles.seperator}/> }
        />
    </View>
)

}
export default ProductList;


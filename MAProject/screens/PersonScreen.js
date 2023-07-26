import { View, Text, Dimensions, ScrollView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import React from 'react'

var {width, height} = Dimensions.get('window');
const ios = Platform.OS == "ios";

export default function PersonScreen() {
  return (
    <ScrollView className="flex-1 bg-neutral-950" contentContainerStyle={{paddingBottom: 20}}>

    {/* back button */}
        <SafeAreaView className={"z-20 w-full flex-row justify-between items-center px-4 "}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.background} className="rounded-xl p-1">
                <ChevronLeftIcon size="28" strokeWidth={2.5} color="white" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => toggleFavourite(!isFavourite)}>
                <HeartIcon size="35" color={isFavourite ? theme.background : "white"} />
            </TouchableOpacity>
        </SafeAreaView>
    </ScrollView>
  )
}
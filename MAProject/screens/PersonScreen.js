import { View, Text, Dimensions, ScrollView, TouchableOpacity, Image, Platform } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useState } from 'react'
import { ChevronLeftIcon } from 'react-native-heroicons/outline';
import { useNavigation } from '@react-navigation/native';
import { styles } from '../theme';
import { Shadow } from 'react-native-shadow-2';
import MovieList from '../components/movieList';
import { HeartIcon } from 'react-native-heroicons/solid';
import Loading from '../components/loading';

var {width, height} = Dimensions.get('window');
const ios = Platform.OS == "ios";
const verticalMargin =  ios ? '' :  'my-3';
export default function PersonScreen() {
    const navigation = useNavigation();
    const [isFavourite, toggleFavourite] = useState(false);
    const [personMovies, setPersonMovies] = useState([1,2,3,4]);
    const [loading, setLoading]= useState(false);
    
  return (
    <ScrollView className="flex-1 bg-neutral-950" contentContainerStyle={{paddingBottom: 20}}>

    {/* back button */}
        <SafeAreaView className={"z-20 w-full flex-row justify-between items-center px-4 " + verticalMargin}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.background} className="rounded-xl p-1">
                <ChevronLeftIcon size="28" strokeWidth={2.5} color="white" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => toggleFavourite(!isFavourite)}>
                <HeartIcon size="35" color={isFavourite ? 'red' : 'white'} />
            </TouchableOpacity>
        </SafeAreaView>
    
    {/* Person Details */}

    {
        loading ? (
            <Loading />
        ):(
            <View>
                <View className="flex-row justify-center">
                    <Shadow style={{
                        shadowColor: 'white',
                        borderRadius: 100,
                        elevation: 50,
                    }}>
                        <View className="items-center rounded-full overflow-hidden h-72 w-72 border-2 border-neutral-500">
                            <Image source={require('../assets/images/castImage2.png')} 
                            style={{height: height*0.45 , width: width*0.74}} 
                            />
                        </View>
                    </Shadow>    
                </View>
                <View className="mt-6">
                    <Text className="text-3xl text-white font-bold text-center">
                        Keanu Reeves
                    </Text>
                    <Text className="text-base text-neutral-500 text-center">
                        London, United Kingdom 
                    </Text>
                </View>
                <View className='mx-3 mt-6 p-4 flex-row justify-between items-center bg-neutral-700 rounded-full'>
                    <View className="border-r-2 border-r-neutral-400 items-center">
                        <Text className="text-white font-semibold px-3">Gender</Text>
                        <Text className="text-neutral-300 text-sm">Male</Text>
                    </View>
                    <View className="border-r-2 border-r-neutral-400 items-center px-3">
                        <Text className="text-white font-semibold">Birthday</Text>
                        <Text className="text-neutral-300 text-sm">1964-09-02</Text>
                    </View>
                    <View className="border-r-2 border-r-neutral-400 items-center px-3">
                        <Text className="text-white font-semibold">Known for</Text>
                        <Text className="text-neutral-300 text-sm">Acting</Text>
                    </View>
                    <View className="items-center">
                        <Text className="text-white font-semibold px-3">Popularity</Text>
                        <Text className="text-neutral-300 text-sm">64.23</Text>
                    </View>
                </View>
                <View className='my-6 mx-4 space-y-2'>
                    <Text className="text-white text-lg">Biography</Text>
                    <Text className="text-neutral-400 tracking-wide">
                    Keanu Charles Reeves là một diễn viên, đạo diễn, nhà sản xuất và nhạc sĩ người Canada[a]. Keanu nổi tiếng với vai Neo trong loạt phim khoa học giả tưởng Ma trận (The Matrix), John Wick trong loạt phim cùng tên và nhiều bộ phim khác như Tốc độ (Speed), Kẻ cứu rỗi nhân loại (Constantine), Ngôi nhà bên hồ (The Lake House), Vua đường phố (Street Kings), Ngày Trái Đất ngừng quay (The Day The Earth Stood Still), 47 lãng khách (47 Ronin)... Năm 2006, Keanu được bầu chọn là một trong 10 ngôi sao được yêu thích nhất tại Mỹ trên tạp chí ETonline. Vào ngày 31 tháng 1 năm 2005, tên anh được vinh danh trên đại lộ Danh vọng Hollywood.
                    </Text>
                </View>

                {/* movies */}

                <MovieList title={'Movies'} hideSeeAll={true} data={personMovies} />
            </View>
        )
    }

    </ScrollView>
  )
}
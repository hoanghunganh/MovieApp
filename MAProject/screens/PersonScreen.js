import { View, Text, Dimensions, ScrollView, TouchableOpacity, Image, Platform } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useEffect, useState } from 'react'
import { ChevronLeftIcon } from 'react-native-heroicons/outline';
import { useNavigation, useRoute } from '@react-navigation/native';
import { styles } from '../theme';
import { Shadow } from 'react-native-shadow-2';
import MovieList from '../components/movieList';
import { HeartIcon } from 'react-native-heroicons/solid';
import Loading from '../components/loading';
import { fallbackPersonImage, fetchPersonDetails, fetchPersonMovies, image342 } from '../api/moviedb';

var {width, height} = Dimensions.get('window');
const ios = Platform.OS == "ios";
const verticalMargin =  ios ? '' :  'my-3';
export default function PersonScreen() {
    const {params: item} = useRoute();
    const navigation = useNavigation();
    const [isFavourite, toggleFavourite] = useState(false);
    const [personMovies, setPersonMovies] = useState([]);
    const [person, setPerson] = useState([]);
    const [loading, setLoading]= useState(false);
    
    useEffect(() => {
        setLoading(true);
        // console.log('person: ', item)
        getPersonDetails(item.id);
        getPersonMovies(item.id);
    }, [])

    const getPersonDetails = async id => {
        const data = await fetchPersonDetails(id);
        // console.log('person details: ', data);
        if (data) setPerson(data);
        setLoading(false);
    }
    const getPersonMovies = async id => {
        const data = await fetchPersonMovies(id);
        // console.log('person movies: ', data);
        if (data && data.cast) setPersonMovies(data.cast);
    }

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
                            <Image 
                            // source={require('../assets/images/castImage2.png')} 
                            source={{uri: image342(person?.profile_path) || fallbackPersonImage}}
                            style={{height: height*0.45 , width: width*0.74}} 
                            />
                        </View>
                    </Shadow>    
                </View>
                <View className="mt-6">
                    <Text className="text-3xl text-white font-bold text-center">
                        {
                            person?.name
                        }
                    </Text>
                    <Text className="text-base text-neutral-500 text-center">
                        {
                            person?.place_of_birth
                        } 
                    </Text>
                </View>
                <View className='mx-3 mt-6 p-4 flex-row justify-between items-center bg-neutral-700 rounded-full'>
                    <View className="border-r-2 border-r-neutral-400 items-center">
                        <Text className="text-white font-semibold px-3">Gender</Text>
                        <Text className="text-neutral-300 text-sm">
                            {
                                person?.gender == 1 ? 'Female' : 'Male'
                            }
                        </Text>
                    </View>
                    <View className="border-r-2 border-r-neutral-400 items-center px-3">
                        <Text className="text-white font-semibold">Birthday</Text>
                        <Text className="text-neutral-300 text-sm">
                            {
                                person?.birthday
                            }
                        </Text>
                    </View>
                    <View className="border-r-2 border-r-neutral-400 items-center px-3">
                        <Text className="text-white font-semibold">Known for</Text>
                        <Text className="text-neutral-300 text-sm">
                            {
                                person?.known_for_department
                            }
                        </Text>
                    </View>
                    <View className="items-center">
                        <Text className="text-white font-semibold px-3">Popularity</Text>
                        <Text className="text-neutral-300 text-sm">
                            {
                                person?.popularity?.toFixed(2)
                            } %
                        </Text>
                    </View>
                </View>
                <View className='my-6 mx-4 space-y-2'>
                    <Text className="text-white text-lg">Biography</Text>
                    <Text className="text-neutral-400 tracking-wide">
                            {
                                person?.biography || "N/A"
                            }
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
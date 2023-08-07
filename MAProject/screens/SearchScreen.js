import { View, Text, Dimensions, TextInput, TouchableOpacity, ScrollView, TouchableWithoutFeedback, Image } from 'react-native'
import React, { useCallback } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { XMarkIcon } from 'react-native-heroicons/outline';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import Loading from '../components/loading';
import { fallbackMoviesPoster, image185, searchMovies } from '../api/moviedb';
import { debounce } from 'lodash'
import Carousel from 'react-native-snap-carousel';
import { useRef } from 'react';

const {width, height} = Dimensions.get('window');

export default function SearchScreen() {
    const navigation = useNavigation();
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [inputValue, setInputValue] = useState('');

    const carouselRef = useRef();

    const handleSearch = (value, page) => {
        console.log("Current page:", page);
        if (value && value.length > 2) {
            setLoading(true);
            searchMovies({
                query: value,
                include_adult: 'false',
                language: 'en-US',
                page: page,
            }).then(data => {
                setLoading(false);
                // console.log("API response:", data);
                if (data && data.results) setResults(data.results);
                if (data && data.total_pages) setTotalPages(data.total_pages);
            });
        } else {
            setLoading(false);
            setResults([]);
        }
    }

    // const renderPageButtons = () => {
    //     const buttons = [];
    //     for (let i = 1; i <= totalPages; i++) {
    //         buttons.push(
    //             <TouchableOpacity
    //                 onPress={() => handlePageChange(i)}
    //                 key={i}
    //                 style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}
    //             >
    //                 <Text style={{ color: '#eab308', padding: 5 }}>
    //                     {i}
    //                 </Text>
    //             </TouchableOpacity>
    //         )
    //     }
    //     return buttons
    // }
   

      const handlePageChange = (page) => {
        console.log("Page changed to:", page);
        setCurrentPage(page);
        handleSearch(inputValue, page); // Pass inputValue to handleSearch
        console.log("carouselRef.current:", carouselRef.current); // Add this line
        carouselRef.current.snapToItem(page - 1); // Update the activeIndex of the Carousel
        // console.log("inputValue la: ", inputValue);
      }

    const handleTextDebounce = useCallback(debounce((value) => {
        console.log('Value la: ', value)
        setInputValue(value); // Update inputValue state
        handleSearch(value, currentPage); // Pass value and currentPage to handleSearch
    }, 400), [] );
    
    const renderCarouselItem = ({ item }) => {
        const isActive = item === currentPage;
        return (
          <TouchableOpacity
            onPress={() => handlePageChange(item)}
            key={item}
            style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: isActive ? '#eab308' : 'transparent',
                borderRadius: 5,
                padding: 5,
                marginHorizontal: 5}}
            >
            <Text style={{ color: isActive ? 'black' : '#eab308', padding: 5 }}>
              {item}
            </Text>
          </TouchableOpacity>
        );
      };

    return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'black' }}>
        <View className="mx-4 mb-3 flex-row justify-between items-center border border-neutral-500 rounded-full">
        <TextInput 
            onChangeText={(value) => handleTextDebounce(value)}
            placeholder='Tìm kiếm phim'
            placeholderTextColor={'lightgray'}
            className="pb-1 pl-6 flex-1 text-base font-semibold text-white tracking-wider"
        />
            <TouchableOpacity 
                onPress={()=>navigation.navigate('Home')}
                className="rounded-full p-3 m-1 bg-neutral-500"
            >
                <XMarkIcon size="25" color='white' />
            </TouchableOpacity>
        </View>

        {/* results */}
        
        {
            loading ? (
                <Loading />
            ):
            results.length > 0 ? (
                <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle ={{paddingHorizontal: 15}}
                className="space-y-3"
                >
                    <Text className="text-white font-semibold ml-1">Results ({results.length})</Text>
                    <View className="flex-row justify-between flex-wrap">
                        {
                            results.map((item, index) => {
                                return (
                                    <TouchableWithoutFeedback
                                        key={index}
                                        onPress={() => navigation.push('Movie', item)}
                                    >
                                        <View className="space-y-2 mb-4">
                                            <Image className="rounded-3xl"
                                                // source={require('../assets/images/moviePoster2.png')}
                                                source={{uri: image185(item?.poster_path) || fallbackMoviesPoster}}
                                                style={{width: width*0.44, height: height*0.3}}
                                            /> 
                                            <Text className="text-neutral-300 ml-3">
                                                {
                                                    item?.title.length > 22 ? item?.title.slice(0, 22) + "..." : item?.title
                                                }
                                            </Text>
                                        </View>
                                    </TouchableWithoutFeedback>
                                )
                            })
                        }
                    </View>
                    
                </ScrollView>
            ):(
                <View className="flex-row justify-center">
                    <Image source={require('../assets/images/movieTime.png')}
                        className="h-96 w-96"
                    />
                </View>
            )
        }
        <View className="flex-row">
        {
            results.length > 0 &&
            <Carousel
                        ref={carouselRef}
                        data={Array.from({ length: totalPages }, (_, i) => i + 1)}
                        renderItem={renderCarouselItem}
                        sliderWidth={width}
                        itemWidth={width*0.1}a
                        slideStyle={{ display: 'flex', alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between'}}
            />
        }            
                    
        </View>
    </SafeAreaView>
  )
}
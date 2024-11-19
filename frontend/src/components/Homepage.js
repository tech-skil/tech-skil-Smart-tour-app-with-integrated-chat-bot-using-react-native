import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import tw from "twrnc";

const Homepage = () => {
  return (
    <View style={tw`flex h-full bg-white`}>
      <View style={tw`px-4 pt-8`}>
        <Text style={tw`text-2xl font-bold`}>Discover Your Dream Place</Text>
        <Text style={tw`text-gray-500 mt-2`}>
          Explore beautiful destinations around the world
        </Text>
      </View>

      <View style={tw`flex-1 mt-4`}>
        <View style={tw`flex-row items-center justify-between px-4`}>
          <TouchableOpacity style={tw`bg-blue-500 py-2 px-4 rounded-full`}>
            <Text style={tw`text-white`}>Popular</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={tw`text-gray-500`}>Recommended</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={tw`text-gray-500`}>Most Viewed</Text>
          </TouchableOpacity>
        </View>

        <View style={tw`mt-4`}>
          <View style={tw`flex-row items-center px-4`}>
            <Image
              source={require("../../assets/images/image.png")}
              style={tw`w-24 h-24 rounded-lg mr-4`}
            />
            <View>
              <Text style={tw`text-xl font-bold`}>Bali</Text>
              <Text style={tw`text-gray-500`}>Indonesia</Text>
              <Text style={tw`text-yellow-500 font-bold`}>4.8</Text>
            </View>
          </View>

          <View style={tw`flex-row items-center px-4 mt-4`}>
            <Image
              source={require("../../assets/images/image.png")}
              style={tw`w-24 h-24 rounded-lg mr-4`}
            />
            <View>
              <Text style={tw`text-xl font-bold`}>Paris</Text>
              <Text style={tw`text-gray-500`}>France</Text>
              <Text style={tw`text-yellow-500 font-bold`}>4.9</Text>
            </View>
          </View>
        </View>
      </View>

      <View style={tw`bg-gray-100 py-4`}>
        <TouchableOpacity style={tw`bg-blue-500 py-2 px-4 rounded-full mx-4`}>
          <Text style={tw`text-white`}>Book Now</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Homepage;

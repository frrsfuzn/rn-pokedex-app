import React from "react";
import { View, Text, SafeAreaView } from "react-native";
import { WebView } from "react-native-webview";

function YourPokemon() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ height: 200, backgroundColor: "white" }}>
        <Text>Pokemon's Twitter</Text>
        <WebView
          source={{
            html: '<a class="twitter-timeline" href="https://twitter.com/Pokemon?ref_src=twsrc%5Etfw">Tweets by Pokemon</a> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script> ',
          }}
        />
      </View>
      <Text>Your Pokemon</Text>
    </SafeAreaView>
  );
}

export default YourPokemon;

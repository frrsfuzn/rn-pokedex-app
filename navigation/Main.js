import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Home from "../screens/Home"
import Details from "../screens/Details"

const MainStack = createNativeStackNavigator();

export const Main = () => (
	<MainStack.Navigator>
		<MainStack.Screen name="Home" component={Home} />
		<MainStack.Screen name="Details" component={Details} />
	</MainStack.Navigator>
);
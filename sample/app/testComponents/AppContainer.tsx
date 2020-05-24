import { hot } from 'react-hot-loader/root';
import * as React from "react";
import { BaseNavigationContainer } from '@react-navigation/core';
// import { NavigationContainer } from '@react-navigation/native';
import { default as tabNavigatorFactory } from "react-nativescript-navigation";

const TabNavigator = tabNavigatorFactory();

const AppContainer = () => (
    <BaseNavigationContainer>
        <TabNavigator.Navigator initialRouteName="first">
            <TabNavigator.Screen name="first" component={First}/>
            <TabNavigator.Screen name="second" component={Second}/>
        </TabNavigator.Navigator>
    </BaseNavigationContainer>
);

function First({}){
    return (
        <flexboxLayout
            style={{
                flexGrow: 1,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "yellow",
            }}
        >
            <label fontSize={24} text={"You're viewing the first route!"}/>
        </flexboxLayout>
    );
}

function Second({}){
    return (
        <flexboxLayout
            style={{
                flexGrow: 1,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "orange",
            }}
        >
            <label fontSize={24} text={"You're viewing the second route!"}/>
        </flexboxLayout>
    );
}

export default hot(AppContainer);
// export default AppContainer;
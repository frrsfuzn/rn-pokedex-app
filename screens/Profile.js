import { View, Text, Button } from 'react-native'
import React, { useContext } from 'react'
import { AuthContext } from '../contexts/AuthContext'

const Profile = () => {
    const {state, signOut} = useContext(AuthContext)
  return (
    <View>
      <Text>Profile</Text>
      <Text>Name: {state.user.name}</Text>
      <Text>Email: {state.user.email}</Text>
        <Button title="SignOut" onPress={signOut}/>
    </View>
  )
}

export default Profile
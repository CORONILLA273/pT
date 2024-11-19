import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, View, FlatList, ActivityIndicator } from 'react-native'
import ExerciseListItem from './../components/exerciseListItem'
import { useQuery, gql } from '@apollo/client'
import client from './../graphqlClient'


export default function ExercisesScreen() {

    const {data, isLoading, error} = useQuery(
        gql`  query exercises($muscle: String, $name: String) {
            exercises(muscle: $muscle, name: $name) {
              name
              muscle
              equipment
            }
          }`, {
            variables: {},
          }
    )

    if (isLoading) {
        return <ActivityIndicator />
    }

    if (error) {
        console.log(error)
        return <Text>Fallo al cargar los ejercicios</Text>
    }

    return (
        <View style={styles.container}>

            <FlatList 
                data={data ?.exercises}
                contentContainerStyle={{ gap: 5 }}
                keyExtractor={(item, index) => item.name + index}
                renderItem={({ item }) => <ExerciseListItem item ={item}/> }
            />
            <StatusBar style="auto"/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'ghostwhite',
        justifyContent: 'center',
        padding: 10, 
    }
})
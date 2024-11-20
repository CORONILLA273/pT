import { View, Text, StyleSheet, ScrollView } from "react-native"
import { useLocalSearchParams } from 'expo-router'
import exercises from './../../assets/data/exercises.json'
import { Stack } from 'expo-router'
import { useState } from 'react'
import { gql, useQuery } from "@apollo/client"
import NewSetInput from "./../../components/NewSetInput"

const exerciseQuery = gql `
    query exercises($name: String) {
        exercises(name: $name){
            name
            muscle
            instructions
            equipment
        }
    }
`
export default function ExerciseDetailScreen() {
    const params = useLocalSearchParams()
    const name = params.name

    const {data, isLoading, error} = useQuery(
        exerciseQuery,
        {
            variables: {name: name},
        }
    )

    const [isInstructionExpanded, setIsInstructionExpanded] = useState(false)

    if (isLoading) {
        return <ActivityIndicator />
    }

    if (error) {
        console.log(error)
        return <Text>Fallo al cargar los ejercicios</Text>
    }

    if (!data || !data.exercises) {
        return <Text>No exercises found</Text>;
    }

    const exercise = data.exercises[0]

    if(!exercise) {
        return <Text>Exercise not found</Text>
    }
    return (
        <ScrollView contentContainerStyle = {styles.container}>
            <Stack.Screen options={{title: exercise.name}} />
            <View style={styles.panel}>
                <Text style= {styles.exerciseName}> {exercise.name} </Text>
                <Text style= {styles.exerciseSubtitle}>
                    <Text style= {styles.subValue}> {exercise.muscle} </Text > |{' '} 
                    <Text style= {styles.subValue}>{exercise.equipment} </Text >
                </Text>
            </View>

            <View style={styles.panel}>
                <Text style = {styles.instructions} numberOfLines={isInstructionExpanded ? 0 : 3}>
                    {exercise.instructions}
                </Text>
                <Text onPress={() => setIsInstructionExpanded(!isInstructionExpanded)} style={styles.seeMore}>
                    {isInstructionExpanded  ? 'See Less' : 'See More'}
                </Text>
            </View>  

            <NewSetInput/>   
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
        gap: 10
    },
    panel: {
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 5
    },
    exerciseName: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    exerciseSubtitle: {
        color: 'dimgray'
    },
    subValue: {
        textTransform: 'capitalize'
    },
    instructions: {
        fontSize: 16,
        lineHeight: 20,

    },
    seeMore: {
        alignSelf: 'center',
        padding: 5,
        fontWeight: '600',
        color: 'gray'
    }
})
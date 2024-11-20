import { View, Text, StyleSheet, TextInput, Button } from 'react-native'
import { useState } from 'react'

const NewSetInput = () => {

    const [reps, setReps] = useState('')
    const [weight, setWeight] = useState('')

    const addSet = () => {
        console.warn('Agregar Set: ', reps, weight)
        
        // guardar en la DB

        setReps('')
        setWeight('')
    }
  return (
    <View style={styles.container}>

        <TextInput 
            value={reps} 
            onChangeText={setReps} 
            placeholder='Reps' 
            style={styles.input}
            keyboardType='numeric'
        >
        </TextInput>
        <TextInput 
            value={weight} 
            onChangeText={setWeight} 
            placeholder='Weight' 
            style={styles.input}
            keyboardType='numeric'
        >

        </TextInput>
        <Button title='Agregar' onPress={addSet}/>
    </View>
  )
}

const styles = StyleSheet.create({
   container: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
    flexDirection: 'row',
    gap: 10
   },
   input: {
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'gainsboro',
    padding: 10,
    flex: 1,
    borderRadius: 5
   }
})

export default NewSetInput
import React from "react";
import { StyleSheet, Pressable, Text, View } from 'react-native';
import { Card, ListItem, Button, Icon } from 'react-native-elements';
import axios from 'axios';
        

export default function ProfileScreen() {
    const axios = require('axios').default;
    axios.get('http://localhost8080/users/userId').then(function (response){
        data = response;
    })
    return (
    <View style={styles.container}>
    <Text style={styles.title}>Profile</Text>

    <View style={styles.rowContainer}>
        <Card>
        <Card.Title>Workout Track</Card.Title>
        <Card.Divider/>
            <Text style={styles.text}>{data.firstName} {data.lastName}</Text>
        </Card>``

        <Card>
        <Card.Title>Days completed card</Card.Title>
        <Card.Divider/>
            <Text style={styles.text}>Text</Text>
        </Card>
    </View>
    
    <View style={styles.rowContainer}>
        <Card>
        <Card.Title>Favorite Workout</Card.Title>
        <Card.Divider/>
            <Text style={styles.text}>Text</Text>
        </Card>

        <Card>
        <Card.Title>Additional Info Card</Card.Title>
        <Card.Divider/>
            <Text style={styles.text}>Text</Text>
        </Card>
    </View>
    </View>
)}

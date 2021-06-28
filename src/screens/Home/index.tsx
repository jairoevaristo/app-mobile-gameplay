import React, { useState, useCallback } from 'react';
import { View, FlatList } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';

import { CategorySelect } from '../../components/CategorySelect';
import { ListHeader } from '../../components/ListHeader';
import { Profile } from '../../components/Profile';
import { ButtonAdd } from '../../components/ButtonAdd';
import { ListDivider } from '../../components/ListDivider';
import { Background } from '../../components/Background';
import { Appointments, AppointmentsData } from '../../components/Appointments';
import { Load } from '../../components/Load';

import { styles } from './styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { COLLECTION_APPOITMENTS } from '../../configs/database';

export function Home() {
  const navigation = useNavigation();

  const [category, setCategory] = useState('');
  const [appointments, setAppointments] = useState<AppointmentsData[]>([]);
  const [loading, setLoading] = useState(true);

  function handleCategorySelect(categoryId: string) {
    categoryId === category ? setCategory('') : setCategory(categoryId);
  }

  function handleAppoitmentsDetails(guildSelected: AppointmentsData) {
    navigation.navigate('AppointmentsDetails', { guildSelected });
  }

  function handleAppoitmentsCreate() {
    navigation.navigate('AppointmentsCreate');
  }

  async function loadAppointments() {
    const storage = await AsyncStorage.getItem(COLLECTION_APPOITMENTS);
    const storageResponse: AppointmentsData[] = storage 
      ? JSON.parse(storage) 
      : [];

    if (category) {
      setAppointments(
        storageResponse.filter(item => item.category === category)
      );
    } else {
      setAppointments(storageResponse);
    }
    setLoading(false);
  }

  useFocusEffect(useCallback(() => {
    loadAppointments()
  }, [category]))

  return (
    <Background>
      <View style={styles.header}>
        <Profile />
        <ButtonAdd onPress={handleAppoitmentsCreate} />
      </View>

      <CategorySelect 
        categorySelected={category} 
        setCategory={handleCategorySelect}
      />

      {
        loading 
          ? <Load />
          : <>
              <ListHeader
                title="Partidas agendadas"
                subtitle={`Total de ${appointments.length}`}
              />
              <FlatList 
                data={appointments}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                  <Appointments 
                    data={item} 
                    onPress={() => handleAppoitmentsDetails(item)}
                  />
                )}
                contentContainerStyle={{ paddingBottom: 69 }}
                style={styles.matches}
                showsVerticalScrollIndicator={false}
                ItemSeparatorComponent={() => <ListDivider />}
              />
            </>
      }

    </Background>
  )
}
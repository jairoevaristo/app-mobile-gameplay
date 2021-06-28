import React, { useState } from 'react';
import {
  Text,
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons';
import uuid from 'react-native-uuid';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { CategorySelect } from '../../components/CategorySelect';
import { Background } from '../../components/Background';
import { Header } from '../../components/Header';
import { GuildIcon } from '../../components/GuildIcon';
import { SmallInput } from '../../components/SmallInput';
import { TextArea } from '../../components/TextArea';
import { Button } from '../../components/Button';
import { ModalView } from '../../components/ModalView';
import { GuildData } from '../../components/Guild';

import { styles } from './styles';
import { theme } from '../../global/styles/theme';
import { Guilds } from '../Guilds';
import { COLLECTION_APPOITMENTS } from '../../configs/database';

export function AppointmentsCreate() {
  const navigation = useNavigation();

  const [category, setCategory] = useState('');
  const [modalShow, setModalShow] = useState(false);
  const [guild, setGuild] = useState<GuildData>({} as GuildData);

  const [day, setDay] = useState('');
  const [month, setMonth] = useState('');
  const [hours, setHours] = useState('');
  const [minute, setMinute] = useState('');
  const [description, setDescription] = useState(''); 

  async function handleSave() {
    const newAppoitments = {
      id: uuid.v4(),
      guild,
      category,
      date: `${day}/${month} às ${hours}:${minute}h`,
      description
    };

    const storage = await AsyncStorage.getItem(COLLECTION_APPOITMENTS);
    const appoitments = storage ? JSON.parse(storage) : [];

    await AsyncStorage.setItem(COLLECTION_APPOITMENTS, JSON.stringify(
      [
        ...appoitments,
        newAppoitments
      ]
    ))

    navigation.navigate('Home');
  }
  
  function handleCategorySelect(categoryId: string) {
    setCategory(categoryId);
  }

  function handleOpenModal() {
    setModalShow(true);
  }

  function handleCloseModal() {
    setModalShow(false);
  }

  function handleGuildSelect(guildSelected: GuildData) {
    setGuild(guildSelected);
    setModalShow(false);
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height' }
      style={styles.container}
    >
      <ScrollView>
        <Background>
          <Header 
            title="Agendar partida"
          />
          <Text style={[
            styles.label, 
            { marginLeft: 24, marginBottom: 18, marginTop: 36  }]}
          >
            Categoria
          </Text>

          <CategorySelect 
            hasCheckBox
            setCategory={handleCategorySelect}
            categorySelected={category}
          />

          <View style={styles.form}>
            <RectButton onPress={handleOpenModal}>
              <View style={styles.select}>
                {
                  guild.icon 
                  ? <GuildIcon guildId={guild.id} iconId={guild.icon} />
                  : <View style={styles.image} />
                }
                <View style={styles.selectBody}>
                  <Text style={styles.label}>
                    { 
                      guild.name 
                        ? guild.name 
                        : "Selecione um servidor" 
                    }
                  </Text>

                </View>

                <Feather 
                  name="chevron-right"
                  color={theme.colors.heading}
                  size={18}
                />
              </View>

            </RectButton>

            <View style={styles.field}>
              <View>
                <Text style={[styles.label, { marginBottom: 12 }]}>
                  Dia e mês
                </Text>
        
                <View style={styles.column}>
                  <SmallInput maxLength={2} onChangeText={setDay} />
                  <Text style={styles.divider}>
                    /
                  </Text>
                  <SmallInput maxLength={2} onChangeText={setMonth} />
                </View>
              </View>

              <View>
                <Text style={[styles.label, { marginBottom: 12 }]}>
                  Hora e minuto
                </Text>
        
                <View style={styles.column}>
                  <SmallInput maxLength={2} onChangeText={setMinute} />
                  <Text style={styles.divider}>
                    :
                  </Text>
                  <SmallInput maxLength={2} onChangeText={setHours} />
                </View>
              </View>
            </View>
              
            <View style={[styles.field, { marginBottom: 12 }]}>
              <Text style={styles.label}>
                Descrição
              </Text>

              <Text style={styles.caracteresLimit}>
                Max 100 caracteres
              </Text>
            </View>

            <TextArea 
              multiline
              maxLength={100}
              numberOfLines={5}
              autoCorrect={false}
              onChangeText={setDescription}
            />

            <View style={styles.footer}>
              <Button title="Agendar" onPress={handleSave} />
            </View>
          </View>
      </Background>
    </ScrollView>

    <ModalView visible={modalShow} closeModal={handleCloseModal}>
      <Guilds handleGuildsSelected={handleGuildSelect} />
    </ModalView>

   </KeyboardAvoidingView>
  )
}
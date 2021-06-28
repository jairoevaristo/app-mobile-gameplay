import React, { useEffect, useState } from 'react';
import { View, FlatList } from 'react-native';

import { Guild, GuildData } from '../../components/Guild';
import { ListDivider } from '../../components/ListDivider';
import { Load } from '../../components/Load';
import { api } from '../../services/api';

import { styles } from './styles';

type GuildsProps = {
  handleGuildsSelected: (guildSelected: GuildData) => void;
}

export function Guilds({ handleGuildsSelected }: GuildsProps) {
  const [guilds, setGuilds] = useState<GuildData[]>([]);
  const [loading, setLoading] = useState(true);

  async function fetchGuilds() {
    const response = await api.get('/users/@me/guilds');

    setGuilds(response.data);
    setLoading(false);
  }

  useEffect(() => {
    fetchGuilds()
  }, []);

  return (
    <View style={styles.container}>
      { loading 
        ? <Load />
        : <FlatList 
            data={guilds}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
              <Guild 
                data={item}
                onPress={() => handleGuildsSelected(item)}
              />
            )}
            contentContainerStyle={{ paddingBottom: 68, paddingTop: 103 }}
            showsVerticalScrollIndicator={false}
            ListHeaderComponent={() => <ListDivider isCentered />}
            ItemSeparatorComponent={() => <ListDivider />}
            style={styles.guilds}
          />    
      }
    </View>
  )
}
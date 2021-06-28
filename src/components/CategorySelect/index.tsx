import React from 'react';
import { ScrollView, FlatList } from 'react-native';
import { Category } from '../Category';

import { styles } from './styles';

import { categories } from '../../utils/categories';

type CategorySelectProps = {
  categorySelected: string
  setCategory: (categoryId: string) => void;
  hasCheckBox?: boolean;
}

export function CategorySelect({
  categorySelected,
  setCategory,
  hasCheckBox = false
}: CategorySelectProps) {
  return (
    <ScrollView 
      style={styles.container}
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ paddingRight: 40 }}
    >
      {
        categories.map(item =>(
          <Category 
            key={String(item.id)}
            title={item.title}
            icon={item.icon}
            checked={item.id === categorySelected}
            onPress={() => setCategory(item.id)}
            hasCheckBox={hasCheckBox}
          />
        ))
      }
    </ScrollView>
  )
}

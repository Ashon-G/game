import React, { useState } from 'react';
import { FlatList, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import BuildingInterior from '../components/BuildingInterior';
import BookModal from '../components/BookModal';
import { PASTEL_16, FUNKY_FUTURE } from '../constants/colors';
import tipsData from '../data/tips.json';

const BOOK_COLORS = [
  PASTEL_16.GREEN,
  PASTEL_16.BLUE,
  PASTEL_16.PURPLE,
  PASTEL_16.ORANGE,
  PASTEL_16.CYAN,
  PASTEL_16.YELLOW,
];

export default function LibraryScreen() {
  const [selectedCategory, setSelectedCategory] = useState<any>(null);
  const [showModal, setShowModal] = useState(false);

  const categories = Object.entries(tipsData.categories).map(([key, category], index) => ({
    id: key,
    ...category,
    color: BOOK_COLORS[index % BOOK_COLORS.length],
  }));

  const openBook = (category: any) => {
    setSelectedCategory(category);
    setShowModal(true);
  };

  const renderBook = ({ item, index }: any) => (
    <TouchableOpacity 
      style={[styles.bookContainer, { backgroundColor: item.color }]}
      onPress={() => openBook(item)}
      activeOpacity={0.8}
    >
      <View style={styles.bookSpine}>
        <Text style={styles.bookIcon}>{item.icon}</Text>
      </View>
      <View style={styles.bookContent}>
        <Text style={styles.bookTitle}>{item.title}</Text>
        <Text style={styles.bookSubtitle}>{item.tips.length} tips</Text>
      </View>
      <View style={styles.bookEdge} />
    </TouchableOpacity>
  );

  return (
    <BuildingInterior
      title="Library"
      description="Ancient wisdom for modern social warriors"
      backgroundColor={PASTEL_16.NAVY}
    >
      <View style={styles.container}>
        <Text style={styles.instructions}>
          📚 Tap a book to read social tips and practice exercises
        </Text>
        
        <FlatList
          data={categories}
          renderItem={renderBook}
          keyExtractor={(item) => item.id}
          numColumns={2}
          columnWrapperStyle={styles.row}
          contentContainerStyle={styles.bookshelf}
          showsVerticalScrollIndicator={false}
        />
      </View>

      <BookModal
        visible={showModal}
        category={selectedCategory}
        onClose={() => setShowModal(false)}
      />
    </BuildingInterior>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
  instructions: {
    fontSize: 16,
    color: PASTEL_16.LIGHT_GRAY,
    textAlign: 'center',
    marginBottom: 20,
    fontStyle: 'italic',
  },
  bookshelf: {
    paddingBottom: 20,
  },
  row: {
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  bookContainer: {
    width: '47%',
    height: 180,
    borderRadius: 10,
    overflow: 'hidden',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    transform: [{ rotateZ: '-2deg' }],
  },
  bookSpine: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: 30,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bookIcon: {
    fontSize: 20,
    transform: [{ rotate: '90deg' }],
  },
  bookContent: {
    flex: 1,
    padding: 20,
    paddingLeft: 40,
    justifyContent: 'center',
  },
  bookTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: PASTEL_16.WHITE,
    marginBottom: 5,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  bookSubtitle: {
    fontSize: 14,
    color: PASTEL_16.LIGHT_GRAY,
  },
  bookEdge: {
    position: 'absolute',
    right: 0,
    top: 10,
    bottom: 10,
    width: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 2,
  },
});
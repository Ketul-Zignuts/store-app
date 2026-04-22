import { Colors } from "@/constants/Colors";
import React from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const CategorySelections = ({ selectedCategory, data, onPress }: any) => {
  return (
    <View style={{ height: 60 }}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
      >
        <TouchableOpacity
          onPress={() => onPress(null)}
          style={[styles.chip, !selectedCategory ? styles.chipSelected : styles.chipUnselected]}
        >
          <Text style={[styles.text, !selectedCategory ? styles.textSelected : styles.textUnselected]}>
            All
          </Text>
        </TouchableOpacity>

        {data?.map((item: any, index: number) => {
          const isSelected = selectedCategory === item?.id;
          return (
            <TouchableOpacity
              key={index}
              onPress={() => onPress(item?.id)}
              style={[styles.chip, isSelected ? styles.chipSelected : styles.chipUnselected]}
            >
              <Text
                numberOfLines={1}
                style={[styles.text, isSelected ? styles.textSelected : styles.textUnselected]}
              >
                {item?.name}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default CategorySelections;

const styles = StyleSheet.create({
  scrollContainer: {
    gap: 8,
    alignItems: "center",
    marginHorizontal: 10
  },
  chip: {
    paddingHorizontal: 25,
    paddingVertical: 6,
    borderRadius: 20,
  },
  chipSelected: {
    backgroundColor: Colors.orange.theme,
  },
  chipUnselected: {
    backgroundColor: Colors.orange.opacity,
    borderWidth: 1,
    borderColor: Colors.orange.secondary,
  },
  text: {
    fontSize: 14,
    fontWeight: "400",
  },
  textSelected: {
    color: "#FFFFFF",
    fontWeight: "600",
  },
  textUnselected: {
    color: "#111111",
  },
});
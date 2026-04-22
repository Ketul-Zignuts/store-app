import { Colors } from "@/constants/Colors";
import { useProducts } from "@/hooks/useProduct";
import { Ionicons } from "@expo/vector-icons";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import MultiSlider from "@ptomasroos/react-native-multi-slider";
import React, { useMemo, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, useWindowDimensions, View } from "react-native";
import { TextInput } from "react-native-paper";
import CustomButton from "../shared/Button";

const MIN = 0;
const MAX = 100000;

const FilterBottomSheet = ({ bottomSheetRef }: any) => {
    const snapPoints = useMemo(() => ["25%", "55%", "70%"], []);
    const { priceFilter, setPriceFilter } = useProducts();
    const { width } = useWindowDimensions();
    const [localFilter, setLocalFilter] = useState(priceFilter);
    const [currentIndex, setCurrentIndex] = useState(0);
    const SLIDER_LENGTH = width - 40;

    const [range, setRange] = useState([
        priceFilter.price_min || MIN,
        priceFilter.price_max || MAX,
    ]);

    const handleApply = () => {
        setPriceFilter({
            ...localFilter,
            price_min: range[0],
            price_max: range[1],
        });
        bottomSheetRef.current?.close();
    };

    const handleReset = () => {
        const reset = { price: 0, price_min: 0, price_max: 0 };
        setLocalFilter(reset);
        setRange([MIN, MAX]);
        setPriceFilter(reset);
    };

    const CustomHandle = () => (
        <View style={styles.handleContainer}>
            <View style={styles.handleIndicator} />
            <View style={styles.headerRow}>
                <TouchableOpacity
                    style={styles.sideSlot}
                    onPress={() =>
                        bottomSheetRef.current?.snapToIndex(
                            currentIndex === 0 ? 2 : 0
                        )
                    }
                >
                    <Ionicons
                        name={currentIndex === 0 ? "chevron-up" : "chevron-down"}
                        size={20}
                        color="#111"
                    />
                </TouchableOpacity>

                <Text style={styles.headerTitle}>Filters</Text>

                <TouchableOpacity
                    style={styles.sideSlotRight}
                    onPress={handleReset}
                >
                    <Text style={styles.resetText}>Reset</Text>
                </TouchableOpacity>
            </View>
        </View>
    );

    return (
        <BottomSheet
            ref={bottomSheetRef}
            snapPoints={snapPoints}
            index={-1}
            onChange={(i) => setCurrentIndex(i)}
            handleComponent={CustomHandle}
            enablePanDownToClose
            style={styles.bottomSheet}
            backgroundStyle={styles.sheetBg}
        >
            <BottomSheetView style={styles.container}>
                <Text style={styles.sectionTitle}>Price Range</Text>
                <Text style={styles.rangeText}>
                    ₹{range[0]} - ₹{range[1]}
                </Text>
                <MultiSlider
                    values={range}
                    min={MIN}
                    max={MAX}
                    step={100}
                    sliderLength={SLIDER_LENGTH}
                    onValuesChange={(vals) => setRange(vals)}
                    selectedStyle={{ backgroundColor: Colors.primary }}
                    unselectedStyle={{ backgroundColor: "#ddd" }}
                    markerStyle={{
                        backgroundColor: Colors.primary,
                        height: 18,
                        width: 18,
                    }}
                    containerStyle={{ marginTop: 10 }}
                />
                <View style={styles.minMaxRow}>
                    <Text>₹{MIN}</Text>
                    <Text>₹{MAX}</Text>
                </View>
                <TextInput
                    label="Exact Price"
                    mode="outlined"
                    keyboardType="numeric"
                    value={String(localFilter.price)}
                    activeOutlineColor="#FF8000"
                    onChangeText={(text) =>
                        setLocalFilter((prev) => ({
                            ...prev,
                            price: Number(text) || 0,
                        }))
                    }
                    style={styles.input}
                />
                <View style={styles.actions}>
                    <CustomButton square onPress={handleApply}>
                        Apply
                    </CustomButton>
                </View>
            </BottomSheetView>
        </BottomSheet>
    );
};

export default FilterBottomSheet;

const styles = StyleSheet.create({
    bottomSheet: {
        backgroundColor: "white",
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        borderWidth: 1,
        borderColor: Colors.primary2,
        shadowColor: Colors.black,
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 5,
    },
    sheetBg: {
        backgroundColor: "#fff",
    },
    handleContainer: {
        paddingTop: 10,
        backgroundColor: "white",
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
    },
    handleIndicator: {
        width: 50,
        height: 5,
        borderRadius: 3,
        backgroundColor: "#ccc",
        alignSelf: "center",
        marginBottom: 10,
    },
    headerRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 16,
        paddingBottom: 10,
        height: 36,
    },
    sideSlot: {
        width: 60,
        justifyContent: "center",
    },
    sideSlotRight: {
        width: 60,
        alignItems: "flex-end",
        justifyContent: "center",
    },
    headerTitle: {
        fontSize: 16,
        fontWeight: "700",
    },
    resetText: {
        color: Colors.primary,
        fontWeight: "600",
    },
    container: {
        padding: 16,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: "700",
        marginBottom: 10,
    },
    rangeText: {
        textAlign: "center",
        fontSize: 16,
        fontWeight: "600",
        marginBottom: 10,
    },
    minMaxRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 8,
    },
    input: {
        marginTop: 20,
    },
    actions: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 20,
    },
});
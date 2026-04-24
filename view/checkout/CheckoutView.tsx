import { Colors } from '@/constants/Colors';
import { useCheckout } from '@/hooks/useCheckout';
import { FontAwesome } from '@expo/vector-icons';
import React, { useMemo, useState } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const steps = [
  {
    id: 1,
    title: "Shipping",
    activeIcon: "address-book",
    icon: "address-book-o",
  },
  {
    id: 2,
    title: "Payment",
    activeIcon: "credit-card",
    icon: "credit-card-alt",
  },
  {
    id: 3,
    title: "Review",
    activeIcon: "check-circle",
    icon: "check-circle-o",
  },
];

const CheckoutView = () => {
  const { totalItems, totalPrice } = useCheckout();
  const [currentStep, setCurrentStep] = useState(1);

  const nextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const stepContent = useMemo(() => {
    switch (currentStep) {
      case 1:
        return <Text style={styles.contentText}>Enter Shipping Address</Text>;
      case 2:
        return <Text style={styles.contentText}>Select Payment Method</Text>;
      case 3:
        return (
          <View>
            <Text style={styles.contentText}>Order Summary</Text>
            <Text>Total Items: {totalItems}</Text>
            <Text>Total Price: ₹{totalPrice.toFixed(2)}</Text>
          </View>
        );
      default:
        return null;
    }
  }, [currentStep, totalItems, totalPrice]);

  return (
    <View style={styles.container}>
      
      {/* 🔥 Stepper */}
      <View style={styles.stepperContainer}>
        {steps.map((step:any, index) => {
          const isActive = step.id === currentStep;
          const isCompleted = step.id < currentStep;

          const iconColor = isActive || isCompleted ? "#fff" : "#555";

          return (
            <View key={step.id} style={styles.stepWrapper}>

              {/* ✅ LEFT LINE (not for first step) */}
              {index !== 0 && (
                <View
                  style={[
                    styles.leftLine,
                    isCompleted && styles.activeLine,
                  ]}
                />
              )}

              {/* ICON */}
              <View
                style={[
                  styles.iconContainer,
                  isActive && styles.activeIconContainer,
                  isCompleted && styles.completedIconContainer,
                ]}
              >
                <FontAwesome
                  name={isActive || isCompleted ? step.activeIcon : step.icon}
                  size={16}
                  color={iconColor}
                />
              </View>

              {/* TITLE */}
              <Text
                style={[
                  styles.stepText,
                  (isActive || isCompleted) && styles.activeText,
                ]}
              >
                {step.title}
              </Text>

              {/* ✅ RIGHT LINE (not for last step) */}
              {index !== steps.length - 1 && (
                <View
                  style={[
                    styles.rightLine,
                    (isCompleted || step.id < currentStep) &&
                      styles.activeLine,
                  ]}
                />
              )}
            </View>
          );
        })}
      </View>

      {/* 🔥 Content */}
      <View style={styles.contentContainer}>
        {stepContent}
      </View>

      {/* 🔥 Footer */}
      <View style={styles.footer}>
        {currentStep > 1 && (
          <TouchableOpacity style={styles.backBtn} onPress={prevStep}>
            <Text style={styles.backText}>Back</Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity style={styles.nextBtn} onPress={nextStep}>
          <Text style={styles.nextText}>
            {currentStep === steps.length ? "Place Order" : "Next"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CheckoutView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },

  stepperContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
  },

  stepWrapper: {
    flex: 1,
    alignItems: "center",
    position: "relative",
  },

  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#eee",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 2,
  },

  activeIconContainer: {
    backgroundColor: Colors.orange.theme,
  },

  completedIconContainer: {
    backgroundColor: Colors.green.dark,
  },

  stepText: {
    marginTop: 6,
    fontSize: 11,
    color: "#999",
    textAlign: "center",
  },

  activeText: {
    color: "#000",
    fontWeight: "600",
  },

  /* ✅ FIXED LINES */
  leftLine: {
    position: "absolute",
    top: 18,
    left: 0,
    width: "50%",
    height: 2,
    backgroundColor: "#ddd",
    zIndex: 1,
  },

  rightLine: {
    position: "absolute",
    top: 18,
    right: 0,
    width: "50%",
    height: 2,
    backgroundColor: "#ddd",
    zIndex: 1,
  },

  activeLine: {
    backgroundColor: Colors.green.dark,
  },

  contentContainer: {
    flex: 1,
    padding: 16,
  },

  contentText: {
    fontSize: 16,
    marginBottom: 10,
  },

  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: "#eee",
  },

  backBtn: {
    padding: 12,
    borderRadius: 10,
    backgroundColor: "#ddd",
  },

  backText: {
    fontWeight: "600",
  },

  nextBtn: {
    padding: 12,
    borderRadius: 10,
    backgroundColor: "#000",
  },

  nextText: {
    color: "#fff",
    fontWeight: "600",
  },
});
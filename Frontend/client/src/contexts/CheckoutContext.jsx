import { createContext, useContext, useState } from 'react';

const CheckoutContext = createContext(undefined);

export function CheckoutProvider({ children }) {
  const [currentStep, setCurrentStep] = useState(1);
  const [shippingAddress, setShippingAddress] = useState({});
  const [paymentInfo, setPaymentInfo] = useState({
    method: 'card',
  });

  const updateShippingAddress = (address) => {
    setShippingAddress((prev) => ({ ...prev, ...address }));
  };

  const updatePaymentInfo = (payment) => {
    setPaymentInfo((prev) => ({ ...prev, ...payment }));
  };

  const resetCheckout = () => {
    setCurrentStep(1);
    setShippingAddress({});
    setPaymentInfo({ method: 'card' });
  };

  return (
    <CheckoutContext.Provider
      value={{
        currentStep,
        shippingAddress,
        paymentInfo,
        setCurrentStep,
        updateShippingAddress,
        updatePaymentInfo,
        resetCheckout,
      }}
    >
      {children}
    </CheckoutContext.Provider>
  );
}

export function useCheckout() {
  const context = useContext(CheckoutContext);
  if (!context) {
    throw new Error('useCheckout must be used within CheckoutProvider');
  }
  return context;
}

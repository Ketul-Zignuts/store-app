import { AuthProvider } from '@/context/AuthContext';
import { CheckoutProvider } from '@/context/CheckoutContext';
import { ModalProvider } from '@/context/ModalContext';
import { ProductProvider } from '@/context/ProductContext';
import { ToastProvider } from '@/context/ToastContext';
import { ReactNode } from 'react';
import { PaperProvider } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';

interface ProvidersProps {
  children: ReactNode;
}

const Providers: React.FC<ProvidersProps> = (props) => {
  const { children } = props;
  return (
    <SafeAreaProvider>
      <AuthProvider>
        <ProductProvider>
          <ToastProvider>
            <CheckoutProvider>
              <ModalProvider>
                <PaperProvider>
                  {children}
                  <Toast />
                </PaperProvider>
              </ModalProvider>
            </CheckoutProvider>
          </ToastProvider>
        </ProductProvider>
      </AuthProvider>
    </SafeAreaProvider>
  )
}

export default Providers;

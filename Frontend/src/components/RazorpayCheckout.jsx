import { useState } from 'react';
import { Button, useToast, Box } from '@chakra-ui/react';
import { useAuth0 } from '@auth0/auth0-react';
import api from '../config/api';
import { theme } from '../config/theme';

export const RazorpayCheckout = ({ amount, items, onSuccess, onError }) => {
  const [loading, setLoading] = useState(false);
  const { user, getAccessTokenSilently } = useAuth0();
  const toast = useToast();

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePayment = async () => {
    const razorpayKeyId = import.meta.env.VITE_RAZORPAY_KEY_ID;

    if (!razorpayKeyId) {
      toast({
        title: 'Payment Configuration Error',
        description: 'Razorpay is not configured. Please check your environment variables.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    setLoading(true);

    try {
      const scriptLoaded = await loadRazorpayScript();
      
      if (!scriptLoaded) {
        toast({
          title: 'Error',
          description: 'Failed to load Razorpay SDK. Please check your internet connection.',
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
        setLoading(false);
        return;
      }

      let token = null;
      try {
        token = await getAccessTokenSilently();
        localStorage.setItem('auth_token', token);
      } catch (error) {
        console.warn('Could not get access token:', error);
      }

      const orderResponse = await api.post('/payment/create-order', {
        amount: amount * 100,
        currency: 'INR',
        items,
      });

      const { order } = orderResponse.data;

      const options = {
        key: razorpayKeyId,
        amount: order.amount,
        currency: order.currency,
        name: 'Pantaloons',
        description: 'Purchase from Pantaloons',
        order_id: order.id,
        handler: async (response) => {
          try {
            const verifyResponse = await api.post('/payment/verify-payment', {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            });

            if (verifyResponse.data.success) {
              toast({
                title: 'Payment Successful',
                description: 'Your order has been placed successfully!',
                status: 'success',
                duration: 5000,
                isClosable: true,
              });
              
              if (onSuccess) {
                onSuccess(verifyResponse.data);
              }
            } else {
              throw new Error('Payment verification failed');
            }
          } catch (error) {
            toast({
              title: 'Payment Verification Failed',
              description: error.message || 'Could not verify payment. Please contact support.',
              status: 'error',
              duration: 5000,
              isClosable: true,
            });
            
            if (onError) {
              onError(error);
            }
          }
        },
        prefill: {
          name: user?.name || '',
          email: user?.email || '',
        },
        theme: {
          color: theme.colors.primary,
        },
        modal: {
          ondismiss: () => {
            setLoading(false);
            toast({
              title: 'Payment Cancelled',
              description: 'You cancelled the payment process.',
              status: 'warning',
              duration: 3000,
              isClosable: true,
            });
          },
        },
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
      setLoading(false);

    } catch (error) {
      console.error('Payment error:', error);
      toast({
        title: 'Payment Failed',
        description: error.response?.data?.message || 'Something went wrong. Please try again.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      setLoading(false);
      
      if (onError) {
        onError(error);
      }
    }
  };

  return (
    <Button
      onClick={handlePayment}
      isLoading={loading}
      loadingText="Processing..."
      background={theme.colors.gradient.primary}
      color="white"
      size="lg"
      borderRadius={theme.borderRadius.lg}
      _hover={{
        transform: 'translateY(-2px)',
        boxShadow: theme.shadows.lg,
      }}
      transition={theme.transitions.normal}
      px={8}
      py={6}
    >
      Proceed to Pay ₹{amount}
    </Button>
  );
};

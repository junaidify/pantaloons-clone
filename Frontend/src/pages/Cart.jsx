import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CART_API } from "../constants/actionTypes";
import { Box, Heading, Text, Button, useToast, Grid } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import api from "../config/api";
import { theme } from "../config/theme";
import { RazorpayCheckout } from "../components/RazorpayCheckout";
import img_1 from "../images/img_1.webp";
import "../styles/cart.css";

const MotionBox = motion(Box);

export const Cart = () => {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.cartReducer);
  const [localData, setLocalData] = useState(data);
  const toast = useToast();

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: CART_API.FETCH });
      try {
        const response = await api.get("/cart");
        dispatch({ type: CART_API.SUCCESS, payload: response.data });
        setLocalData(response.data);
      } catch (error) {
        dispatch({ type: CART_API.ERROR, payload: error.message });
        toast({
          title: "Error loading cart",
          description: error.message,
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    };

    fetchData();
  }, [dispatch, toast]);

  useEffect(() => {
    setLocalData(data);
  }, [data]);

  const handleDelete = async (itemId) => {
    try {
      await api.delete(`/cart/${itemId}`);
      setLocalData(localData.filter((item) => item.id !== itemId));
      toast({
        title: "Item removed",
        description: "Item removed from cart successfully",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to remove item",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const calculateTotal = () => {
    return localData?.reduce((sum, item) => sum + 25, 0) || 0;
  };

  const handlePaymentSuccess = () => {
    setLocalData([]);
    localData?.forEach((item) => {
      api.delete(`/cart/${item.id}`).catch(console.error);
    });
  };

  if (loading)
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="60vh"
      >
        <Text fontSize="xl" color={theme.colors.text.secondary}>
          Loading...
        </Text>
      </Box>
    );

  if (error)
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="60vh"
      >
        <Text fontSize="xl" color={theme.colors.error}>
          Error: {error}
        </Text>
      </Box>
    );

  return (
    <MotionBox
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      id="cart_container"
      style={{
        background: theme.colors.background,
        minHeight: "80vh",
        padding: "2rem",
      }}
    >
      <Heading
        size="xl"
        textAlign="center"
        mb={8}
        color={theme.colors.text.primary}
      >
        Shopping Cart
      </Heading>

      {localData && localData.length > 0 ? (
        <Box>
          <Grid
            templateColumns={{
              base: "1fr",
              md: "repeat(2, 1fr)",
              lg: "repeat(3, 1fr)",
            }}
            gap={6}
            mb={8}
          >
            {localData.map((item, index) => (
              <MotionBox
                key={item.id}
                className="cart_card"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                style={{
                  background: theme.colors.surface,
                  borderRadius: theme.borderRadius.lg,
                  boxShadow: theme.shadows.md,
                  overflow: "hidden",
                  position: "relative",
                }}
              >
                <Box>
                  <img
                    style={{
                      width: "100%",
                      height: "300px",
                      objectFit: "cover",
                    }}
                    src={img_1}
                    alt="Product"
                  />
                </Box>
                <Box className="cart_card_details" p={4}>
                  <Text
                    fontSize="xl"
                    fontWeight="bold"
                    color={theme.colors.text.primary}
                    mb={2}
                  >
                    Mascara
                  </Text>
                  <Text color={theme.colors.text.secondary} mb={2}>
                    Pantaloons Junior
                  </Text>
                  <Text
                    fontSize="lg"
                    fontWeight="bold"
                    color={theme.colors.primary}
                  >
                    $25
                  </Text>
                </Box>
                <Button
                  className="cart_card_delete"
                  onClick={() => handleDelete(item.id)}
                  position="absolute"
                  top={2}
                  right={2}
                  colorScheme="red"
                  size="sm"
                  borderRadius="full"
                >
                  <FontAwesomeIcon icon={faXmark} />
                </Button>
              </MotionBox>
            ))}
          </Grid>

          <Box
            mt={8}
            p={6}
            background={theme.colors.surface}
            borderRadius={theme.borderRadius.xl}
            boxShadow={theme.shadows.lg}
            maxW="500px"
            mx="auto"
          >
            <Text fontSize="2xl" fontWeight="bold" mb={4} textAlign="center">
              Order Summary
            </Text>
            <Box
              display="flex"
              justifyContent="space-between"
              mb={4}
              pb={4}
              borderBottom={`2px solid ${theme.colors.border.light}`}
            >
              <Text fontSize="lg" color={theme.colors.text.secondary}>
                Total Items:
              </Text>
              <Text fontSize="lg" fontWeight="bold">
                {localData.length}
              </Text>
            </Box>
            <Box display="flex" justifyContent="space-between" mb={6}>
              <Text fontSize="xl" fontWeight="bold">
                Total Amount:
              </Text>
              <Text
                fontSize="xl"
                fontWeight="bold"
                color={theme.colors.primary}
              >
                ${calculateTotal()}
              </Text>
            </Box>
            <Box display="flex" justifyContent="center">
              <RazorpayCheckout
                amount={calculateTotal()}
                items={localData}
                onSuccess={handlePaymentSuccess}
                onError={(error) => console.error("Payment error:", error)}
              />
            </Box>
          </Box>
        </Box>
      ) : (
        <MotionBox
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          textAlign="center"
          py={20}
        >
          <Text fontSize="2xl" color={theme.colors.text.secondary} mb={4}>
            Your cart is empty
          </Text>
          <Text color={theme.colors.text.secondary}>
            Add some items to get started!
          </Text>
        </MotionBox>
      )}
    </MotionBox>
  );
};

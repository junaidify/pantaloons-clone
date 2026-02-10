import { useEffect } from "react";
import { WISHLIST_API } from "../constants/actionTypes";
import { useDispatch, useSelector } from "react-redux";
import { Box, Heading, Text, Grid, Button, useToast } from "@chakra-ui/react";
import { motion } from "framer-motion";
import "../styles/productpage.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import api from "../config/api";
import { theme } from "../config/theme";

const MotionBox = motion(Box);

export const Wishlist = ({ cssClass, wishCategory }) => {
  const dispatch = useDispatch();
  const wishlistCards = useSelector((state) => state.wishlistReducer.data);
  const toast = useToast();

  useEffect(() => {
    const getData = async () => {
      dispatch({ type: WISHLIST_API.FETCH });

      try {
        const res = await api.get("/wishlist");
        dispatch({ type: WISHLIST_API.SUCCESS, payload: res.data });
      } catch (err) {
        dispatch({ type: WISHLIST_API.ERROR, payload: err });
        toast({
          title: "Error loading wishlist",
          description: err.message,
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    };

    getData();
  }, [dispatch, toast]);

  const handleDelete = async (itemId) => {
    try {
      await api.delete(`/wishlist/${itemId}`);
      dispatch({ type: WISHLIST_API.DELETE, payload: itemId });
      toast({
        title: "Removed from wishlist",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
    } catch (err) {
      console.error("Failed to delete item:", err);
      toast({
        title: "Error removing item",
        description: err.message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <MotionBox
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      minH="80vh"
      bg={theme.colors.background}
      p={8}
    >
      <Heading
        size="xl"
        textAlign="center"
        mb={8}
        color={theme.colors.text.primary}
        fontStyle="italic"
      >
        My Wishlist
      </Heading>

      {wishlistCards && Object.keys(wishlistCards).length > 0 ? (
        <Grid
          templateColumns={{
            base: "1fr",
            md: "repeat(2, 1fr)",
            lg: "repeat(3, 1fr)",
            xl: "repeat(4, 1fr)",
          }}
          gap={6}
          maxW="1400px"
          mx="auto"
        >
          {Object.entries(wishlistCards).map(([category, items], catIndex) =>
            items.map((item, itemIndex) => (
              <MotionBox
                key={item.id}
                className={`${cssClass}_cards`}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: (catIndex + itemIndex) * 0.05 }}
                whileHover={{ y: -10, boxShadow: theme.shadows.xl }}
                bg={theme.colors.surface}
                borderRadius={theme.borderRadius.lg}
                overflow="hidden"
                boxShadow={theme.shadows.md}
                position="relative"
              >
                <Box className={`${cssClass}_cards_img_parent`} h="300px">
                  <img
                    className="cards_img"
                    src={item[wishCategory]?.image}
                    alt={item.title}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </Box>
                <Box p={4}>
                  <Text
                    fontSize="lg"
                    fontWeight="bold"
                    color={theme.colors.text.primary}
                    mb={2}
                  >
                    {item[wishCategory]?.brand}
                  </Text>
                  <Text
                    fontSize="sm"
                    color={theme.colors.text.secondary}
                    mb={2}
                  >
                    {item[wishCategory]?.features?.material}{" "}
                    {item[wishCategory]?.features?.size}{" "}
                    {item[wishCategory]?.features?.color}{" "}
                    {item[wishCategory]?.features?.fit}{" "}
                    {item[wishCategory]?.features?.sleeve_type}
                  </Text>
                  <Text
                    fontWeight="bold"
                    fontSize="xl"
                    color={theme.colors.primary}
                  >
                    ${item[wishCategory]?.price}{" "}
                    <Text
                      as="span"
                      fontSize="sm"
                      fontStyle="italic"
                      color={theme.colors.success}
                      ml={2}
                    >
                      30% OFF
                    </Text>
                  </Text>
                </Box>

                <Button
                  position="absolute"
                  top={2}
                  right={2}
                  colorScheme="red"
                  size="sm"
                  borderRadius="full"
                  onClick={() => handleDelete(item.id)}
                  _hover={{
                    transform: "scale(1.1)",
                  }}
                >
                  <FontAwesomeIcon icon={faXmark} />
                </Button>
              </MotionBox>
            ))
          )}
        </Grid>
      ) : (
        <MotionBox
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          textAlign="center"
          py={20}
        >
          <Text fontSize="2xl" color={theme.colors.text.secondary} mb={4}>
            Your wishlist is empty
          </Text>
          <Text color={theme.colors.text.secondary}>
            Add items you love to your wishlist!
          </Text>
        </MotionBox>
      )}
    </MotionBox>
  );
};

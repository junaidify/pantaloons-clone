import { useAuth0 } from '@auth0/auth0-react';
import { Navigate } from 'react-router-dom';
import { Box, Spinner, Text } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { theme } from '../config/theme';

export const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, isLoading, loginWithRedirect } = useAuth0();

  if (isLoading) {
    return (
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        minHeight="60vh"
        gap={4}
      >
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor={theme.colors.border.light}
          color={theme.colors.primary}
          size="xl"
        />
        <Text color={theme.colors.text.secondary}>Loading...</Text>
      </Box>
    );
  }

  if (!isAuthenticated) {
    loginWithRedirect({
      appState: { returnTo: window.location.pathname },
    });
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.div>
  );
};

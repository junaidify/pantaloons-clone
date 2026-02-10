import { useState } from 'react';
import { Box, Text, Heading } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { theme } from '../config/theme';

export const PromoVideo = ({ title = "Special Offers", description = "Check out our latest deals" }) => {
  const [videoError, setVideoError] = useState(false);

  return (
    <Box 
      my={8} 
      mx="auto" 
      maxW="1200px" 
      px={4}
      as={motion.div}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <Box textAlign="center" mb={6}>
        <Heading 
          size="xl" 
          color={theme.colors.text.primary}
          mb={2}
        >
          {title}
        </Heading>
        <Text color={theme.colors.text.secondary} fontSize="lg">
          {description}
        </Text>
      </Box>

      <Box 
        position="relative" 
        width="100%" 
        borderRadius={theme.borderRadius.xl}
        overflow="hidden"
        boxShadow={theme.shadows.xl}
      >
        {!videoError ? (
          <Box>
            <video
              controls
              style={{
                width: '100%',
                maxHeight: '600px',
                objectFit: 'cover',
              }}
              onError={() => setVideoError(true)}
            >
              <source src="/videos/promo-video.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </Box>
        ) : (
          <Box
            width="100%"
            height="400px"
            background={theme.colors.gradient.secondary}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Box textAlign="center" color="white" px={4}>
              <Text fontSize="2xl" fontWeight="bold" mb={2}>
                Promotional Video
              </Text>
              <Text fontSize="md" opacity={0.9}>
                Coming Soon!
              </Text>
              <Text fontSize="sm" mt={4} opacity={0.7}>
                (Add promo-video.mp4 to /public/videos)
              </Text>
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
};

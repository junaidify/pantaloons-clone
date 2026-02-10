import { useState } from 'react';
import { Box, Text } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { theme } from '../config/theme';

export const HeroVideo = () => {
  const [videoError, setVideoError] = useState(false);

  return (
    <Box position="relative" width="100%" height="70vh" overflow="hidden">
      {!videoError ? (
        <>
          <video
            autoPlay
            loop
            muted
            playsInline
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
            onError={() => setVideoError(true)}
          >
            <source src="/videos/hero-video.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          
          <Box
            position="absolute"
            top="0"
            left="0"
            right="0"
            bottom="0"
            background="linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.5))"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Box textAlign="center" color="white" px={4}>
                <Text 
                  fontSize={{ base: '3xl', md: '5xl', lg: '6xl' }} 
                  fontWeight="bold" 
                  mb={4}
                  textShadow="2px 2px 4px rgba(0,0,0,0.5)"
                >
                  Discover Your Style
                </Text>
                <Text 
                  fontSize={{ base: 'lg', md: 'xl', lg: '2xl' }}
                  textShadow="1px 1px 2px rgba(0,0,0,0.5)"
                >
                  Fashion that defines you
                </Text>
              </Box>
            </motion.div>
          </Box>
        </>
      ) : (
        <Box
          width="100%"
          height="100%"
          background={theme.colors.gradient.primary}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Box textAlign="center" color="white" px={4}>
              <Text 
                fontSize={{ base: '3xl', md: '5xl', lg: '6xl' }} 
                fontWeight="bold" 
                mb={4}
              >
                Discover Your Style
              </Text>
              <Text fontSize={{ base: 'lg', md: 'xl', lg: '2xl' }}>
                Fashion that defines you
              </Text>
              <Text fontSize="sm" mt={4} opacity={0.8}>
                (Add hero-video.mp4 to /public/videos for video background)
              </Text>
            </Box>
          </motion.div>
        </Box>
      )}
    </Box>
  );
};

import { useState } from 'react';
import { Box, Text, Heading } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { theme } from '../config/theme';

export const PromoVideo = ({ title = "Exclusive Collection", description = "Experience the art of fashion" }) => {
  return (
    <Box
      as={motion.div}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      my={16} // Vertical margin for consistency
      py={8}
      bg="#000" // Cinematic background
      color="white"
    >
      <Box maxW="1200px" mx="auto" px={4} textAlign="center">
        <Heading
          size="2xl"
          fontFamily={theme.fontFamily.heading}
          mb={4}
          bgGradient="linear(to-r, #fff, #ccc)"
          bgClip="text"
        >
          {title}
        </Heading>
        <Text fontSize="xl" opacity={0.8} mb={8} maxW="600px" mx="auto">
          {description}
        </Text>

        <Box
          position="relative"
          width="100%"
          height={{ base: "300px", md: "500px" }}
          overflow="hidden"
          borderRadius="lg"
          boxShadow="0 20px 50px rgba(0,0,0,0.5)"
        >
          <video
            autoPlay
            loop
            muted
            playsInline
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              filter: "brightness(0.8)" // Cinematic look
            }}
          >
            {/* Example Fashion Video URL (Replace with your own hosted video) */}
            <source src="https://videos.pexels.com/video-files/5664426/5664426-hd_1920_1080_24fps.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>

          <Box
            position="absolute"
            bottom="0"
            left="0"
            width="100%"
            p={8}
            bg="linear-gradient(to top, rgba(0,0,0,0.8), transparent)"
            display="flex"
            justifyContent="center"
          >
            {/* Optional Overlay Content */}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

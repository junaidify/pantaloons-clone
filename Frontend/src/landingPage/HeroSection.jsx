import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button, Box, Text, Heading, Container, Flex, Image } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import "../styles/hero.css";

// Sample Data mimicking the NFT style but for Fashion
const heroData = [
    {
        id: 1,
        image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1964&auto=format&fit=crop",
        title: "Avant-Garde Collection",
        price: "40% OFF"
    },
    {
        id: 2,
        image: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?q=80&w=1887&auto=format&fit=crop",
        title: "Urban Streetwear",
        price: "NEW DROP"
    },
    {
        id: 3,
        image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=1888&auto=format&fit=crop",
        title: "Elite Fashion Series",
        price: "LIMITED"
    },
    {
        id: 4,
        image: "https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?q=80&w=1887&auto=format&fit=crop",
        title: "Classic Essentials",
        price: "BEST SELLER"
    },
    {
        id: 5,
        image: "https://images.unsplash.com/photo-1529139574466-a302d2753cd4?q=80&w=1887&auto=format&fit=crop",
        title: "Modern Aesthetics",
        price: "TRENDING"
    }
];

export const HeroSection = () => {
    // Current center index
    const [activeIndex, setActiveIndex] = useState(2);

    // Auto rotate
    useEffect(() => {
        const interval = setInterval(() => {
            setActiveIndex((prev) => (prev + 1) % heroData.length);
        }, 4000);
        return () => clearInterval(interval);
    }, []);

    const getCardStyle = (index) => {
        // Calculate distance from active index (circular)
        const total = heroData.length;
        // Circular distance logic
        let distance = (index - activeIndex + total) % total;
        if (distance > total / 2) distance -= total;

        // We only show 5 items effectively centered
        // Layout:  [Left Far] [Left Near] [Center] [Right Near] [Right Far]

        let xOffset = 0;
        let scale = 1;
        let opacity = 1;
        let zIndex = 0;
        let rotateY = 0;

        if (distance === 0) {
            // Center
            scale = 1.25;
            zIndex = 10;
            opacity = 1;
            xOffset = 0;
        } else if (distance === -1 || distance === total - 1) {
            // Left Near
            scale = 0.9;
            zIndex = 5;
            opacity = 0.7;
            xOffset = -220;
            rotateY = 15;
        } else if (distance === 1 || distance === -(total - 1)) {
            // Right Near
            scale = 0.9;
            zIndex = 5;
            opacity = 0.7;
            xOffset = 220;
            rotateY = -15;
        } else if (distance === -2 || distance === total - 2) {
            // Left Far
            scale = 0.7;
            zIndex = 2;
            opacity = 0.4;
            xOffset = -380;
            rotateY = 25;
        } else if (distance === 2 || distance === -(total - 2)) {
            // Right Far
            scale = 0.7;
            zIndex = 2;
            opacity = 0.4;
            xOffset = 380;
            rotateY = -25;
        } else {
            // Very Far / Hidden (optional)
            scale = 0.5;
            opacity = 0;
        }

        return { x: xOffset, scale, opacity, zIndex, rotateY };
    };

    return (
        <Box className="hero-section" bg="#0B0B0B" color="white" minH="100vh" position="relative" overflow="hidden" pt="120px" pb="100px">
            {/* Background Glows */}
            <Box position="absolute" top="-20%" left="20%" width="500px" height="500px" bg="purple.600" filter="blur(150px)" opacity="0.3" borderRadius="full" />
            <Box position="absolute" bottom="-10%" right="-10%" width="600px" height="600px" bg="blue.600" filter="blur(180px)" opacity="0.2" borderRadius="full" />

            <Container maxW="1400px" h="100%" display="flex" flexDirection="column" alignItems="center" position="relative" zIndex={2}>

                {/* 1. Header Content (Top Empty Space) */}
                <Box textAlign="center" mb={16} maxW="800px">
                    <motion.div initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }}>
                        <Flex gap={6} justify="center" mb={4} fontSize="sm" fontWeight="600" color="gray.400" textTransform="uppercase" letterSpacing="widest">
                            <Text cursor="pointer" _hover={{ color: "white" }}>Exchange</Text>
                            <Text cursor="pointer" _hover={{ color: "white" }}>About Us</Text>
                            <Text color="#48BB78" cursor="pointer">Market</Text>
                            <Text cursor="pointer" _hover={{ color: "white" }}>Wallet</Text>
                        </Flex>
                    </motion.div>

                    <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.4 }}>
                        <Heading as="h1" fontSize={{ base: "4xl", md: "7xl" }} fontWeight="900" lineHeight="0.9" letterSpacing="-0.02em" mb={4} bgGradient="linear(to-r, white, gray.400)" bgClip="text">
                            UNIQUE COLLECTION <br />
                            <Box as="span" bgGradient="linear(to-r, #9F7AEA, #ED64A6)" bgClip="text">OF FASHION</Box>
                        </Heading>
                        <Text fontSize="lg" color="gray.400" maxW="500px" mx="auto">
                            The largest collection of premium styles among all marketplaces.
                        </Text>
                    </motion.div>
                </Box>

                {/* 2. 3D Card Display */}
                <Box position="relative" height="450px" width="100%" display="flex" justifyContent="center" alignItems="center" perspective="1000px">
                    {heroData.map((item, index) => {
                        const style = getCardStyle(index);
                        const isCenter = index === activeIndex;

                        return (
                            <motion.div
                                key={item.id}
                                style={{
                                    position: 'absolute',
                                    zIndex: style.zIndex,
                                    width: '280px',
                                    height: '400px',
                                    borderRadius: '24px',
                                    overflow: 'hidden',
                                    boxShadow: isCenter ? '0 25px 50px -12px rgba(0, 0, 0, 0.5)' : 'none',
                                    cursor: 'pointer'
                                }}
                                animate={{
                                    x: style.x,
                                    scale: style.scale,
                                    opacity: style.opacity,
                                    rotateY: style.rotateY,
                                }}
                                transition={{
                                    type: "spring",
                                    stiffness: 200,
                                    damping: 20
                                }}
                                onClick={() => setActiveIndex(index)}
                            >
                                <Box position="relative" w="100%" h="100%">
                                    <Image src={item.image} alt={item.title} w="100%" h="100%" objectFit="cover" />

                                    {/* Overlay Gradient */}
                                    <Box position="absolute" bottom="0" left="0" w="100%" h="60%" bgGradient="linear(to-t, rgba(0,0,0,0.9), transparent)" />

                                    {/* Card Content */}
                                    <Box position="absolute" bottom="20px" left="20px" right="20px">
                                        <Text fontSize="xs" fontWeight="bold" bg="rgba(255,255,255,0.2)" backdropFilter="blur(5px)" display="inline-block" px={2} py={1} borderRadius="md" mb={2}>
                                            {item.price}
                                        </Text>
                                        <Text fontSize="lg" fontWeight="bold" lineHeight="1.2">
                                            {item.title}
                                        </Text>
                                    </Box>
                                </Box>
                            </motion.div>
                        );
                    })}
                </Box>

                {/* CTA Overlay on Center Card (Optional) */}
            </Container>
        </Box>
    );
};


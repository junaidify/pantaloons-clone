import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCartShopping,
  faHeart,
  faMagnifyingGlass,
  faUser,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import { Box, Grid, GridItem, Image, Button, Menu, MenuButton, MenuList, MenuItem, Avatar } from "@chakra-ui/react";
import { motion } from "framer-motion";
import "../styles/navbar.css";
import { Link } from "react-router-dom";
import { useSearchBar } from "../redux/searchbar";
import { useAuth0 } from "@auth0/auth0-react";
import { theme } from "../config/theme";

const MotionBox = motion(Box);

export const Navbar = () => {
  const {
    handleSearch,
    selectedCategory,
    setSelectedCategory,
    searchTerm,
    setSearchTerm,
  } = useSearchBar();

  const { loginWithRedirect, logout, user, isAuthenticated, isLoading } = useAuth0();

  return (
    <>
      <MotionBox
        id="navbar_wrapper"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        style={{
          position: "sticky",
          top: 0,
          zIndex: 1000,
          background: theme.colors.surface,
          boxShadow: theme.shadows.md,
        }}
      >
        <div id="navbar">
          <Box boxSize="sm" width="90%" height="8vh">
            <Link className="link_comp" to="/">
              <MotionBox
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <Image
                  w="100%"
                  h="100%"
                  src="https://imagescdn.pantaloons.com/img/app/brands/pantaloons/icons/logo_pantaloons.svg"
                  alt="Logo"
                />
              </MotionBox>
            </Link>
          </Box>

          <div style={{ marginLeft: "5%" }}>
            <Grid templateColumns="repeat(5, 1fr)">
              <Link to="/navbar/mens">
                <MotionBox
                  as={GridItem}
                  className="navbar_category"
                  w="100%"
                  h="auto"
                  whileHover={{ y: -2 }}
                  transition={{ duration: 0.2 }}
                  style={{
                    color: theme.colors.text.primary,
                    fontWeight: "600",
                  }}
                >
                  MEN
                </MotionBox>
              </Link>
              <Link to="/navbar/women">
                <MotionBox
                  as={GridItem}
                  className="navbar_category"
                  w="100%"
                  h="auto"
                  whileHover={{ y: -2 }}
                  transition={{ duration: 0.2 }}
                  style={{
                    color: theme.colors.text.primary,
                    fontWeight: "600",
                  }}
                >
                  WOMEN
                </MotionBox>
              </Link>
              <Link to="/navbar/kids">
                <MotionBox
                  as={GridItem}
                  className="navbar_category"
                  w="100%"
                  h="auto"
                  whileHover={{ y: -2 }}
                  transition={{ duration: 0.2 }}
                  style={{
                    color: theme.colors.text.primary,
                    fontWeight: "600",
                  }}
                >
                  KIDS
                </MotionBox>
              </Link>
              <Link to="/navbar/home">
                <MotionBox
                  as={GridItem}
                  className="navbar_category"
                  w="100%"
                  h="auto"
                  whileHover={{ y: -2 }}
                  transition={{ duration: 0.2 }}
                  style={{
                    color: theme.colors.text.primary,
                    fontWeight: "600",
                  }}
                >
                  HOME
                </MotionBox>
              </Link>

              <Link to="/navbar/beauty">
                <MotionBox
                  as={GridItem}
                  className="navbar_category"
                  w="100%"
                  h="auto"
                  whileHover={{ y: -2 }}
                  transition={{ duration: 0.2 }}
                  style={{
                    color: theme.colors.text.primary,
                    fontWeight: "600",
                  }}
                >
                  BEAUTY
                </MotionBox>
              </Link>
            </Grid>
          </div>

          <Grid
            className="navbar_search_parent"
            gridTemplateColumns="60% 25% 15%"
            gap={3}
          >
            <input
              className="navbar_search"
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                borderRadius: theme.borderRadius.lg,
                border: `2px solid ${theme.colors.border.light}`,
                transition: theme.transitions.normal,
              }}
            />
            <select
              value={selectedCategory}
              className="navbar_search_category"
              style={{
                borderRadius: theme.borderRadius.lg,
                backgroundColor: "inherit",
                border: `2px solid ${theme.colors.border.light}`,
                color: theme.colors.text.primary,
              }}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="mens">Mens</option>
              <option value="women">Women</option>
              <option value="kids">Kids</option>
              <option value="home">Home</option>
              <option value="beauty">Beauty</option>
            </select>
            <MotionBox
              as="p"
              className="navbar_search_icon"
              onClick={handleSearch}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              style={{
                cursor: "pointer",
                color: theme.colors.primary,
              }}
            >
              <FontAwesomeIcon icon={faMagnifyingGlass} />
            </MotionBox>
          </Grid>

          <Grid templateColumns="repeat(3, 1fr)" gap={4}>
            <GridItem
              className="navbar_category"
              w="100%"
              h="auto"
            >
              {!isLoading && (
                <>
                  {isAuthenticated ? (
                    <Menu>
                      <MenuButton
                        as={Button}
                        variant="ghost"
                        p={0}
                        _hover={{ bg: "transparent" }}
                      >
                        <Avatar
                          size="sm"
                          name={user?.name}
                          src={user?.picture}
                        />
                      </MenuButton>
                      <MenuList>
                        <MenuItem isDisabled>{user?.name}</MenuItem>
                        <MenuItem
                          onClick={() => logout({ returnTo: window.location.origin })}
                          icon={<FontAwesomeIcon icon={faRightFromBracket} />}
                        >
                          Logout
                        </MenuItem>
                      </MenuList>
                    </Menu>
                  ) : (
                    <MotionBox
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => loginWithRedirect()}
                      style={{ cursor: "pointer", color: theme.colors.primary }}
                    >
                      <FontAwesomeIcon icon={faUser} />
                    </MotionBox>
                  )}
                </>
              )}
            </GridItem>

            <GridItem className="navbar_category" w="100%" h="auto">
              <Link to="/navbar/wishlist">
                <MotionBox
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  style={{ color: theme.colors.secondary }}
                >
                  <FontAwesomeIcon icon={faHeart} />
                </MotionBox>
              </Link>
            </GridItem>
            <GridItem className="navbar_category" w="100%" h="auto">
              <Link to="/navbar/cart">
                <MotionBox
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  style={{ color: theme.colors.primary }}
                >
                  <FontAwesomeIcon icon={faCartShopping} />
                </MotionBox>
              </Link>
            </GridItem>
          </Grid>
        </div>
      </MotionBox>
    </>
  );
};

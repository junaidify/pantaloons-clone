import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faMagnifyingGlass,
  faBell,
  faUser,
  faCartShopping,
  faRightFromBracket
} from "@fortawesome/free-solid-svg-icons";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Avatar,
  useToast
} from "@chakra-ui/react";
import { motion, AnimatePresence } from "framer-motion";
import "../styles/navbar.css";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useSearchBar } from "../redux/searchbar";
import { useAuth0 } from "@auth0/auth0-react";
import { useState, useEffect } from "react";

export const Navbar = () => {
  const {
    handleSearch,
    searchTerm,
    setSearchTerm,
  } = useSearchBar();

  const { loginWithRedirect, logout, user, isAuthenticated } = useAuth0();
  const navigate = useNavigate();
  const location = useLocation();
  const toast = useToast();

  const [activeTab, setActiveTab] = useState("home");
  const [hoveredTab, setHoveredTab] = useState(null);
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const path = location.pathname;
    if (path === "/" || path.includes("/navbar/home")) setActiveTab("home");
    else if (path.includes("/profile")) setActiveTab("profile");
  }, [location]);

  const navItems = [
    { id: "home", icon: faHome, label: "Home", action: () => navigate("/") },
    {
      id: "search",
      icon: faMagnifyingGlass,
      label: "Search",
      action: () => setIsSearchActive(true)
    },
    {
      id: "notification",
      icon: faBell,
      label: "Notification",
      action: () => toast({ title: "No new notifications", status: "info", duration: 1500, isClosable: true })
    },
    {
      id: "profile",
      icon: faUser,
      label: isAuthenticated ? (user?.given_name || "Profile") : "Login",
      action: () => isAuthenticated ? null : loginWithRedirect()
    }
  ];

  const handleTabClick = (item) => {
    setActiveTab(item.id);
    if (item.action) item.action();
  };

  const containerVariants = {
    full: {
      position: "fixed",
      top: 0,
      left: 0,
      width: "100%",
      borderRadius: "0px",
      backgroundColor: "rgba(255, 255, 255, 1)",
      padding: "1rem 2rem",
      justifyContent: "space-between",
      boxShadow: "none",
    },
    pill: {
      position: "fixed",
      top: "1rem",
      left: "50%",
      width: "fit-content",
      x: "-50%",
      borderRadius: "9999px",
      backgroundColor: "rgba(255, 255, 255, 0.95)",
      padding: "0.5rem 1rem",
      justifyContent: "center",
      boxShadow: "0 8px 32px rgba(0,0,0,0.15)",
      zIndex: 1000
    }
  };

  const springTransition = {
    type: "spring",
    stiffness: 400,
    damping: 25
  };

  return (
    <>
      {!isScrolled && <div style={{ height: "80px", width: "100%" }}></div>}

      <motion.nav
        className="navbar-wrapper"
        initial="full"
        animate={isScrolled ? "pill" : "full"}
        variants={containerVariants}
        transition={springTransition}
      >
        {!isScrolled && (
          <motion.div
            className="navbar-logo"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{ width: '200px' }}
          >
            <Link to="/" className="navbar-logo-text" style={{ fontSize: '1.5rem', fontWeight: '900', letterSpacing: '-0.05em', textDecoration: 'none', color: 'black' }}>
              PANTALOONS
            </Link>
          </motion.div>
        )}

        <div className="navbar-items-container" style={{ display: 'flex', gap: '12px', alignItems: 'center', justifyContent: 'center', flex: 1 }}>
          <AnimatePresence mode="popLayout" initial={false}>
            {navItems.map((item) => {
              const isExpanded = activeTab === item.id || hoveredTab === item.id;

              if (item.id === "search" && isSearchActive && isExpanded) {
                return (
                  <motion.div
                    key="search-input"
                    layout
                    className="pill-item active"
                    style={{
                      cursor: 'text',
                      padding: '0 1.25rem',
                      display: 'flex',
                      alignItems: 'center',
                      height: '48px',
                      borderRadius: '50px',
                      background: '#F3F4F6',
                      color: 'black',
                      minWidth: '220px'
                    }}
                  >
                    <FontAwesomeIcon icon={item.icon} className="pill-icon" />
                    <motion.input
                      autoFocus
                      placeholder="Search..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          handleSearch();
                          setIsSearchActive(false);
                        }
                      }}
                      onBlur={() => setIsSearchActive(false)}
                      style={{ border: 'none', background: 'transparent', outline: 'none', marginLeft: '0.5rem', width: '100%', fontSize: '0.95rem' }}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    />
                  </motion.div>
                );
              }

              if (item.id === "profile" && isAuthenticated) {
                return (
                  <Menu key={item.id} isLazy>
                    <MenuButton
                      as={motion.button}
                      className={`pill-item ${isExpanded ? 'expanded' : ''}`}
                      onClick={() => handleTabClick(item)}
                      onMouseEnter={() => setHoveredTab(item.id)}
                      onMouseLeave={() => setHoveredTab(null)}
                      layout
                      transition={springTransition}
                      style={{
                        display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 1.25rem', height: '48px', border: 'none', outline: 'none', cursor: 'pointer', borderRadius: '50px',
                        backgroundColor: activeTab === item.id ? '#1a1a1a' : (hoveredTab === item.id ? '#f0f0f0' : 'transparent'),
                        color: activeTab === item.id ? 'white' : 'black',
                        minWidth: isExpanded ? '140px' : '48px'
                      }}
                    >
                      {user?.picture ? <Avatar size="xs" src={user.picture} style={{ width: '24px', height: '24px' }} /> : <FontAwesomeIcon icon={item.icon} className="pill-icon" />}
                      <AnimatePresence>
                        {isExpanded && (
                          <motion.span
                            className="pill-text"
                            initial={{ opacity: 0, width: 0 }}
                            animate={{ opacity: 1, width: "auto" }}
                            exit={{ opacity: 0, width: 0 }}
                            transition={{ duration: 0.2 }}
                            style={{ overflow: 'hidden', whiteSpace: 'nowrap', display: 'inline-block', marginLeft: '0.75rem', fontWeight: '500' }}
                          >
                            {user.given_name || "Profile"}
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </MenuButton>
                    <MenuList zIndex={2000}>
                      <MenuItem onClick={() => navigate("/profile")}>My Account</MenuItem>
                      <MenuItem onClick={() => logout()}>Logout</MenuItem>
                    </MenuList>
                  </Menu>
                );
              }

              return (
                <motion.button
                  key={item.id}
                  layout
                  className={`pill-item ${activeTab === item.id ? 'active' : ''}`}
                  onClick={() => handleTabClick(item)}
                  onMouseEnter={() => setHoveredTab(item.id)}
                  onMouseLeave={() => setHoveredTab(null)}
                  transition={springTransition}
                  style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 1.25rem', height: '48px', border: 'none', outline: 'none', cursor: 'pointer', borderRadius: '50px',
                    backgroundColor: activeTab === item.id ? '#1a1a1a' : (hoveredTab === item.id ? '#f0f0f0' : 'transparent'),
                    color: activeTab === item.id ? 'white' : 'black',
                    minWidth: isExpanded ? '120px' : '48px'
                  }}
                >
                  <motion.div layout className="pill-icon">
                    <FontAwesomeIcon icon={item.icon} style={{ fontSize: '1.2rem' }} />
                  </motion.div>

                  <AnimatePresence>
                    {isExpanded && (
                      <motion.span
                        className="pill-text"
                        initial={{ opacity: 0, width: 0 }}
                        animate={{ opacity: 1, width: "auto" }}
                        exit={{ opacity: 0, width: 0 }}
                        transition={{ duration: 0.2 }}
                        style={{ overflow: 'hidden', whiteSpace: 'nowrap', display: 'inline-block', marginLeft: '0.75rem', fontWeight: '500' }}
                      >
                        {item.label}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </motion.button>
              );
            })}
          </AnimatePresence>
        </div>

        {!isScrolled && (
          <div className="navbar-actions" style={{ display: 'flex', alignItems: 'center', width: '200px', justifyContent: 'flex-end' }}>
            <Link to="/navbar/cart">
              <motion.div
                whileHover={{ scale: 1.1 }}
                className="icon-btn"
                style={{ width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%', color: 'black' }}
              >
                <FontAwesomeIcon icon={faCartShopping} style={{ fontSize: '1.2rem' }} />
              </motion.div>
            </Link>
          </div>
        )}
      </motion.nav>
    </>
  );
};

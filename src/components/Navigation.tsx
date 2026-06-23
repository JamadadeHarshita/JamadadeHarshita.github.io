import React, { useEffect, useState } from "react";
import { useLang } from '../i18n/LangContext';
import { Lang } from '../i18n/translations';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListIcon from '@mui/icons-material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';

const drawerWidth = 240;
const navSections = [
  ['nav_expertise', 'expertise'],
  ['nav_history',   'history'],
  ['nav_projects',  'projects'],
  ['nav_contact',   'contact'],
  ['nav_achievements', 'achievements'],
] as const;

function Navigation({ lang, setLang }: { lang: Lang, setLang: (l: Lang) => void }) {
  const { t } = useLang();
  const navItems = navSections.map(([key, id]) => [t(key), id] as [string, string]);
  const [mobileOpen, setMobileOpen] = useState<boolean>(false);
  const [activeSection, setActiveSection] = useState<string>('');

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  useEffect(() => {
    const handleScroll = () => {
      navItems.forEach(([_, id]) => {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(id);
          }
        }
      });
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [navItems]); // eslint-disable-line react-hooks/exhaustive-deps

  const scrollToSection = (section: string) => {
    const el = document.getElementById(section);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(section);
    }
  };

  const drawer = (
    <Box
      className="navigation-bar-responsive"
      sx={{ textAlign: 'center', background: '#1a1a2e', height: '100%' }}
    >
      <p style={{
        padding: '16px',
        fontWeight: 700,
        fontSize: '1.1rem',
        background: 'linear-gradient(90deg, #5000ca, #9b59b6)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px'
      }}>
        <ListIcon style={{ color: '#5000ca' }}/> Menu
      </p>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item[0]} disablePadding>
            <ListItemButton
              sx={{
                textAlign: 'center',
                color: activeSection === item[1] ? '#9b59b6' : '#fff',
                fontWeight: activeSection === item[1] ? 700 : 400,
              }}
              onClick={() => { scrollToSection(item[1]); handleDrawerToggle(); }}
            >
              <ListItemText primary={item[0]} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        component="nav"
        id="navigation"
        elevation={0}
        sx={{
          backgroundColor: 'rgba(8, 8, 15, 0.8)',
          backdropFilter: 'blur(12px)',
          backgroundImage: 'none',
          boxShadow: 'none',
          borderBottom: '1px solid rgba(255,255,255,0.05)',
        }}
      >
        <Toolbar
          className='navigation-bar'
          sx={{ justifyContent: 'space-between', padding: '0 24px' }}
        >
          {/* LEFT — Full Name */}
          <Box
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            sx={{
              cursor: 'pointer',
              fontWeight: 700,
              fontSize: '1rem',
              letterSpacing: '1px',
              fontFamily: "'Space Grotesk', sans-serif",
              color: '#ffffff',
              display: { xs: 'none', sm: 'block' },
              userSelect: 'none',
              textTransform: 'uppercase',
            }}
          >
            harshita.jamadade
          </Box>

          {/* MOBILE — hamburger */}
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ display: { sm: 'none' }, color: '#5000ca' }}
          >
            <MenuIcon />
          </IconButton>

          {/* RIGHT — nav items + EN/DE toggle */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Box sx={{ display: { xs: 'none', sm: 'flex' }, gap: '4px' }}>
              {navItems.map((item) => (
                <Button
                  key={item[0]}
                  onClick={() => scrollToSection(item[1])}
                  sx={{
                    color: activeSection === item[1] ? '#9b59b6' : '#fff',
                    fontWeight: activeSection === item[1] ? 700 : 500,
                    fontSize: '0.9rem',
                    fontFamily: "'Space Grotesk', sans-serif",
                    letterSpacing: '0.5px',
                    position: 'relative',
                    textTransform: 'none',
                    px: 2,
                    '&::after': {
                      content: '""',
                      position: 'absolute',
                      bottom: 4,
                      left: '50%',
                      transform: activeSection === item[1] ? 'translateX(-50%) scaleX(1)' : 'translateX(-50%) scaleX(0)',
                      width: '60%',
                      height: '2px',
                      background: 'linear-gradient(90deg, #5000ca, #9b59b6)',
                      borderRadius: '2px',
                      transition: 'transform 0.3s ease',
                    },
                    '&:hover::after': { transform: 'translateX(-50%) scaleX(1)' },
                    '&:hover': { color: '#9b59b6', background: 'transparent' },
                    transition: 'color 0.3s ease',
                  }}
                >
                  {item[0]}
                </Button>
              ))}
            </Box>

            {/* EN/DE Toggle */}
            <Box
              sx={{
                display: 'flex',
                border: '1px solid rgba(155, 89, 182, 0.4)',
                borderRadius: '999px',
                overflow: 'hidden',
              }}
            >
              {(['EN', 'DE'] as Lang[]).map((l) => (
                <Box
                  key={l}
                  onClick={() => setLang(l)}
                  sx={{
                    px: 1.5,
                    py: 0.5,
                    fontSize: '0.8rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    background: lang === l ? 'linear-gradient(90deg, #5000ca, #9b59b6)' : 'transparent',
                    color: lang === l ? '#fff' : 'rgba(255,255,255,0.5)',
                    transition: 'all 0.3s ease',
                    userSelect: 'none',
                  }}
                >
                  {l}
                </Box>
              ))}
            </Box>
          </Box>
        </Toolbar>
      </AppBar>

      <nav>
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
              background: 'rgba(89, 63, 129, 0.15)',
            },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
    </Box>
  );
}

export default Navigation;
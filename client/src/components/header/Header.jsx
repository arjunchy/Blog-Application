import React from "react";
import { AppBar, Toolbar, styled, useMediaQuery, Drawer, IconButton } from "@mui/material";
import { Link } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";

const Header = () => {
    const isMobile = useMediaQuery('(max-width: 768px)');
    const isTablet = useMediaQuery('(max-width: 1024px)');

    const Component = styled(AppBar)`
        background: #fff;
        color: #000;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        transition: background 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
        &:hover {
            background: #f5f5f5;
        }
    `;

    const Container = styled(Toolbar)`
        display: flex;
        justify-content: ${isMobile || isTablet ? 'space-between' : 'center'};
        align-items: center;
        gap: ${isMobile || isTablet ? '0' : '30px'};
        padding: ${isMobile || isTablet ? '10px' : '10px 20px'};
        animation: fadeIn 1s ease-in-out;
    `;

    const StyledLink = styled(Link)`
        text-decoration: none;
        color: #000;
        font-size: ${isMobile || isTablet ? '14px' : '16px'};
        font-weight: 500;
        padding: 10px;
        display: block;
        position: relative;
        transition: color 0.3s ease, transform 0.3s ease, background 0.3s ease;

        &:hover {
            color: rgb(245, 0, 86);  
            // background: rgb(245, 0, 86); 
            transform: scale(1.05);
            border-radius: 4px;
        }

        &::after {
            content: '';
            position: absolute;
            left: 0;
            right: 0;
            bottom: -2px;
            height: 2px;
            background-color: rgb(245, 0, 86);  
            transition: width 0.3s ease-in-out;
            width: 0;
        }

        &:hover::after {
            width: 100%;
        }
    `;

    const [open, setOpen] = React.useState(false);
    const toggleDrawer = () => setOpen(!open);

    return (
        <>
            <Component>
                <Container>
                    {isMobile || isTablet ? (
                        <IconButton onClick={toggleDrawer} sx={{ color: '#000' }}>
                            <MenuIcon />
                        </IconButton>
                    ) : (
                        <>
                            <StyledLink to='/'>Home</StyledLink>
                            <StyledLink to='/about'>About</StyledLink>
                            <StyledLink to='/contact'>Contact</StyledLink>
                            <StyledLink to='/login'>Logout</StyledLink>
                        </>
                    )}
                </Container>
            </Component>

            <Drawer anchor="left" open={open} onClose={toggleDrawer}>
                <div style={{ width: 250, padding: '20px' }}>
                    <StyledLink to="/" onClick={toggleDrawer}>Home</StyledLink>
                    <StyledLink to="/about" onClick={toggleDrawer}>About</StyledLink>
                    <StyledLink to="/contact" onClick={toggleDrawer}>Contact</StyledLink>
                    <StyledLink to="/login" onClick={toggleDrawer}>Logout</StyledLink>
                </div>
            </Drawer>
        </>
    );
}

export default Header;

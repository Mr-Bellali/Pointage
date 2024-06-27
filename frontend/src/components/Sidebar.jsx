import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import PeopleIcon from '@mui/icons-material/People';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const Sidebar = () => {
  const [selectedItem, setSelectedItem] = useState(null);

  const handleListItemClick = (index) => {
    setSelectedItem(index);
  };

  const listItemStyle = (index) => ({
    color: selectedItem === index ? '#88AB8E' : 'inherit',
    borderLeft: selectedItem === index ? '4px solid #88AB8E' : 'none',
  });

  return (
    <div className="w-64 bg-white h-full text-gray-400 p-4">
      <List>
        <ListItem
          button
          component={NavLink}
          to="/dashboard"
          onClick={() => handleListItemClick(0)}
          style={({ isActive }) => ({
            color: isActive ? '#88AB8E' : 'inherit',
            borderLeft: isActive ? '4px solid #88AB8E' : 'none',
          })}
        >
          <ListItemIcon style={{ color: selectedItem === 0 ? '#88AB8E' : 'inherit' }}>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText primary="Home" />
        </ListItem>
        <ListItem
          button
          component={NavLink}
          to="/employees"
          onClick={() => handleListItemClick(1)}
          style={({ isActive }) => ({
            color: isActive ? '#88AB8E' : 'inherit',
            borderLeft: isActive ? '4px solid #88AB8E' : 'none',
          })}
        >
          <ListItemIcon style={{ color: selectedItem === 1 ? '#88AB8E' : 'inherit' }}>
            <PeopleIcon />
          </ListItemIcon>
          <ListItemText primary="Employees" />
        </ListItem>
        <ListItem
          button
          component={NavLink}
          to="/profile"
          onClick={() => handleListItemClick(2)}
          style={({ isActive }) => ({
            color: isActive ? '#88AB8E' : 'inherit',
            borderLeft: isActive ? '4px solid #88AB8E' : 'none',
          })}
        >
          <ListItemIcon style={{ color: selectedItem === 2 ? '#88AB8E' : 'inherit' }}>
            <AccountCircleIcon />
          </ListItemIcon>
          <ListItemText primary="Profile" />
        </ListItem>
      </List>
    </div>
  );
};

export default Sidebar;

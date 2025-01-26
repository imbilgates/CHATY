import * as React from 'react';
import PropTypes from 'prop-types';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import 'boxicons/css/boxicons.min.css';
import { StyledBadge } from './MaterialUIStyled';


export default function SimpleDialog(props) {
  const { onClose, selectedValue, open, users } = props;

  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleListItemClick = (value) => {
    onClose(value);
  };


  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>Active Members</DialogTitle>
      <List sx={{ pt: 0 }}>
        {users.map(({ name, image }) => (
          <ListItem disableGutters key={name}>
            <ListItemButton onClick={() => handleListItemClick(name)}>
              <ListItemAvatar>
                <StyledBadge
                  overlap="circular"
                  anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                  variant="dot"
                >
                  <Avatar alt="User Avatar">
                    <div
                      style={{ width: '100%', height: '100%' }}
                      dangerouslySetInnerHTML={{ __html: image }}
                    />
                  </Avatar>
                </StyledBadge>&nbsp;
              </ListItemAvatar>
              <ListItemText primary={name} />
            </ListItemButton>
          </ListItem>
        ))}
        {/* <ListItemAvatar>
              <Avatar>
              </Avatar>
            </ListItemAvatar> */}
      </List>
    </Dialog>
  );
}

SimpleDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selectedValue: PropTypes.string.isRequired,
};



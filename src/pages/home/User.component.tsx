import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { User } from '@/@types/reqres';
import { IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';

interface UserComponentProps {
  user: User;
}

export default function UserComponent({ user }: UserComponentProps) {
  return (
    <List sx={{ width: '100%' }}>
      <ListItem
        alignItems="flex-start"
        secondaryAction={
          <IconButton aria-label="delete" size="small">
            <EditIcon fontSize="inherit" />
          </IconButton>
        }
      >
        <ListItemAvatar>
          <Avatar alt={user.first_name} src={user.avatar} />
        </ListItemAvatar>

        <ListItemText
          primary={`${user.first_name} ${user.last_name}`}
          secondary={
            <React.Fragment>
              <Typography
                component="span"
                variant="body2"
                sx={{ color: 'text.primary', display: 'inline' }}
              >
                {user.email}
              </Typography>
            </React.Fragment>
          }
        />
      </ListItem>
      <Divider variant="inset" component="li" />
    </List>
  );
}

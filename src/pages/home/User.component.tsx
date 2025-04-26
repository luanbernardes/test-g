import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { User } from '@/@types/reqres';
import { Button, Grid2, IconButton, TextField } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';
import { useState } from 'react';

interface UserComponentProps {
  user: User;
  userChange: (user: User) => void;
  deleteUser: (id: number) => void;
}

export default function UserComponent({ user, userChange, deleteUser }: UserComponentProps) {
  const [isEditing, setIsEditing] = useState(false);

  const [formData, setFormData] = useState<User>({
    id: user.id,
    first_name: user.first_name,
    last_name: user.last_name,
    email: user.email,
    avatar: user.avatar
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  }

  function saveChanges() {
    userChange(formData);
    setIsEditing(false);
  }

  return (
    <List sx={{ width: '100%' }}>
      <ListItem
        alignItems="flex-start"
        secondaryAction={
          <>
            <IconButton aria-label="delete" size="small" onClick={() => setIsEditing(!isEditing)}>
              {!isEditing && <EditIcon fontSize="inherit" />}

              {isEditing && <CloseIcon fontSize="inherit" />}
            </IconButton>
          </>
        }
      >
        <ListItemAvatar>
          <Avatar alt={user.first_name} src={user.avatar} />
        </ListItemAvatar>

        {!isEditing && (
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
        )}

        {isEditing && (
          <ListItemText
            primary={
              <React.Fragment>
                <Grid2 container spacing={2}>
                  <Grid2>
                    <TextField
                      fullWidth
                      type="text"
                      label="first name"
                      name="first_name"
                      placeholder="first name"
                      variant="standard"
                      value={formData.first_name}
                      onChange={handleChange}
                      required
                    />
                  </Grid2>
                  <Grid2>
                    <TextField
                      fullWidth
                      type="text"
                      label="last name"
                      name="last_name"
                      placeholder="last name"
                      variant="standard"
                      value={formData.last_name}
                      onChange={handleChange}
                      required
                    />
                  </Grid2>
                  <Grid2>
                    <TextField
                      fullWidth
                      type="email"
                      label="email"
                      name="email"
                      placeholder="email"
                      variant="standard"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </Grid2>

                  <Grid2>
                    <Button onClick={() => deleteUser(user.id)}>delete</Button>
                    <Button onClick={saveChanges}>save</Button>
                  </Grid2>
                </Grid2>
              </React.Fragment>
            }
            secondary={
              <React.Fragment>
                {!isEditing && (
                  <Typography
                    component="span"
                    variant="body2"
                    sx={{ color: 'text.primary', display: 'inline' }}
                  >
                    {user.email}
                  </Typography>
                )}
              </React.Fragment>
            }
          />
        )}
      </ListItem>
      <Divider variant="inset" component="li" />
    </List>
  );
}

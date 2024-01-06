import React, { useEffect, useState } from 'react';
import { 
  Box, Flex, Text, Heading, Button, Input, Avatar, AvatarBadge, IconButton,
  FormControl, FormLabel, Stack
} from "@chakra-ui/react";
import { EditIcon } from "@chakra-ui/icons";
import { useNavigate } from 'react-router-dom';

const UserProfile = () => {
  const initialUser = { name: '', address: '', cnic: '', phoneNumber: '', dateOfBirth: '', experience: '' };
  const storedUser = JSON.parse(localStorage.getItem('user')) || initialUser;
  const storedProfilePicture = localStorage.getItem('profilePicture') || '';
  const [user, setUser] = useState(storedUser);
  const [isEditing, setIsEditing] = useState(false);
  const [newProfilePicture, setNewProfilePicture] = useState(storedProfilePicture);
  const navigate = useNavigate();

  useEffect(()=>{
    const fetchProfile = async()=>{
      const response = await fetch("http://localhost:8000/api/profile/fetchProfile/?id=656349ec996a72b0dca76b28");
      const profile = await response.json();
      console.log("profile: ",profile);
      setUser(profile.profile)

    }
    fetchProfile()
  },[])

  const handleGoBack = () => navigate('/AdminDashboard');
  const handleEditClick = () => setIsEditing(!isEditing);
  const handlePictureUpload = (e) => {
    const file = e.target.files[0];
    const imageUrl = URL.createObjectURL(file);
    setNewProfilePicture(imageUrl);
    localStorage.setItem('profilePicture', imageUrl);
  };
  const handleInputChange = (e, field) => {
    const { value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [field]: value,
    }));
  };
  const handleSaveChanges = () => {
    setIsEditing(false);
    localStorage.setItem('user', JSON.stringify(user));
    if (newProfilePicture) {
      localStorage.setItem('profilePicture', newProfilePicture);
    }
  };

  return (
    <Flex direction="column" align="center" p={5}>
      <Heading mb={5}>User Profile</Heading>
      
      <Box width="400px" bg="white" p={5} boxShadow="md" borderRadius="lg">
        {/* Profile Picture */}
        <Flex direction="column" align="center" mb={5}>
          <Avatar size="xl" src={newProfilePicture || user.profilePicture} mb={3}>
            {isEditing && (
              <AvatarBadge as="label" cursor="pointer">
                <IconButton as="label" icon={<EditIcon />} variant="ghost" size="sm">
                  <Input type="file" accept="image/*" onChange={handlePictureUpload} display="none" />
                </IconButton>
              </AvatarBadge>
            )}
          </Avatar>
          {isEditing ? (
            <Input value={user.name} onChange={(e) => handleInputChange(e, 'name')} />
          ) : (
            <Text fontSize="2xl" fontWeight="bold">{user.name}</Text>
          )}
        </Flex>

        {/* User Information */}
        <Stack spacing={4}>
          {Object.entries(user).map(([key, value]) => (
            key !== 'name' && (
              <FormControl key={key}>
                <FormLabel>{key.charAt(0).toUpperCase() + key.slice(1)}</FormLabel>
                {isEditing ? (
                  <Input value={value} onChange={(e) => handleInputChange(e, key)} />
                ) : (
                  <Text>{value}</Text>
                )}
              </FormControl>
            )
          ))}
        </Stack>

        {/* Buttons */}
        <Flex justify="space-between" mt={5}>
          <Button colorScheme="blue" onClick={handleGoBack}>Back</Button>
          {isEditing ? (
            <Button colorScheme="green" onClick={handleSaveChanges}>Save Changes</Button>
          ) : (
            <Button colorScheme="teal" onClick={handleEditClick}>Edit Profile</Button>
          )}
        </Flex>
      </Box>
    </Flex>
  );
};

export default UserProfile;

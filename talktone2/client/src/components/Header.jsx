import React, { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import {
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
  Button,
  IconButton,
  Menu,
  MenuButton,
  Image,
  MenuList,
  MenuItem
} from "@chakra-ui/react";
import { SearchIcon, BellIcon } from "@chakra-ui/icons";
import talktoneLogo from '../talktone.png'; 
import { FaUser } from 'react-icons/fa';

const Header = () => {
  const [searchValue, setSearchValue] = useState('');
  const navigate = useNavigate();

  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
    fetch("http://localhost:8000/api/admin/operatorSuggestion?cnic="+e.target.value)
    .then(res => res.json())
    .then(data => { 
      var list = document.getElementById('suggestions')
      var str=''
      data.operators.forEach(element => {
        str+='<option value="'+element.cnic+'">'
           });
      list.innerHTML=str
    })
  };

  return (
    <Flex
      as="header"
      align="center"
      justify="space-between"
      padding="0.5rem" 
      bg="#23374d" 
      color="white"
      height="60px" 
    >
      {/* Logo and its container */}
      <Flex align="center" height="100%" ml="1rem"> 
        <Image src={talktoneLogo} alt="TalkTone" maxHeight="100%" objectFit="contain" />
      </Flex>

      {/* Search Bar */}
      <InputGroup w="30%">
        <InputLeftElement pointerEvents="none">
          <SearchIcon color="gray.300" />
        </InputLeftElement>
        <Input
          type="text"
          value={searchValue}
          onChange={handleSearchChange}
          placeholder="Search..."
          variant="filled"
          list='suggestions'
          _placeholder={{ color: "gray.500" }}
        />
        <datalist id="suggestions">
          {/* Suggestions will be populated here */}
        </datalist>
      </InputGroup>

      {/* Notification and User Profile */}
      <Flex align="center">
        {localStorage.getItem("userOp")?<IconButton
          icon={<FaUser />}
          variant="ghost"
          aria-label="Notifications"
          as={RouterLink}
          to={`/OperatorProfile/${localStorage.getItem('userOp')}`}
          mr="4"
        />:<></>}
        <IconButton
          icon={<BellIcon />}
          variant="ghost"
          aria-label="Notifications"
          as={RouterLink}
          to="/Notifications"
          mr="4"
        />
      </Flex>
    </Flex>
  );
};

export default Header;

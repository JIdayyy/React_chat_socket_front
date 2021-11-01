import React, { ReactElement, useState } from "react";
import { Link as RouterLink, useHistory } from "react-router-dom";
import bg from "../images/SignUp_Mobile.jpg";
import profile_icon from "../images/profile_icon.png";

import {
  Input,
  Stack,
  InputGroup,
  InputLeftElement,
  Center,
  Image,
  Button,
  Link,
  Box,
  Text,
} from "@chakra-ui/react";

import { BsFillChatLeftDotsFill } from "react-icons/bs";
import { AiOutlineUser } from "react-icons/ai";
import axios from "axios";
import { useDispatch } from "react-redux";
import { login } from "redux/actions";

interface Props {}
const URL = process.env.REACT_APP_API_URL;
export default function Join({}: Props): ReactElement {
  const [name, setName] = useState<string>("");
  const [room, setRoom] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const history = useHistory();
  const dispatch = useDispatch();
  const handleSubmit = async () => {
    await axios
      .post(`${URL}/api/login`, {
        name,
        password,
      })
      .then((r) => r.data)
      .then((r) => dispatch(login(r)))
      .then(() => history.push(`/chat?name=${name}&room=${room}`));
  };

  return (
    <Center
      height="100vh"
      backgroundImage={bg}
      backgroundPosition="center"
      backgroundRepeat="no-repeat"
      bgSize="cover"
    >
      <Box position="relative" shadow="lg" className="circle" p={4} rounded={4}>
        <Text
          textAlign="center"
          fontSize="3xl"
          textColor="transparent"
          fontFamily="heading"
        >
          Join Room
        </Text>
        <Image
          width="30%"
          src={profile_icon}
          position="absolute"
          zIndex={10}
          top={-10}
          left="35%"
          backgroundColor="white"
          borderRadius="100%"
          p={2}
        />
        <Stack flexDirection="column" spacing={3}>
          <InputGroup>
            <InputLeftElement
              pointerEvents="none"
              children={<BsFillChatLeftDotsFill color="gray.300" />}
            />
            <Input
              bg="white"
              variant="outline"
              placeholder="Username"
              type="text"
              onChange={(e) => setName(e.target.value)}
            />
          </InputGroup>
          <InputGroup>
            <InputLeftElement
              pointerEvents="none"
              children={<BsFillChatLeftDotsFill color="gray.300" />}
            />
            <Input
              bg="white"
              variant="outline"
              placeholder="Password"
              type="text"
              onChange={(e) => setPassword(e.target.value)}
            />
          </InputGroup>
          <InputGroup>
            <InputLeftElement
              pointerEvents="none"
              children={<AiOutlineUser color="gray.300" />}
            />
            <Input
              bg="white"
              variant="outline"
              placeholder="Room"
              className="border border-black"
              type="text"
              onChange={(e) => setRoom(e.target.value)}
            />
          </InputGroup>
          <Center>
            <Button
              onClick={handleSubmit}
              fontFamily="body"
              type="submit"
              colorScheme="orange"
            >
              Join Room
            </Button>
          </Center>
        </Stack>
      </Box>
    </Center>
  );
}

import React, { ReactElement, useEffect, useState } from "react";
import queryString from "query-string";
import io from "socket.io-client";
import {
  Input,
  Stack,
  InputGroup,
  InputLeftElement,
  Container,
  Center,
  Image,
  Button,
  InputRightElement,
  Link,
  Box,
  Text,
} from "@chakra-ui/react";
import { BsFillChatLeftDotsFill } from "react-icons/bs";
import { AiOutlineSend } from "react-icons/ai";
import MessageCard from "./MessageCard";
import { useSelector } from "react-redux";
import { RootState } from "redux/reducers";
import { RouteComponentProps } from "react-router";

const ENDPOINT = import.meta.env.VITE_API_URL;

type Message = {
  user: string;
  text: string;
};

const fakeMessages = [
  { message: "premier message", id: "1" },
  { message: "deuxieme message", id: "" },
  { message: "troisieme message", id: "3" },
];

const socket = io(ENDPOINT as string);

export default function Chat({
  location,
}: {
  location: Location;
}): ReactElement {
  const [name, setName] = useState<string | string[]>("");
  const [room, setRoom] = useState<string | string[]>("");
  const [message, setMessage] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>([]);
  const user = useSelector((state: RootState) => state.user);

  useEffect(() => {
    const { name, room } = queryString.parse(location.search);
    if (!name || !room) return;
    setName(name);
    setRoom(room);

    socket.emit("join", { room, user }, () => {});

    return () => {
      socket.emit("disconnection");
      socket.off();
    };
  }, [location.search]);

  useEffect(() => {
    socket.on("message", (message: Message) => {
      console.log(message);
      setMessages([...messages, message]);
    });
  }, [messages]);

  const sendMessage = (event: any) => {
    event.preventDefault();

    if (message) {
      socket.emit("sendMessage", { message, user, room }, () => setMessage(""));
    }
  };

  return (
    <Box>
      <Box w="100%" p={4} flexDirection="column" py={10} overflowY="scroll">
        {messages.map((message) => (
          <MessageCard message={message} />
        ))}
      </Box>
      <Box
        borderTop="2px"
        borderColor="gray.300"
        backgroundColor="gray.100"
        bottom="0"
        position="fixed"
        width="full"
        p={4}
      >
        <InputGroup>
          <InputLeftElement
            pointerEvents="none"
            children={<BsFillChatLeftDotsFill color="gray.300" />}
          />
          <Input
            backgroundColor="white"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={(e) => (e.key === "Enter" ? sendMessage(e) : null)}
          />

          <InputRightElement>
            <button onClick={(e) => sendMessage(e)}>
              {" "}
              <AiOutlineSend color="gray.300" />
            </button>
          </InputRightElement>
        </InputGroup>
      </Box>
    </Box>
  );
}

import { Text } from "@chakra-ui/layout";
import React, { ReactElement } from "react";
import { useSelector } from "react-redux";
import { RootState } from "redux/reducers";

interface Props {
  message: {
    message: string;
    id: string;
    content: string;
    user: string;
  };
}

export default function MessageCard({ message }: Props): ReactElement {
  console.log(message);
  const user = useSelector((state: RootState) => state.user);
  return (
    <div>
      <Text
        textAlign={message.user.name === user.name ? "right" : "left"}
        p={2}
        textColor="white"
        fontSize="x-small"
        backgroundColor={
          message.user.name === user.name ? "purple.default" : "green.500"
        }
        borderRadius="lg"
        my="2"
      >
        {message.content}
      </Text>
    </div>
  );
}

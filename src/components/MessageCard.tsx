import { Text } from "@chakra-ui/layout";
import React, { ReactElement } from "react";
import { useSelector } from "react-redux";
import { RootState } from "redux/reducers";

interface Props {
  message: {
    message: string;
    id: string;
    text: string;
    user: string;
  };
}

export default function MessageCard({ message }: Props): ReactElement {
  const user = useSelector((state: RootState) => state.user);
  return (
    <div>
      <Text
        textAlign={message.user === user.name ? "right" : "left"}
        p={2}
        textColor="white"
        fontSize="x-small"
        backgroundColor={
          message.user === user.name ? "purple.default" : "green.500"
        }
        borderRadius="lg"
        my="2"
      >
        {message.text}
      </Text>
    </div>
  );
}

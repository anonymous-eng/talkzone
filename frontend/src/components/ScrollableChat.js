import { Avatar } from "@chakra-ui/avatar";
import { Tooltip } from "@chakra-ui/tooltip";
import ScrollableFeed from "react-scrollable-feed";
import { useColorModeValue } from "@chakra-ui/react";
import {
  isLastMessage,
  isSameSender,
  isSameSenderMargin,
  isSameUser,
} from "../config/ChatLogics";
import { ChatState } from "../Context/ChatProvider";

const ScrollableChat = ({ messages }) => {
  const { user } = ChatState();
  const bg = useColorModeValue('white', '#1A202C');

  return (
  <ScrollableFeed>
    {messages &&
      messages.map((m, i) => {
        // Check if the current message is the last message
        const isLMessage = i === messages.length - 1;

        // Check if the current message is sent by the logged-in user
        const isUserMessage = m.sender._id === user._id;

        return (
          <div style={{ display: "flex", flexDirection: "column" }} key={m._id}>
            <div style={{ display: "flex" }}>
              {(isSameSender(messages, m, i, user._id) ||
                isLastMessage(messages, i, user._id)) && (
                <Tooltip label={m.sender.name} placement="bottom-start" hasArrow>
                  <Avatar
                    mt="7px"
                    mr={1}
                    size="sm"
                    cursor="pointer"
                    name={m.sender.name}
                    src={m.sender.pic}
                  />
                </Tooltip>
              )}
              <span
                style={{
                  backgroundColor: `${
                    bg === "white"
                      ? m.sender._id === user._id
                        ? "#68D391"
                        : "#4FD1C5"
                      : m.sender._id === user._id
                      ? "#38A169"
                      : "#319795"
                  }`,
                  marginLeft: isSameSenderMargin(messages, m, i, user._id),
                  marginTop: isSameUser(messages, m, i, user._id) ? 3 : 10,
                  borderRadius: "20px",
                  padding: "5px 15px",
                  maxWidth: "75%",
                }}
              >
                {m.content}
              </span>
            </div>
            {isLMessage && isUserMessage && m.seen === true && (
              <span style={{ color: "gray", fontSize: "12px", marginLeft: "30px" }}>
                Seen
              </span>
            )}
            {isLMessage && isUserMessage && m.seen === false && (
              <span style={{ color: "gray", fontSize: "12px", marginLeft: "30px" }}>
                Delivered
              </span>
            )}
          </div>
        );
      })}
  </ScrollableFeed>
);
};

export default ScrollableChat;

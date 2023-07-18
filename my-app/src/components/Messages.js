import React from "react";
import styled from "styled-components";

const primary = "rgba(23, 190, 187, 1)";
const secondary = "rgba(240, 166, 202, 1)";
const active = "rgba(23, 190, 187, 0.8)";
const busy = "rgba(252, 100, 113, 0.8)";
const away = "rgba(255, 253, 130, 0.8)";

const messages = [
  {
    Name: "George Clooney",
    Message: "The only failure is not to try",
  },
  {
    Name: "Seth Rogen",
    Message: "I grew up in Vancouver, man. That's where more than half of my style comes from.",
  },
  {
    Name: "John Lydon",
    Message: "There's nothing glorious in dying. Anyone can do it.",
  },
];

// Triangle Mixin
const triangleMixin = (color, size, direction) => {
  return `
    width: 0;
    height: 0;
    ${
      direction === "up"
        ? `border-right: ${size}px solid transparent;
          border-left: ${size}px solid transparent;
          border-bottom: ${size}px solid ${color};`
        : direction === "down"
        ? `border-right: ${size}px solid transparent;
          border-left: ${size}px solid transparent;
          border-top: ${size}px solid ${color};`
        : direction === "right"
        ? `border-top: ${size}px solid transparent;
          border-bottom: ${size}px solid transparent;
          border-left: ${size}px solid ${color};`
        : direction === "left"
        ? `border-top: ${size}px solid transparent;
          border-bottom: ${size}px solid transparent;
          border-right: ${size}px solid ${color};`
        : ""
    }
  `;
};

const MainContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100vh;
  width: 100vw;

  h1 {
    margin: 0.5em auto;
    color: #fff;
    text-align: center;
  }
`;

const Chatbox = styled.div`
  background: rgba(255, 255, 255, 0.05);
  width: 600px;
  height: 75%;
  border-radius: 0.2em;
  position: relative;
  box-shadow: 1px 1px 12px rgba(0, 0, 0, 0.1);

  &__messages {
    position: relative; /* .chatbox__messages 영역을 기준으로 삼각형을 배치하기 위해 position을 추가 */
    &:nth-of-type(odd) .chatbox__messages__user-message--ind-message {
      float: right;
      &:after {
        content: "";
        position: absolute;
        bottom: 0; /* .chatbox__messages__user-message--ind-message 영역의 아래쪽에 삼각형을 배치 */
        ${triangleMixin("rgba(255, 255, 255, 0.2)", 10, "left")} /* 왼쪽으로 삼각형 배치 */
      }
    }
    &:nth-of-type(even) .chatbox__messages__user-message--ind-message {
      float: left;
      &:after {
        content: "";
        position: absolute;
        bottom: 0; /* .chatbox__messages__user-message--ind-message 영역의 아래쪽에 삼각형을 배치 */
        ${triangleMixin("rgba(255, 255, 255, 0.2)", 10, "right")} /* 오른쪽으로 삼각형 배치 */
      }
    }
  }
`;


const Messages = () => {
  return (
    <MainContainer>
      <h1>Swanky Chatbox UI With React</h1>
      <Chatbox>
      <div className="chatbox__messages">
          {messages.map((message, index) => (
            <div key={index} className="chatbox__messages__user-message">
              <div className="chatbox__messages__user-message--ind-message">
                <p className="name">{message.Name}</p>
                <br />
                <p className="message">{message.Message}</p>
              </div>
            </div>
          ))}
        </div>
      </Chatbox>
    </MainContainer>
  );
};

export default Messages;



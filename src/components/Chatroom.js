import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import PropTypes from 'prop-types';

function Chatroom({ id, title, host, summary, tag, onClick }) {
  return (
    <StyledChatroom onClick={() => onClick(id)}>
      {/* <img src={coverImg} alt={title} className={styles.movie__img} /> */}
      <div>
        <StyledTitle>
          {title}
        </StyledTitle>
        <StyledHost>{host}</StyledHost>
        <p>{summary.length > 235 ? `${summary.slice(0, 235)}...` : summary}</p>
        <StyledTags>
          {tag}
        </StyledTags>
      </div>
    </StyledChatroom>
  );
}

Chatroom.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  summary: PropTypes.string.isRequired,
  tag: PropTypes.PropTypes.string.isRequired,
  host: PropTypes.string.isRequired
};

const StyledChatroom = styled.div`
background-color: white;
margin-bottom: 70px;
font-weight: 300;
padding: 20px;
border-radius: 5px;
color: #adaeb9;
display: grid;
grid-template-columns: minmax(150px, 1fr) 2fr;
grid-gap: 20px;
text-decoration: none;
color: inherit;
box-shadow: 0 13px 27px -5px rgba(50, 50, 93, 0.25),
  0 8px 16px -8px rgba(0, 0, 0, 0.3), 0 -6px 16px -6px rgba(0, 0, 0, 0.025);
  cursor: pointer;

  &:hover {
    box-shadow: 0 13px 27px -5px rgba(50, 50, 93, 0.25),
    0 8px 16px -8px rgba(0, 0, 0, 0.3), 0 -6px 16px -6px rgba(0, 0, 0, 0.025), 0 0 0 4px #ff0000;
  }
`;

const StyledTitle = styled.h2`
margin: 0;
font-weight: 300;
text-decoration: none;`;

const StyledHost = styled.h3`margin: 0;
font-weight: 300;
text-decoration: none;`;

const StyledTags = styled.ul`list-style: none;
padding: 0;
margin: 0;
display: flex;
flex-wrap: wrap;
margin: 5px 0px;`;



export default Chatroom;



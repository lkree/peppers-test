import React from "react";
import styled, {keyframes} from "styled-components";

const appeare = keyframes`
   0% {
        display: none;
        opacity: 0;
    }

    1% {
        display: block;
        opacity: 0;
    }

    100% {
        display: block;
        opacity: 1;
    }
`;


const PhotoWrapper = styled.div`
  position: absolute;
  animation: ${appeare} 1.5s ease infinite alternate;
  top: ${({y}) => y}px;
  left: ${({x}) => x}px;
  width: 44px;
  height: 44px;
  box-shadow: 0 0 0 5px #fff;
  &::after {
    content: '';
    width: 0;
    height: 0;
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    border-top: 12px solid #fff;
    position: absolute;
    bottom: -17px;
    left: calc(50% - 10px);
  }
`;

const Img = styled.img`
  max-width: 100%;
`;


export const Photo = ({src, coordinates: {x1, y1}}) => {
  return (
    <PhotoWrapper x={x1} y={y1}>
      <Img src={src} alt={''}/>
    </PhotoWrapper>
  )
};

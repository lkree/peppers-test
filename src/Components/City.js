import React from "react";
import styled from "styled-components";

const CityMarker = styled.div`
  position: absolute;
  top: ${({y}) => y}px;
  left: ${({x}) => x}px;
  width: 8px;
  height: 8px;
  background-color: yellow;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  &::before {
    content: '${({name}) => name}';
    font-size: 14px;
    background: #fff;
    position: absolute;
    top: -30px;
    white-space: nowrap;
    line-height: 21px;
    padding: 0 10px;
    opacity: 0;
    transition: all 0.5s ease;
  }
  &::after {
    content: '';
    width: 0;
    height: 0;
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    border-top: 10px solid #fff;
    position: absolute;
    bottom: 10px;
    left: calc(50% - 5px);
    opacity: 0;
    transition: all 0.5s ease;
  }
  &:hover {
    cursor: pointer;
      &::after {
        opacity: 1;
      }
      &::before {
        opacity: 1;
      }
  }
`;

const CityCore = styled.div`
  width: 30%;
  height: 30%;
  background: #fff;
  border-radius: 50%;
`;

export const City = ({name, ...rest}) => {
  return (
    <CityMarker name={name} {...rest}>
      <CityCore/>
    </CityMarker>
  );
};

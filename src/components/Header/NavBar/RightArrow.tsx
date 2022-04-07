import React from 'react';
import * as s from '../../../styles/button.styled';
import styled from 'styled-components';

// Don't need to add button, as screen readers
// will read element role
const RightButton = styled(s.Button).attrs({
  'aria-label': 'right',
})``;

//TODO: find way to keep svg from disappearing on rerender
const RightArrow: React.FC<{
  onClick?: React.MouseEventHandler<HTMLElement>;
}> = ({ onClick }) => {
  return (
    <RightButton onClick={onClick}>
      <svg
        version="1.1"
        id="Layer_1"
        xmlns="http://www.w3.org/2000/svg"
        x="0px"
        y="0px"
        viewBox="0 0 330.002 330.002"
      >
        <path
          id="XMLID_103_"
          fill="white"
          d="M233.252,155.997L120.752,6.001c-4.972-6.628-14.372-7.97-21-3c-6.628,4.971-7.971,14.373-3,21
	l105.75,140.997L96.752,306.001c-4.971,6.627-3.627,16.03,3,21c2.698,2.024,5.856,3.001,8.988,3.001
	c4.561,0,9.065-2.072,12.012-6.001l112.5-150.004C237.252,168.664,237.252,161.33,233.252,155.997z"
        />
        <g></g>
        <g></g>
        <g></g>
        <g></g>
        <g></g>
        <g></g>
        <g></g>
        <g></g>
        <g></g>
        <g></g>
        <g></g>
        <g></g>
        <g></g>
        <g></g>
        <g></g>
      </svg>
    </RightButton>
  );
};

export default RightArrow;

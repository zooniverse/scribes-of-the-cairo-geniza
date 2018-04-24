import styled from 'styled-components';

const FlippedImg = styled.img`
  right: ${props => (props.rtl ? 'auto' : '0')};
  left: ${props => (props.rtl ? '0' : 'auto')};
  transform: ${props => (props.rtl ? 'scaleX(-1)' : 'none')};
`;

export default FlippedImg;

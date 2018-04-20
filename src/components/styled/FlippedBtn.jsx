import styled from 'styled-components';

const FlippedBtn = styled.button`
  transform: ${props => (props.rtl ? 'scaleX(-1)' : 'none')};
`;

export default FlippedBtn;

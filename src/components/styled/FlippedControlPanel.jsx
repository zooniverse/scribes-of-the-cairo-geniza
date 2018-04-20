import styled from 'styled-components';

const FlippedControlPanel = styled.section`
  left: ${props => (props.rtl ? '0' : 'auto')};
  right: ${props => (props.rtl ? 'auto' : '0')};
`;

export default FlippedControlPanel;

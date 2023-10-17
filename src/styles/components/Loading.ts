import styled from 'styled-components';

const Loading = styled.div`
  width: 20px;
  height: 20px;
  --c: radial-gradient(farthest-side, #eee 92%, #0000);
  background: 
    var(--c) 50% 0,
    var(--c) 50% 100%,
    var(--c) 100% 50%,
    var(--c) 0    50%;
  background-size: 5px 5px;
  background-repeat: no-repeat;
  animation: loading 1s infinite;

  @keyframes loading { to { transform: rotate(.5turn) } }
`;

export { Loading };

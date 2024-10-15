import styled from 'styled-components';
import bgImage from '../assets/images/hero.png';
import { Box } from '@shopify/polaris';

export const ProductHeader = styled(Box)`
  width: 100%;
  height: auto;
  background-image: url(${bgImage});
  background-size: cover; /* Optional: to cover the entire area */
  background-position: center; /* Optional: to center the image */
`;

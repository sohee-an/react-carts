import styled from "styled-components";
import { AddShoppingCart } from "@material-ui/icons";
import { Badge } from "@material-ui/core";

export const Wrapper = styled.div`
  margin: 40px;
`;
export const StyledButton = styled.div`
  position: fixed;
  z-index: 90;
  right: 20px;
  top: 20px;
`;
export const BageCustom = styled(Badge)`
  z-index: 10000;
  position: relative;
  top: -10px;
`;

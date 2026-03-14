import styled from "styled-components";
import { Icono, ColorContent} from "../../index";
export function ItemsDesplegable({ item,funcion }) {
  return (
    <Container onClick={funcion}>
      <Icono>{item.icono}</Icono>
      <ColorContent $color={item.color} $alto="12px" $ancho="12px"/>
      <span>{item.text}</span>
    </Container>
  );
}
const Container = styled.div`
  cursor: pointer;
  padding: 8px;
  border-radius: 20px;
  display: flex;
  align-items: center;
  gap: 10px;

  &:hover {
    background-color: ${({ theme }) => theme.bg4};
  }
  svg {
    font-size: 28px;
    display: block;
  }
`;
import {
  Container,
  Details,
  Brand,
  Name,
  About,
  Rent,
  Period,
  Price,
  Type,
  CarImage,
} from "./styles";

import GasolineSvg from "../../assets/gasoline.svg";

interface CarProps {
  brand: string;
  name: string;
  about: {
    period: string;
    price: number;
  };
  thumbnail: string;
}

interface Props {
  data: CarProps;
}

export function Car({ data }: Props) {
  return (
    <Container>
      <Details>
        <Brand>{data.brand}</Brand>
        <Name>{data.name}</Name>

        <About>
          <Rent>
            <Period>{data.about.period}</Period>
            <Price>{`R$ ${data.about.price}`}</Price>
          </Rent>

          <Type>
            <GasolineSvg />
          </Type>
        </About>
      </Details>

      <CarImage resizeMode="contain" source={{ uri: data.thumbnail }} />
    </Container>
  );
}

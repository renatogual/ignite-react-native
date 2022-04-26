import { StatusBar, useWindowDimensions } from "react-native";
import { useTheme } from "styled-components";
import { useNavigation } from "@react-navigation/native";

import {
  Container,
  Content,
  Title,
  Message,
  Footer,
  ContainerButton,
} from "./styles";

import LogoSvg from "../../assets/logo_background_gray.svg";
import DoneSvg from "../../assets/done.svg";

import { Button } from "../../components/Button";

export function SchedulingComplete() {
  const { width } = useWindowDimensions();
  const theme = useTheme();
  const { navigate } = useNavigation<any>();

  function handleConfirmation() {
    navigate("Home");
  }

  return (
    <Container>
      <StatusBar
        barStyle="light-content"
        translucent
        backgroundColor="transparent"
      />
      <LogoSvg width={width} />

      <Content>
        <DoneSvg width={80} height={80} />
        <Title>Carro alugado!</Title>

        <Message>
          Agora você só precisa ir {"\n"}
          até a concessionária da RENTX {"\n"}
          pegar o seu automóvel.
        </Message>
      </Content>

      <Footer>
        <ContainerButton>
          <Button
            title="OK"
            color={theme.colors.shape_dark}
            onPress={handleConfirmation}
          />
        </ContainerButton>
      </Footer>
    </Container>
  );
}

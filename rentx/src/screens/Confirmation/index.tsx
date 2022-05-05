import { StatusBar, useWindowDimensions } from "react-native";
import { useTheme } from "styled-components";
import { useNavigation, useRoute } from "@react-navigation/native";

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

interface ParamsProps {
  title: string;
  message: string;
  nextScreen: string;
}

export function Confirmation() {
  const { width } = useWindowDimensions();
  const theme = useTheme();
  const { navigate } = useNavigation<any>();
  const { params } = useRoute();

  const { title, message, nextScreen } = params as ParamsProps;

  function handleConfirmation() {
    navigate(nextScreen);
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
        <Title>{title}</Title>

        <Message>{message}</Message>
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

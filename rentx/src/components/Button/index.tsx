import { RectButtonProps } from "react-native-gesture-handler";
import { ActivityIndicator } from "react-native";

import { Container, Title } from "./styles";

interface Props extends RectButtonProps {
  title: string;
  color?: string;
  enabled?: boolean;
  loading?: boolean;
}

export function Button({
  title,
  enabled = true,
  loading = false,
  ...rest
}: Props) {
  return (
    <Container
      enabled={enabled}
      style={{ opacity: enabled === false || loading === true ? 0.5 : 1 }}
      {...rest}
    >
      {loading ? <ActivityIndicator color="#fff" /> : <Title>{title}</Title>}
    </Container>
  );
}

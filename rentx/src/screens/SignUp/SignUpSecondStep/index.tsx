import { useNavigation, useRoute } from "@react-navigation/native";
import { useEffect, useState } from "react";
import {
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  StatusBar,
  TouchableWithoutFeedback,
} from "react-native";
import { useTheme } from "styled-components";
import * as Yup from "yup";

import { BackButton } from "../../../components/BackButton";
import { Bullet } from "../../../components/Bullet";
import { Button } from "../../../components/Button";
import { PasswordInput } from "../../../components/PasswordInput";

import {
  Container,
  Header,
  Steps,
  SubTitle,
  Title,
  Form,
  FormTitle,
} from "./styles";

interface ParamsProps {
  user: {
    name: string;
    email: string;
    driverLicense: string;
  };
}

export function SignUpSecondStep() {
  const { goBack, navigate } = useNavigation<any>();
  const { params } = useRoute();
  const theme = useTheme();

  const { user } = params as ParamsProps;

  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  function handleBack() {
    goBack();
  }

  async function handleRegister() {
    try {
      const schema = Yup.object().shape({
        password: Yup.string().required("Senha obrigatória"),
        passwordConfirm: Yup.string()
          .oneOf([Yup.ref("password"), null], "Senhas não conferem")
          .required("Confirmação de senha obrigatória"),
      });

      await schema.validate({ password, passwordConfirm });

      const data = {
        title: "Conta criada!",
        message: `Agora é só fazer login\ne aproveitar.`,
        nextScreen: "SignIn",
      };

      navigate("Confirmation", data);
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        Alert.alert("Opa", error.message);
      }
    }
  }

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => setKeyboardVisible(true)
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => setKeyboardVisible(false)
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  return (
    <KeyboardAvoidingView behavior="position" enabled>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Container>
          <StatusBar
            barStyle="dark-content"
            backgroundColor="transparent"
            translucent
          />
          <Header>
            <BackButton onPress={handleBack} />
            <Steps>
              <Bullet />
              <Bullet active />
            </Steps>
          </Header>

          {isKeyboardVisible ? <Title /> : <Title>Crie sua{"\n"}conta</Title>}
          <SubTitle>
            Faça seu cadastro de {"\n"}
            forma rápida e fácil.
          </SubTitle>

          <Form>
            <FormTitle>2. Senha</FormTitle>

            <PasswordInput
              iconName="lock"
              placeholder="Senha"
              onChangeText={setPassword}
              value={password}
            />
            <PasswordInput
              iconName="lock"
              placeholder="Repetir senha"
              onChangeText={setPasswordConfirm}
              value={passwordConfirm}
            />
          </Form>

          <Button
            title="Cadastrar"
            color={theme.colors.success}
            onPress={handleRegister}
          />
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

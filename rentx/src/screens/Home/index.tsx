import { StatusBar } from "expo-status-bar";
import { RFValue } from "react-native-responsive-fontsize";

import { CarList, Container, Header, HeaderContent, TotalCars } from "./styles";

import Logo from "../../assets/logo.svg";

import { Car } from "../../components/Car";

export function Home() {
  const CarData = {
    brand: "Ferrari",
    name: "F40",
    about: {
      period: "Ao dia",
      price: 120,
    },
    thumbnail:
      "https://img2.gratispng.com/20180816/paa/kisspng-ferrari-s-p-a-car-ferrari-488-enzo-ferrari-ferrari-png-free-png-images-toppng-5b75fbb0461eb8.4406679715344588002872.jpg",
  };

  return (
    <Container>
      <StatusBar style="light" backgroundColor="transparent" translucent />
      <Header>
        <HeaderContent>
          <Logo width={RFValue(108)} height={RFValue(12)} />
          <TotalCars>Total de 12 carros</TotalCars>
        </HeaderContent>
      </Header>

      <CarList
        data={[1, 2, 3, 4, 5]}
        keyExtractor={(item) => String(item)}
        renderItem={({ item }) => <Car data={CarData} />}
      />
    </Container>
  );
}

import styled from "styled-components/native";
import { LinearGradient } from "expo-linear-gradient";

export const Wrapper = styled.View`
  background: #000;
  flex: 1;
`;

export const Header = styled(LinearGradient)`
  height: 280px;
`;

export const HeaderContainer = styled.SafeAreaView`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const Title = styled.Text`
  color: #fff;
  font-size: 12px;
  font-weight: bold;
`;

export const BalanceContainer = styled.View`
  margin: 5px 0;
  flex-direction: row;
  align-items: center;
`;

export const Value = styled.Text`
  font-size: 34px;
  color: #fff;
  font-weight: 200;
`;

export const Bold = styled.Text`
  font-weight: bold;
`;

export const EyeButton = styled.TouchableOpacity`
  margin-left: 10px;
`;

export const Info = styled.Text`
  color: #fff;
  font-size: 12px;
  font-weight: bold;
`;

export const Actions = styled.View`
  flex-direction: row;
  margin-top: 40px;
`;

export const Action = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border: 1px solid rgba(255, 255, 255, 0.6);
  width: 150px;
  height: 45px;
  border-radius: 25px;
  margin: 0 10px;
`;

export const ActionLabel = styled.Text`
  font-size: 12px;
  color: #fff;
  margin-left: 10px;
`;

export const UseBalance = styled.View`
  background: #1c1c1e;
  height: 60px;
  flex-direction: row;
  padding: 0 16px;
  align-items: center;
  justify-content: space-between;
`;

export const UseBalanceTitle = styled.Text`
  color: #fff;
  font-size: 12px;
  font-weight: 500;
`;

export const PaymentMethods = styled.View`
  margin-top: 25px;
  padding: 0 14px;
`;

export const PaymentMethodsTitle = styled.Text`
  color: #8e8e93;
  font-size: 12px;
  text-transform: uppercase;
`;

export const Card = styled.View`
  background: #404040;
  padding: 20px;
  border-radius: 10px;
  margin-top: 10px;
  elevation: 1;
  width: 90%;
  align-self: center;
  height: 130px;
`;

export const CardBody = styled.View`
  flex-direction: row;
  margin-top: -10px;
`;

export const CardDetails = styled.View`
  flex: 1;
  margin-right: 40px;
`;

export const CardTitle = styled.Text`
  font-size: 14px;
  font-weight: bold;
  color: #fff;
`;

export const CardInfo = styled.Text`
  font-size: 15px;
  color: #fff;
  margin-top: 15px;
  font-weight: 600;
`;

export const Img = styled.Image`
  width: 100px;
  height: 100px;
  border-radius: 10px;
`;

export const AddButton = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  margin-top: 5px;
`;

export const AddLabel = styled.Text`
  color: #fff;
  font-size: 14px; ,
  font-weight: bold;
  margin-left: 15px;
`;

export const UseTicketContainer = styled.View`
  align-items: center;
  margin-top: 25px;
`;

export const UseTicketButton = styled.TouchableOpacity`
  flex-direction: row;
`;

export const UseTicketLabel = styled.Text`
  color: #fff;
  font-size: 14px;
  font-weight: bold;
  margin-left: 15px;
  text-decoration-line: underline;
`;

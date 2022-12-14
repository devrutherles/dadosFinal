import styled from "styled-components/native";

export const Container = styled.ScrollView.attrs({
  horizontal: true,

  showsHorizontalScrollIndicator: false,
  contentContainerStyle: {
    paddinLeft: 16,
  },
})`
  margin-top: 20px;
`;

export const Option = styled.TouchableOpacity`
  background: ${({ bgColor }) => bgColor};
  width: 130px;
  height: 180px;
  border-radius: 8px;
  padding: 15px;
  justify-content: space-between;
  margin-right: 16px;
`;

export const Title = styled.Text`
  color: #fff;
  font-size: 12px;
  font-weight: bold;
`;
export const SubTitle = styled.Text`
  color: #fff;
  font-size: 12px;
  font-weight: bold;
`;
export const Img = styled.Image`
  align-self: center;
`;

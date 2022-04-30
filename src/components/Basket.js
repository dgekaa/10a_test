import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { Colors } from "../constants";
import { basketActions } from "../store/basket";

const Container = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.1);
    opacity: ${({ isOpened }) => (isOpened ? `1` : `0`)};
    transition: 1s ease opacity;
    visibility: ${({ isOpened }) => (isOpened ? `visible` : `hidden`)};
  `,
  InnerContainer = styled.div`
    transform: ${({ isOpened }) =>
      isOpened ? `translateX(0)` : `translateX(105%)`};
    transition: 1s ease all;
    position: fixed;
    top: 0;
    right: 0;
    width: 530px;
    background: #fff;
    border-radius: 10px 0 0 10px;
    box-shadow: 0 0 5px ${Colors.gray};
    padding: 20px 10px 20px 20px;
    @media (max-width: 768px) {
      width: 95%;
    }
  `,
  CloseBtn = styled.div`
    height: 30px;
    width: 30px;
    cursor: pointer;
    position: relative;
    &::before {
      position: absolute;
      content: "";
      width: 24px;
      height: 4px;
      top: 12px;
      left: 3px;
      background: black;
      transform: rotate(45deg);
    }
    &::after {
      position: absolute;
      content: "";
      width: 24px;
      height: 4px;
      top: 12px;
      left: 3px;
      background: black;
      transform: rotate(-45deg);
    }
  `,
  Product = styled.div`
    display: flex;
    border: 1px solid ${Colors.gray};
    border-radius: 10px;
    height: 120px;
    padding: 10px;
    margin-top: 10px;
    align-items: center;
  `,
  Img = styled.div`
    width: 116px;
    height: 100px;
    margin: 0 auto;
    background-image: ${({ src }) => `url(${src})`};
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center center;
  `,
  Description = styled.div`
    padding: 10px;
    display: flex;
    flex-direction: column;
    flex: 2;
  `,
  Name = styled.div`
    font-size: 16px;
    color: ${Colors.green};
    margin-bottom: 5px;
    max-width: 200px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    @media (max-width: 768px) {
      max-width: 150px;
    }
  `,
  Desc = styled.div`
    font-size: 12px;
    color: ${Colors.dark};
  `,
  DescRow = styled.div`
    display: flex;
    justify-content: space-between;
    font-weight: bold;
    span {
      font-weight: normal;
    }
  `,
  Edit = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
  `,
  FirstPrise = styled.div`
    margin: 5px 0;
    text-align: right;
    text-decoration: line-through;
    color: ${Colors.orange};
    font-size: 13px;
    color: ${({ isPromotional }) => !isPromotional && "#fff"};
  `,
  SecondPrise = styled.div`
    text-align: right;
    color: ${Colors.green};
    font-size: 18px;
  `,
  AddDelete = styled.div`
    display: flex;
    font-size: 11px;
    align-items: center;
    justify-content: flex-end;
  `,
  TextInput = styled.input`
    outline: none;
    border: 1px solid ${Colors.dark};
    border-radius: 10px;
    width: 30px;
    margin: 0 5px;
    text-align: center;
  `,
  DeleteBtn = styled.div`
    cursor: pointer;
  `,
  CarImg = styled.div`
    display: inline-block;
    width: 20px;
    height: 14px;
    background-image: url(${process.env.PUBLIC_URL}/img/car.png);
    background-repeat: no-repeat;
    background-size: cover;
    margin-right: 5px;
    position: relative;
    top: 2px;
  `,
  CommonInfo = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
  `,
  FreeDelivery = styled.div`
    color: ${Colors.gray};
  `,
  Sum = styled.div`
    text-align: right;
    margin-top: 10px;
    font-size: 25px;
    color: ${Colors.green};
  `;

export const Basket = () => {
  const dispatch = useDispatch();
  const { productsInBasket, isOpened } = useSelector((state) => state.basket);

  const [sum, setSum] = useState(0);

  const closeBasket = () => {
      dispatch(basketActions.openBasket(false));
    },
    changeText = (id, count) => {
      count < 100 && dispatch(basketActions.changrProductsCount({ id, count }));
    },
    deleteProduct = (id) => {
      dispatch(basketActions.deleteFromBasket(id));
    },
    onBlurHandler = (id, count) => {
      !+count && dispatch(basketActions.changrProductsCount({ id, count: 1 }));
    };

  useEffect(() => {
    let sum = 0;
    Object.keys(productsInBasket).forEach((product) => {
      sum += productsInBasket[product].price * productsInBasket[product].count;
    });
    setSum(sum);
  }, [productsInBasket]);

  return (
    <>
      <Container isOpened={isOpened}></Container>
      <InnerContainer isOpened={isOpened}>
        <CloseBtn onClick={closeBasket} />
        {Object.keys(productsInBasket).map((product, i) => (
          <Product key={productsInBasket[product].name}>
            <Img src={productsInBasket[product].imageUrl} />
            <Description>
              <Name>{product.name}</Name>
              <Desc>
                <DescRow>
                  Typ myszki: <span>{productsInBasket[product].type}</span>
                </DescRow>
                <DescRow>
                  Sensor: <span>{productsInBasket[product].sensor}</span>
                </DescRow>
              </Desc>
            </Description>
            <Edit>
              <FirstPrise
                isPromotional={productsInBasket[product].promotionalPrice}
              >
                {("" + productsInBasket[product].promotionalPrice).replace(
                  ".",
                  ","
                ) || productsInBasket[product].price}{" "}
                zł
              </FirstPrise>

              <SecondPrise>
                {("" + productsInBasket[product].price).replace(".", ",")} zł
              </SecondPrise>

              <AddDelete>
                szt
                <TextInput
                  type="number"
                  value={productsInBasket[product].count}
                  onChange={(e) => changeText(product, e.target.value)}
                  onBlur={() =>
                    onBlurHandler(product, productsInBasket[product].count)
                  }
                />
                <DeleteBtn onClick={() => deleteProduct(product)}>
                  del
                </DeleteBtn>
              </AddDelete>
            </Edit>
          </Product>
        ))}

        {!Object.keys(productsInBasket).length &&
          "W koszyku nie ma jeszcze produktów"}

        {!!sum && (
          <CommonInfo>
            <FreeDelivery>
              {sum > 100 && (
                <>
                  <CarImg />
                  Darmowa dostawa
                </>
              )}
            </FreeDelivery>

            <Sum>{sum.toFixed(2)} zł</Sum>
          </CommonInfo>
        )}
      </InnerContainer>
    </>
  );
};

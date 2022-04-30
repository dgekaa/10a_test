import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
import { useDispatch } from "react-redux";
import { Colors } from "../constants";
import { basketActions } from "../store/basket";

const show = keyframes`
  from {
    opacity:0
  }
  to {
    opacity:1;
  }
`;

const Container = styled.div`
    display: flex;
    width: calc(25% - 38px);
    margin: 0 50px 30px 0;
    box-shadow: 2px 2px 6px #00000029;
    border-radius: 10px;
    float: left;
    overflow: hidden;
    flex-direction: column;
    padding: 20px;
    &:nth-child(4n + 4) {
      margin-right: 0;
    }
    @media (max-width: 1060px) {
      margin: 0 30px 30px 0;
      width: calc(25% - 23px);
    }
    @media (max-width: 900px) {
      &:nth-child(4n + 4) {
        margin-right: 30px;
      }
      &:nth-child(3n + 3) {
        margin-right: auto;
      }
      width: calc(33.3% - 20px);
    }
    @media (max-width: 680px) {
      margin: 0 10px 10px 0;
      &:nth-child(4n + 4) {
        margin-right: 10px;
      }
      &:nth-child(3n + 3) {
        margin-right: 10px;
      }
      &:nth-child(2n + 2) {
        margin-right: 0;
      }
      width: calc(50% - 5px);
    }
    @media (max-width: 440px) {
      margin: 0 10px 10px 0;
      &:nth-child(4n + 4) {
        margin-right: 0;
      }
      &:nth-child(3n + 3) {
        margin-right: 0;
      }
      &:nth-child(2n + 2) {
        margin-right: 0;
      }
      width: 100%;
    }
  `,
  Img = styled.div`
    width: 100%;
    height: 139px;
    margin: 0 auto;
    background-image: ${({ src }) => `url(${src})`};
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center center;
  `,
  ProductName = styled.div`
    color: ${Colors.green};
    font-family: Rubik, sans-serif;
    text-align: center;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    margin: 10px 0;
    font-size: 20px;
  `,
  Description = styled.div`
    display: flex;
    font-size: 11px;
    justify-content: space-between;
    color: ${Colors.dark};
    margin-bottom: 5px;
    font-family: Arial, sans-serif;
  `,
  Label = styled.div`
    font-weight: bold;
  `,
  Name = styled.div``,
  FirstPrise = styled.div`
    margin: 5px 0;
    text-align: right;
    text-decoration: line-through;
    color: ${Colors.orange};
    font-size: 15px;
    color: ${({ isPromotional }) => !isPromotional && "#fff"};
  `,
  SecondPrise = styled.div`
    text-align: right;
    color: ${Colors.green};
    font-size: 20px;
  `,
  FreeDelivery = styled.div`
    margin-top: 10px;
    color: ${Colors.gray};
    font-size: 11px;
    text-align: center;
    font-family: Arial, sans-serif;
    height: 30px;
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
  ToBasket = styled.div`
    margin-top: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 30px;
    background-color: ${Colors.green};
    color: #fff;
    border-radius: 20px 0 20px 0;
    font-size: 12px;
    cursor: pointer;
    position: relative;
    animation: ${show} 0.5s linear;
  `,
  AddBtn = styled.div`
    width: 20px;
    height: 20px;
    border-radius: 50%;
    border: 2px solid #fff;
    position: relative;
    right: 10px;
    &::before {
      position: absolute;
      content: "";
      width: 12px;
      height: 2px;
      top: 7px;
      left: 2px;
      background: #fff;
    }
    &::after {
      position: absolute;
      content: "";
      width: 12px;
      height: 2px;
      top: 7px;
      left: 2px;
      background: #fff;
      transform: rotate(90deg);
    }
  `;

export const Product = ({ product, index }) => {
  const dispatch = useDispatch();

  const [isHovered, setIsHovered] = useState(false);

  const mouseEnterHandler = () => {
      setIsHovered(true);
    },
    mouseLeaveHandler = () => {
      setIsHovered(false);
    },
    addToBasket = (index) => {
      dispatch(basketActions.addToBasket({ product, index }));
    };

  return (
    <Container
      onMouseEnter={mouseEnterHandler}
      onMouseLeave={mouseLeaveHandler}
    >
      <Img src={product.imageUrl} />
      <ProductName>{product.name}</ProductName>
      <Description>
        <Label>Typ myszki:</Label>
        <Name>{product.type}</Name>
      </Description>
      <Description>
        <Label>Sensor:</Label>
        <Name>{product.sensor}</Name>
      </Description>
      <FirstPrise isPromotional={product.promotionalPrice}>
        {("" + product.promotionalPrice).replace(".", ",") || product.price} zł
      </FirstPrise>
      <SecondPrise>{("" + product.price).replace(".", ",")} zł</SecondPrise>

      <FreeDelivery>
        {isHovered ? (
          <ToBasket onClick={() => addToBasket(index)}>
            <AddBtn />
            dodaj do koszyka
          </ToBasket>
        ) : (
          <>
            <CarImg />
            Darmowa dostawa od 100 złotych
          </>
        )}
      </FreeDelivery>
    </Container>
  );
};

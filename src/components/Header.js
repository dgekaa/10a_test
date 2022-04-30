import React from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { Basket, Logo } from "../svg";
import { Colors } from "../constants";
import { basketActions } from "../store/basket";

const Container = styled.div`
    display: flex;
    width: 100%;
    height: 85px;
    align-items: center;
    justify-content: space-between;
    @media (max-width: 768px) {
      width: 100%;
    }
  `,
  BasketContainer = styled.div`
    width: 42px;
    height: 36px;
    margin-right: 10px;
    margin-top: 14px;
    cursor: pointer;
    position: relative;
  `,
  ProductCount = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 11px;
    color: #fff;
    width: 20px;
    height: 20px;
    background-color: ${Colors.green};
    position: absolute;
    right: -10px;
    bottom: -10px;
    border-radius: 50%;
  `;

export const Header = () => {
  const dispatch = useDispatch();
  const { productsInBasket } = useSelector((state) => state.basket);

  const basketClick = () => {
    dispatch(basketActions.openBasket(true));
  };

  return (
    <Container>
      {Logo(101, 50)}
      <BasketContainer onClick={basketClick}>
        {Basket(42, 36)}
        {!!Object.keys(productsInBasket).length && (
          <ProductCount>{Object.keys(productsInBasket).length}</ProductCount>
        )}
      </BasketContainer>
    </Container>
  );
};

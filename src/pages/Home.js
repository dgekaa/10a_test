import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { Header, Product } from "../components";
import { products } from "../products.json";
import { Colors } from "../constants";
import { Basket } from "../components/Basket";

const Container = styled.div`
    max-width: 1366px;
    margin: 0 auto;
    @media (max-width: 1386px) {
      width: calc(100% - 20px);
      margin: 0 10px;
    }
  `,
  Products = styled.div`
    display: inline-block;
    width: 100%;
    margin-top: 30px;
  `,
  NavigationBar = styled.div`
    font-size: 15px;
    text-transform: uppercase;
    margin-top: 40px;
    color: ${Colors.gray};
  `,
  LastBar = styled.span`
    color: ${Colors.green};
  `,
  Line = styled.div`
    background-color: ${Colors.gray};
    display: inline-block;
    width: 25px;
    height: 1.5px;
    margin: 0 5px 5px 5px;
  `;

export const Home = () => {
  const { isOpened } = useSelector((state) => state.basket);

  useEffect(() => {
    if (isOpened) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isOpened]);

  return (
    <Container>
      <Header />
      <NavigationBar>
        produkty <Line /> akcesoria <Line /> <LastBar>myszki</LastBar>
      </NavigationBar>
      <Products>
        {products.map((product, index) => (
          <Product key={product.name} product={product} index={index} />
        ))}
      </Products>
      <Basket />
    </Container>
  );
};

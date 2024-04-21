import React from "react";
import { Link } from "react-router-dom";
import { Container, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import { FaHome } from "react-icons/fa";
import {
  ErrorWrapper,
  ErrorRow,
  Column1,
  Column2,
  TextWrapper,
  Description,
  ImgWrap,
  Img,
} from "./ErrorElements";
import error404 from "./Error404.svg";

const NotFoundView = () => {
  return (
    <Container maxWidth="100%">
      <ErrorWrapper>
        <ErrorRow>
          <Column1>
            <TextWrapper>
              <Typography align="center" variant="h3">
                404: Page Not Found!
              </Typography>
              <Description>
                You didn't break the internet, but we can't find what you are
                looking for.
              </Description>
              <Link to="/" style={{ textDecoration: "none" }}>
                <Button variant="container" startIcon={<FaHome />}>
                  Go to Home
                </Button>
              </Link>
            </TextWrapper>
          </Column1>
          <Column2>
            <ImgWrap>
              <Img src={error404} />
            </ImgWrap>
          </Column2>
        </ErrorRow>
      </ErrorWrapper>
    </Container>
  );
};

export default NotFoundView;

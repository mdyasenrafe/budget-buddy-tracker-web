import { Container } from "@/components/atoms";
import { Row, Col } from "antd";
import { TProps } from "@/types";
import React, { Suspense } from "react";
import { LeftSideBar } from "./components";
import { BottomNavBar } from "../BottomNavBar";

export const CommonLayout: React.FC<TProps> = ({ children }) => {
  return (
    <Suspense>
      <Container>
        <Row>
          <Col xs={0} lg={4}>
            <LeftSideBar />
          </Col>
          <Col xs={24} lg={20} className="border-r">
            <main>{children}</main>
          </Col>

          <Col xs={24} lg={0}>
            <BottomNavBar />
          </Col>
        </Row>
      </Container>
    </Suspense>
  );
};

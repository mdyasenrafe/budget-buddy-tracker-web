import { Container } from "@/components/atoms";
import { Row, Col } from "antd";
import { TProps } from "@/types";
import React, { Suspense } from "react";
import { LeftSideBar } from "./components";
import { BottomNavBar } from "../BottomNavBar";
import { DashboardNavbar } from "../DashbaordNavbar";

export const CommonLayout: React.FC<TProps> = ({ children }) => {
  return (
    <Suspense>
      <Row>
        <Col xs={0} lg={5} xl={4} xxl={3}>
          <LeftSideBar />
        </Col>
        <Col xs={24} lg={19} xl={20} xxl={21}>
          <DashboardNavbar />
          <Container>
            <main>{children}</main>
          </Container>
        </Col>

        <Col xs={24} lg={0}>
          <BottomNavBar />
        </Col>
      </Row>
    </Suspense>
  );
};

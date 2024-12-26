import React from "react";
import { Row, Col } from "antd";
import { Container } from "@/components/atoms";

type SignupLayoutProps = {
  children: React.ReactNode;
};

export const SignupLayout: React.FC<SignupLayoutProps> = ({ children }) => {
  return (
    <div className="bg-gray-50 w-full">
      <Row>
        <Col
          xs={24}
          lg={12}
          className="bg-[#2F7E79] w-full !min-h-screen justify-center items-center !hidden lg:!flex"
        >
          <img
            alt="Signup Illustration"
            src="/assets/images/signup.png"
            className="w-[90%] h-[80%]"
          />
        </Col>
        <Col xs={24} lg={12} className="py-8 !flex flex-col justify-center">
          <Container>{children}</Container>
        </Col>
      </Row>
    </div>
  );
};

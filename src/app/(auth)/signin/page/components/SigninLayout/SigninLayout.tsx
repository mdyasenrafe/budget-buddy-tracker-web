import React from "react";
import { Row, Col } from "antd";

type SigninLayoutProps = {
  children: React.ReactNode;
};

export const SigninLayout: React.FC<SigninLayoutProps> = ({ children }) => {
  return (
    <div className="w-full">
      <Row>
        <Col
          xs={24}
          lg={12}
          className="bg-[#2F7E79] w-full h-screen  justify-center items-center !hidden lg:!flex"
        >
          <img
            alt="Login Illustration"
            src="/assets/images/login.png"
            className="w-[90%] h-[80%]"
          />
        </Col>
        <Col xs={24} lg={12} className="p-8 !flex flex-col justify-center">
          {children}
        </Col>
      </Row>
    </div>
  );
};

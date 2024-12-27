import React from "react";
import { Text } from "@/components/atoms";
import { Row, Col } from "antd";
import { CallToAction } from "./components/CallToAction";

export const LandingPage = () => {
  return (
    <div className="!min-h-screen bg-gray-50 flex items-center justify-center px-6">
      <Row align="middle" className="max-w-screen-lg w-full mt-8">
        <Col xs={24} lg={12} className="text-center lg:text-left">
          <Text variant="h1" className="text-green-700 mb-4">
            Take Control of Your Finances
          </Text>
          <Text variant="body" className="text-lg text-gray-700 mb-8">
            With Budget Buddy Tracker, you can track expenses, set budgets, and
            reach your financial goals—all in one place.
          </Text>

          <CallToAction />
        </Col>

        <Col xs={24} lg={12} className="flex justify-center">
          <img
            src="assets/images/landing_page.png"
            alt="Finance Tracking Illustration"
            className="max-w-full h-auto"
          />
        </Col>
      </Row>
    </div>
  );
};

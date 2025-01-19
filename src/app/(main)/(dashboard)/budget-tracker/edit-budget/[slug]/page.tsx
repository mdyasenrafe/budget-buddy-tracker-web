import React from "react";
import { EditBudgetPage } from "./page/EditBudgetPage";

type Props = {
  params: {
    slug: string;
  };
};

const page: React.FC<Props> = ({ params }) => {
  return <EditBudgetPage budgetId={params?.slug} />;
};

export default page;

import React from "react";
import { EditCardPage } from "./page/EditCardPage";

type Props = {
  params: {
    slug: string;
  };
};

const page: React.FC<Props> = ({ params }) => {
  return <EditCardPage cardId={params?.slug} />;
};

export default page;

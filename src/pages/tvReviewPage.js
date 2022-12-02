import React from "react";
import { useLocation } from "react-router-dom";
import PageTemplate from "../components/tvComponents/templateTVPage";
import TVReview from "../components/tvComponents/tvReview";

const TVReviewPage = (props) => {
  let location = useLocation();
  const {TV, review} = location.state;
  return (
    <PageTemplate TV={TV}>
      <TVReview review={review} />
    </PageTemplate>
  );
};

export default TVReviewPage;
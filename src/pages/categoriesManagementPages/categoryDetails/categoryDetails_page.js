import React, { useEffect } from "react";
import { connect } from "react-redux";
import PageContainer from "../../../components/pageContainer/pageContainer";
import * as actions from "../../../actions/categoriesManagementActions/categoryDetailsPage-actions";
import { Grid, Form, Segment } from "semantic-ui-react";
import CategoryData from "./categoryData/categoryData";
import TopMenu from "./topMenu/topMenu";
const CategoryDetails_Page = (props) => {
  useEffect(() => {
    props.dispatch(actions.fetchInitialData(props.categoryID));
    return () => {
      props.dispatch({ type: "reset-categoryDetailsPage_reducer" });
    };
  }, []);
  return (
    <PageContainer loading={props.isLoading}>
      <TopMenu categoryID={props.categoryID} />
      <Form>
        <Segment>
          <Grid stackable columns={"three"}>
            <Grid.Row>
              <CategoryData categoryDetails={props.categoryDetails} />
            </Grid.Row>
          </Grid>
        </Segment>
      </Form>
    </PageContainer>
  );
};

export default connect(({ categoryDetailsPage_reducer }, props) => {
  const categoryDetails = categoryDetailsPage_reducer.categoryDetails;
  const normalizedCategoryDetails = categoryDetails && {
    id: {
      value: categoryDetails.Id,
      label: "المعرف",
    },
    name: {
      value: categoryDetails.Name,
      label: "الإسم",
    },
    nameEn: {
      value: categoryDetails.NameEn,
      label: "الإسم باللغة الإنجليزية",
    },
    rank: {
      value: categoryDetails.Rank,
      label: "التصنيف",
    },
    createdDate: {
      value: categoryDetails.CreatedDate,
      label: "تاريخ الإنشاء",
    },
    createdBy: {
      value: categoryDetails.CreatedBy.Name,
      label: "تم الإنشاء من قبل",
      link: `/managers/${categoryDetails.CreatedBy.Id}`,
    },
  };
  return {
    categoryDetails: normalizedCategoryDetails,
    isLoading: categoryDetailsPage_reducer.isLoading,
    categoryID: props.match.params.categoryID,
  };
})(CategoryDetails_Page);

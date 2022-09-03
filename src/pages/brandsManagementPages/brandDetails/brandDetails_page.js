import React, { useEffect } from "react";
import { connect } from "react-redux";
import PageContainer from "../../../components/pageContainer/pageContainer";
import * as actions from "../../../actions/brandsManagementActions/brandDetailsPage-actions";
import { Grid, Form, Segment, Image, Label } from "semantic-ui-react";
import BrandData from "./brandData/brandData";
import { baseURIImage } from "../../../config";
import TopMenu from "./topMenu/topMenu";

const BrandDetails_Page = (props) => {
  useEffect(() => {
    props.dispatch(actions.fetchInitialData(props.brandID));
    return () => {
      props.dispatch({ type: "reset-brandDetailsPage_reducer" });
    };
  }, []);
  return (
    <PageContainer loading={props.isLoading}>
      <Label style={{ background: "transparent" }} size={"big"}>
        <Image
          spaced={"right"}
          size={"massive"}
          src={
            !props.isLoading
              ? `${baseURIImage}/img/brands/100x100/${props.brandImagePath}`
              : undefined
          }
        />
        {props.brandDetails?.name.value}
      </Label>
      <TopMenu brandID={props.brandID} />
      <Form>
        <Segment>
          <Grid stackable columns={"three"}>
            <Grid.Row>
              <BrandData brandDetails={props.brandDetails} />
            </Grid.Row>
          </Grid>
        </Segment>
      </Form>
    </PageContainer>
  );
};

export default connect(({ brandDetailsPage_reducer }, props) => {
  const brandDetails = brandDetailsPage_reducer.brandDetails;
  const normalizedBrandDetails = brandDetails && {
    id: {
      value: brandDetails.Id,
      configs: {
        readOnly: true,
        label: "المعرف:",
      },
    },
    name: {
      value: brandDetails.Name,
      configs: {
        readOnly: true,
        label: "الإسم:",
      },
    },
    nameEn: {
      value: brandDetails.NameEn,
      configs: {
        dir: "ltr",
        readOnly: true,
        label: "الإسم باللغة الإنجليزية:",
      },
    },
    shortDescription: {
      value: brandDetails.ShortDescription,
      configs: {
        readOnly: true,
        label: "وصف مصغر عربي:",
      },
    },
    longDescription: {
      value: brandDetails.LongDescription,
      configs: {
        readOnly: true,
        label: "وصف مطول عربي:",
      },
    },
    shortDescriptionEn: {
      value: brandDetails.ShortDescriptionEn,
      configs: {
        dir: "ltr",
        readOnly: true,
        label: "وصف مصغر إنجليزي:",
      },
    },
    longDescriptionEn: {
      value: brandDetails.LongDescriptionEn,
      configs: {
        dir: "ltr",
        readOnly: true,
        label: "وصف مطول إنجليزي:",
      },
    },
    URL: {
      value: brandDetails.URL,
      configs: {
        dir: "ltr",
        readOnly: true,
        label: "عنوان الموقع الإلكتروني:",
      },
    },
    isAvailable: {
      value: !brandDetails.IsAvailable
        ? "غير ظاهر للمستخدمين"
        : "ظاهر للمستخدمين",
      configs: {
        readOnly: true,
        label: "الحالة:",
      },
    },
    createdDate: {
      value: brandDetails.CreatedDate,
      configs: {
        dir: "ltr",
        readOnly: true,
        label: "تاريخ الإنشاء:",
      },
    },
    createdBy: {
      value: brandDetails.CreatedBy.Name,
      link: `/managers/${brandDetails.CreatedBy.Id}`,
      configs: {
        dir: "ltr",
        readOnly: true,
        label: "تمت الإضافة من قبل:",
      },
    },
    subscriptionBrands: {
      value: brandDetails.SubscriptionBrands,
      readOnly: true,
      label: "الإعدادات",
    },
  };
  return {
    brandDetails: normalizedBrandDetails,
    brandImagePath: brandDetailsPage_reducer.brandDetails?.ImagePath,
    isLoading: brandDetailsPage_reducer.isLoading,
    brandID: props.match.params.brandID,
  };
})(BrandDetails_Page);

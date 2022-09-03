import React, { useEffect } from "react";
import { connect } from "react-redux";
import PageContainer from "../../../components/pageContainer/pageContainer";
import * as actions from "../../../actions/denominationsManagementActions/denominationDetailsPage-actions";
import { Grid, Form, Segment } from "semantic-ui-react";
import DenominationData from "./denominationData/denominationData";
const DenominationDetails_Page = (props) => {
  useEffect(() => {
    props.dispatch(actions.fetchInitialData(props.denominationID));
    return () => {
      props.dispatch({ type: "reset-denominationDetailsPage_reducer" });
    };
  }, []);
  return (
    <PageContainer loading={props.isLoading}>
      <Form>
        <Segment>
          <Grid stackable columns={"three"}>
            <Grid.Row>
              <DenominationData
                denominationDetails={props.denominationDetails}
              />
            </Grid.Row>
          </Grid>
        </Segment>
      </Form>
    </PageContainer>
  );
};

export default connect(({ denominationDetailsPage_reducer }, props) => {
  const denominationDetails =
    denominationDetailsPage_reducer.denominationDetails;
  const normalizedDenominationDetails = denominationDetails && {
    id: {
      value: denominationDetails.Id,
      configs: {
        readOnly: true,
        label: "المعرف:",
      },
    },
    cardName: {
      value: denominationDetails.CardName,
      configs: {
        readOnly: true,
        label: "الإسم باللغة العربية:",
      },
    },
    cardNameEn: {
      value: denominationDetails.CardNameEn,
      configs: {
        dir: "ltr",
        readOnly: true,
        label: "الإسم باللغة الإنجليزية:",
      },
    },
    shortName: {
      value: denominationDetails.ShortName,
      configs: {
        readOnly: true,
        label: "اسم مصغر عربي:",
      },
    },
    shortNameEn: {
      value: denominationDetails.ShortNameEn,
      configs: {
        readOnly: true,
        dir: "ltr",
        label: "اسم مصغر إنجليزي:",
      },
    },
    minimumQuantityLimit: {
      value: denominationDetails.MinimumQuantityLimit,
      configs: {
        dir: "ltr",
        readOnly: true,
        label: "الحد الأدنى للكمية:",
      },
    },
    maximumQuantityLimit: {
      value: denominationDetails.MaximumQuantityLimit,
      configs: {
        dir: "ltr",
        readOnly: true,
        label: "الحد الأعلى للكمية:",
      },
    },
    supplyLimit: {
      value: denominationDetails.SupplyLimit,
      configs: {
        dir: "ltr",
        readOnly: true,
        label: "حد وجوب التوريد:",
      },
    },
    brand: {
      value: denominationDetails.Brand.Name,
      link: `/brands/${denominationDetails.Brand.Id}`,
      configs: {
        dir: "ltr",
        readOnly: true,
        label: "العلامة التجارية:",
      },
    },
    region: {
      value: denominationDetails.Region.Name,
      link: `#`,
      configs: {
        dir: "ltr",
        readOnly: true,
        label: "المنطقة:",
      },
    },
    isAvailable: {
      value: !denominationDetails.IsAvailable
        ? "غير ظاهر للمستخدمين"
        : "ظاهر للمستخدمين",
      configs: {
        readOnly: true,
        label: "الحالة:",
      },
    },
    createdDate: {
      value: denominationDetails.CreatedDate,
      configs: {
        dir: "ltr",
        readOnly: true,
        label: "تاريخ الإنشاء:",
      },
    },
    createdBy: {
      value: denominationDetails.CreatedBy.Name,
      link: `/managers/${denominationDetails.CreatedBy.Id}`,
      configs: {
        dir: "ltr",
        readOnly: true,
        label: "تمت الإضافة من قبل:",
      },
    },
  };
  return {
    denominationDetails: normalizedDenominationDetails,
    denominationImagePath:
      denominationDetailsPage_reducer.denominationDetails?.ImagePath,
    isLoading: denominationDetailsPage_reducer.isLoading,
    denominationID: props.match.params.denominationID,
  };
})(DenominationDetails_Page);

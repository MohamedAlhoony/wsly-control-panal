import React, { useEffect } from "react";
import * as actions from "../../../actions/pricingPlansManagementActoins/pricingPlansPage-actions";
import { connect } from "react-redux";
import { Segment, Button, Table, Loader } from "semantic-ui-react";
import debounce from "lodash.debounce";
import PageContainer from "../../../components/pageContainer/pageContainer";
import TopMenu from "./topMenu/topMenu";
import PricingPlansTableItems from "./pricingPlansTableItems/pricingPlansTableItems";
import ConfirmDialog from "../../../components/confirmDialog/confirmDialog";
import { confirmDialog } from "../../../actions/layout-actions";
let wrappingFunction = null;
const _debouncedFetching = debounce(() => {
  wrappingFunction();
}, 700);
const PricingPlans_Page = (props) => {
  useEffect(() => {
    let controller = new AbortController();
    let signal = controller.signal;
    props.dispatch(actions.fetchInitialData(signal));
    return () => {
      props.dispatch({ type: "reset-pricingPlansPage_reducer" });
      controller.abort();
    };
  }, []);
  const handleTopMenuChange = (value, meta) => {
    props.dispatch({ type: `pricingPlansPage-${meta.id}`, data: value });

    if (meta.id === "search") {
      if (value.trim() !== props.search.trim()) {
        _debouncedFetching();
      }
    } else {
      wrappingFunction();
    }
  };

  wrappingFunction = () => {
    props.dispatch(actions.isLoadingPricingPlans(true));
    props.dispatch({
      type: "pricingPlansPage-nextTo",
      data: 0,
    });
    if (!props.showLoadingMoreBtn) {
      props.dispatch(actions.showLoadingMoreBtn(true));
    }
    props
      .dispatch(actions.getPricingPlans())
      .then(() => {
        props.dispatch(actions.isLoadingPricingPlans(false));
      })
      .catch(() => {
        props.dispatch(actions.isLoadingPricingPlans(false));
      });
  };
  const confimredRemovePricingPlan = (plan) => {
    props.dispatch(actions.removePricingPlan(plan));
  };
  let confirmedFunction;
  const removePricingPlan = (plan) => {
    confirmedFunction = () => {
      confimredRemovePricingPlan(plan);
    };
    props.dispatch(
      confirmDialog({
        show: true,
        body: [
          <span key={0}> أنت على وشك حذف خطة التسعير</span>,
          <strong key={1}>{plan.Name}, </strong>,
          <span key={2}>هل انت متأكد من تنفيذ هذا الإجراء؟</span>,
        ],
      })
    );
  };
  const confimredExecutePricingPlan = (plan) => {
    props.dispatch(actions.executePricingPlan(plan));
  };
  const executePricingPlan = (plan) => {
    confirmedFunction = () => {
      confimredExecutePricingPlan(plan);
    };
    props.dispatch(
      confirmDialog({
        show: true,
        body: [
          <span key={0}> أنت على وشك تنفيذ خطة التسعير</span>,
          <strong key={1}>{plan.Name}, </strong>,
          <span key={2}>
            الذي يترتب عنها تغيير كافة أسعار الفئات المدرجة في الخطة, هل أنت
            متأكد من تنفيذ هذا الإجراء؟
          </span>,
        ],
      })
    );
  };
  return (
    <PageContainer loading={props.isLoading}>
      <ConfirmDialog onConfirm={(_) => confirmedFunction(_)} />

      <TopMenu
        isLoadingPricingPlans={props.isLoadingPricingPlans}
        handleTopMenuChange={handleTopMenuChange}
        search={props.search}
        order={props.order}
      />
      {!props.isLoadingPricingPlans ? (
        <Table striped celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>معرف الخطة</Table.HeaderCell>
              <Table.HeaderCell>اسم الخطة</Table.HeaderCell>
              {/* <Table.HeaderCell>الحالة</Table.HeaderCell> */}
              <Table.HeaderCell>تاريخ الإضافة</Table.HeaderCell>
              <Table.HeaderCell>أضيف من قبل</Table.HeaderCell>
              <Table.HeaderCell></Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            <PricingPlansTableItems
              executePricingPlan={executePricingPlan}
              removePricingPlan={removePricingPlan}
              pricingPlans={props.pricingPlans}
            />
          </Table.Body>
          {props.pricingPlans.length > props.numOfResults - 1 ||
          props.pricingPlans.length === 0 ? (
            <Table.Footer>
              <Table.Row>
                <Table.HeaderCell colSpan={6}>
                  {props.pricingPlans.length > props.numOfResults - 1 &&
                  props.showLoadingMoreBtn ? (
                    !props.isLoadingPricingPlans ? (
                      <Button
                        fluid
                        loading={props.isLoadingMore}
                        disabled={props.isLoadingMore ? true : false}
                        onClick={() => {
                          props.dispatch(actions.loadMore());
                        }}
                      >
                        {!props.isLoadingMore ? "عرض المزيد" : <Loader />}
                      </Button>
                    ) : null
                  ) : props.pricingPlans.length !== 0 ? (
                    <span style={{ color: "GrayText" }}>
                      &lt;&lt;&lt; نهاية &gt;&gt;&gt;
                    </span>
                  ) : !props.isLoadingPricingPlans ? (
                    <span>لايوجد نتائج</span>
                  ) : null}
                </Table.HeaderCell>
              </Table.Row>
            </Table.Footer>
          ) : null}
        </Table>
      ) : (
        <Segment basic loading={true} />
      )}
    </PageContainer>
  );
};

export default connect(({ pricingPlansPage_reducer }) => {
  return {
    order: pricingPlansPage_reducer.order,
    search: pricingPlansPage_reducer.search,
    pricingPlans: pricingPlansPage_reducer.pricingPlans,
    showLoadingMoreBtn: pricingPlansPage_reducer.showLoadingMoreBtn,
    isLoading: pricingPlansPage_reducer.isLoading,
    isLoadingMore: pricingPlansPage_reducer.isLoadingMore,
    isLoadingPricingPlans: pricingPlansPage_reducer.isLoadingPricingPlans,
    numOfResults: pricingPlansPage_reducer.numOfResults,
  };
})(PricingPlans_Page);

import React, { useEffect } from "react";
import * as actions from "../../../actions/denominationsManagementActions/denominationsPage-actions";
import { connect } from "react-redux";
import {
  Segment,
  Button,
  Table,
  Loader,
  Step,
  Image,
  Label,
} from "semantic-ui-react";
import { Link } from "react-router-dom";
import debounce from "lodash.debounce";
import PageContainer from "../../../components/pageContainer/pageContainer";
import TopMenu from "./topMenu/topMenu";
import DenominationsTableItems from "./denominationsTableItems/denominationsTableItems";
import { baseURIImage } from "../../../config";
let wrappingFunction = null;
const _debouncedFetching = debounce(() => {
  wrappingFunction();
}, 700);
const Denominations_page = (props) => {
  useEffect(() => {
    let controller = new AbortController();
    let signal = controller.signal;
    props.dispatch(actions.fetchInitialData(props.brandID, signal));
    return () => {
      props.dispatch({ type: "reset-denominationsPage_reducer" });
      controller.abort();
    };
  }, []);
  const handleTopMenuChange = (value, meta) => {
    props.dispatch({ type: `denominationsPage-${meta.id}`, data: value });

    if (meta.id === "search") {
      if (value.trim() !== props.search.trim()) {
        _debouncedFetching();
      }
    } else {
      wrappingFunction();
    }
  };

  wrappingFunction = () => {
    props.dispatch(actions.isLoadingDenominations(true));
    props.dispatch({
      type: "denominationsPage-nextTo",
      data: 0,
    });
    if (!props.showLoadingMoreBtn) {
      props.dispatch(actions.showLoadingMoreBtn(true));
    }
    props
      .dispatch(actions.getDenominations(props.brandID))
      .then(() => {
        props.dispatch(actions.isLoadingDenominations(false));
      })
      .catch(() => {
        props.dispatch(actions.isLoadingDenominations(false));
      });
  };

  return (
    <PageContainer loading={props.isLoading}>
      <Label as={Link} to={`/brands/${props.brandID}`} tag size={"big"}>
        <Image
          spaced={"right"}
          avatar
          size={"massive"}
          src={
            !props.isLoading
              ? `${baseURIImage}/img/brands/100x100/${props.brandImagePath}`
              : undefined
          }
        />
        {props.brandName}
      </Label>
      <TopMenu
        brandID={props.brandID}
        isLoadingDenominations={props.isLoadingDenominations}
        handleTopMenuChange={handleTopMenuChange}
        search={props.search}
        order={props.order}
      />
      {!props.isLoadingDenominations ? (
        <Table striped celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>المعرف</Table.HeaderCell>
              <Table.HeaderCell>اسم الفئة</Table.HeaderCell>
              <Table.HeaderCell>الحد الأدنى للكمية</Table.HeaderCell>
              <Table.HeaderCell>الحد الأقصى للكمية</Table.HeaderCell>
              <Table.HeaderCell>حد وجوب التوريد</Table.HeaderCell>
              <Table.HeaderCell>الحالة</Table.HeaderCell>
              <Table.HeaderCell>تاريخ الإضافة</Table.HeaderCell>
              <Table.HeaderCell>أضيف من قبل</Table.HeaderCell>
              <Table.HeaderCell></Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            <DenominationsTableItems
              brandID={props.brandID}
              denominations={props.denominations}
            />
          </Table.Body>
          {props.denominations.length > props.numOfResults - 1 ||
          props.denominations.length === 0 ? (
            <Table.Footer>
              <Table.Row>
                <Table.HeaderCell colSpan={9}>
                  {props.denominations.length > props.numOfResults - 1 &&
                  props.showLoadingMoreBtn ? (
                    !props.isLoadingDenominations ? (
                      <Button
                        fluid
                        loading={props.isLoadingMore}
                        disabled={props.isLoadingMore ? true : false}
                        onClick={() => {
                          props.dispatch(actions.loadMore(props.brandID));
                        }}
                      >
                        {!props.isLoadingMore ? "عرض المزيد" : <Loader />}
                      </Button>
                    ) : null
                  ) : props.denominations.length !== 0 ? (
                    <span style={{ color: "GrayText" }}>
                      &lt;&lt;&lt; نهاية &gt;&gt;&gt;
                    </span>
                  ) : !props.isLoadingDenominations ? (
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

export default connect(({ denominationsPage_reducer }, props) => {
  return {
    order: denominationsPage_reducer.order,
    search: denominationsPage_reducer.search,
    denominations: denominationsPage_reducer.denominations,
    showLoadingMoreBtn: denominationsPage_reducer.showLoadingMoreBtn,
    isLoading: denominationsPage_reducer.isLoading,
    isLoadingMore: denominationsPage_reducer.isLoadingMore,
    isLoadingDenominations: denominationsPage_reducer.isLoadingDenominations,
    numOfResults: denominationsPage_reducer.numOfResults,
    brandID: props.match.params.brandID,
    brandName: denominationsPage_reducer.brandDetails?.Name,
    brandImagePath: denominationsPage_reducer.brandDetails?.ImagePath,
  };
})(Denominations_page);

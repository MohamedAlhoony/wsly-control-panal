import React, { useEffect } from "react";
import * as actions from "../../../actions/categoryBrandsManagementActions/categoryBrandsPage-actions";
import { connect } from "react-redux";
import { Segment, Button, Table, Loader, Label } from "semantic-ui-react";
import debounce from "lodash.debounce";
import PageContainer from "../../../components/pageContainer/pageContainer";
import TopMenu from "./topMenu/topMenu";
import CategoryBrandsTableItems from "./categoryBrandsTableItems/categoryBrandsTableItems";
import { Link } from "react-router-dom";
import ConfirmDialog from "../../../components/confirmDialog/confirmDialog";
import { confirmDialog } from "../../../actions/layout-actions";
import AddBrandToCategoryModal from "./addBrandToCategoryModal/addBrandToCategoryModal";
let wrappingFunction = null;
const _debouncedFetching = debounce(() => {
  wrappingFunction();
}, 700);
const CategoryBrands_Page = (props) => {
  useEffect(() => {
    let controller = new AbortController();
    let signal = controller.signal;
    props.dispatch(actions.fetchInitialData(props.categoryID, signal));
    return () => {
      props.dispatch({ type: "reset-categoryBrandsPage_reducer" });
      controller.abort();
    };
  }, []);
  const handleTopMenuChange = (value, meta) => {
    props.dispatch({ type: `categoryBrandsPage-${meta.id}`, data: value });

    if (meta.id === "search") {
      if (value.trim() !== props.search.trim()) {
        _debouncedFetching();
      }
    } else {
      wrappingFunction();
    }
  };

  wrappingFunction = () => {
    props.dispatch(actions.isLoadingCategoryBrands(true));
    props.dispatch({
      type: "categoryBrandsPage-nextTo",
      data: 0,
    });
    if (!props.showLoadingMoreBtn) {
      props.dispatch(actions.showLoadingMoreBtn(true));
    }
    props
      .dispatch(actions.getCategoryBrands(props.categoryID))
      .then(() => {
        props.dispatch(actions.isLoadingCategoryBrands(false));
      })
      .catch(() => {
        props.dispatch(actions.isLoadingCategoryBrands(false));
      });
  };
  const confirmedRemoveBrand = (brand) => {
    props.dispatch(actions.removeBrand(props.categoryID, brand));
  };
  const closeAddBrandToCategoryModal = () => {
    props.dispatch(actions.resetAddBrandToCategoryModalState());
  };
  const handleAddBrandToCategoryButtonClick = () => {
    props.dispatch(actions.addBrandToCategoryModal({ show: true }));
    props.dispatch(
      actions.getAvailableBrandsToAddToACategory(props.categoryID)
    );
  };

  let confirmedFunction;
  const removeBrand = (brand) => {
    confirmedFunction = () => {
      confirmedRemoveBrand(brand);
    };
    props.dispatch(
      confirmDialog({
        show: true,
        body: [
          <span key={0}>
            هل أنت متأكد من رغبتك في حذف العلامة التجارية{" "}
            <strong>{brand.Name} </strong>من الصنف{" "}
            <strong>{props.categoryName}</strong>؟
          </span>,
        ],
      })
    );
  };
  const handleSelectInputChange = (event) => {
    const brand = props.addBrandToCategoryModal.availableToAddBrands.find(
      (item) => item.Id === event.value
    );
    props.dispatch(actions.addBrandToCategoryModalSelectedBrand_brand(brand));
  };
  const confirmSubmitCateogryBrand = () => {
    props.dispatch(actions.submitCateogryBrand(props.categoryID));
  };
  const submitCateogryBrand = () => {
    confirmedFunction = () => {
      confirmSubmitCateogryBrand();
    };
    props.dispatch(
      confirmDialog({
        show: true,
        body: [
          <span key={0}>
            هل أنت متأكد من رغبتك في إضافة العلامة التجارية{" "}
            <strong>{props.selectedBrandName}</strong> إلى الصنف{" "}
            <strong>{props.categoryName} ؟</strong>
          </span>,
        ],
      })
    );
  };
  return (
    <PageContainer loading={props.isLoading}>
      <ConfirmDialog onConfirm={(_) => confirmedFunction(_)} />
      <AddBrandToCategoryModal
        submitCateogryBrand={submitCateogryBrand}
        handleSelectInputChange={handleSelectInputChange}
        addBrandToCategoryModal={props.addBrandToCategoryModal}
        closeAddBrandToCategoryModal={closeAddBrandToCategoryModal}
        categoryName={props.categoryName}
      />
      <Label
        icon={"database"}
        content={props.categoryName}
        as={Link}
        to={`/categories/${props.categoryID}`}
        tag
        size={"big"}
      />
      <TopMenu
        handleAddBrandToCategoryButtonClick={
          handleAddBrandToCategoryButtonClick
        }
        isLoadingCategoryBrands={props.isLoadingCategoryBrands}
        handleTopMenuChange={handleTopMenuChange}
        search={props.search}
        order={props.order}
      />
      {!props.isLoadingCategoryBrands ? (
        <Table striped celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>المعرف</Table.HeaderCell>
              <Table.HeaderCell>اسم العلامة التجارية</Table.HeaderCell>
              <Table.HeaderCell>الحالة</Table.HeaderCell>
              <Table.HeaderCell>تاريخ الإضافة</Table.HeaderCell>
              <Table.HeaderCell>أضيف من قبل</Table.HeaderCell>
              <Table.HeaderCell></Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            <CategoryBrandsTableItems
              removeBrand={removeBrand}
              categoryBrands={props.categoryBrands}
            />
          </Table.Body>
          {props.categoryBrands.length > props.numOfResults - 1 ||
          props.categoryBrands.length === 0 ? (
            <Table.Footer>
              <Table.Row>
                <Table.HeaderCell colSpan={7}>
                  {props.categoryBrands.length > props.numOfResults - 1 &&
                  props.showLoadingMoreBtn ? (
                    !props.isLoadingCategoryBrands ? (
                      <Button
                        fluid
                        loading={props.isLoadingMore}
                        disabled={props.isLoadingMore ? true : false}
                        onClick={() => {
                          props.dispatch(actions.loadMore(props.categoryID));
                        }}
                      >
                        {!props.isLoadingMore ? "عرض المزيد" : <Loader />}
                      </Button>
                    ) : null
                  ) : props.categoryBrands.length !== 0 ? (
                    <span style={{ color: "GrayText" }}>
                      &lt;&lt;&lt; نهاية &gt;&gt;&gt;
                    </span>
                  ) : !props.isLoadingCategoryBrands ? (
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

export default connect(({ categoryBrandsPage_reducer }, props) => {
  return {
    order: categoryBrandsPage_reducer.order,
    search: categoryBrandsPage_reducer.search,
    categoryBrands: categoryBrandsPage_reducer.categoryBrands,
    showLoadingMoreBtn: categoryBrandsPage_reducer.showLoadingMoreBtn,
    isLoading: categoryBrandsPage_reducer.isLoading,
    isLoadingMore: categoryBrandsPage_reducer.isLoadingMore,
    isLoadingCategoryBrands: categoryBrandsPage_reducer.isLoadingCategoryBrands,
    numOfResults: categoryBrandsPage_reducer.numOfResults,
    categoryID: props.match.params.categoryID,
    categoryName: categoryBrandsPage_reducer.categoryDetails?.Name,
    addBrandToCategoryModal: categoryBrandsPage_reducer.addBrandToCategoryModal,
    selectedBrandName:
      categoryBrandsPage_reducer.addBrandToCategoryModal.selectBrandInput.brand
        ?.Name,
  };
})(CategoryBrands_Page);

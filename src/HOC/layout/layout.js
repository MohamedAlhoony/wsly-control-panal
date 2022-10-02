import React, { useEffect, useRef, useState } from "react";
import { Icon, Ref, Menu, Sidebar, Dropdown } from "semantic-ui-react";
import styles from "./styles.module.css";
import * as actions from "../../actions/layout-actions";
import AlertModal from "../../components/alertModal/alertModal";
import { withRouter } from "react-router-dom";
import MovingSideBar from "../../components/sidebar/sidebar";
import auth from "../../auth";
import { connect } from "react-redux";
import RefreshDialog from "../../components/refreshDialog/refreshDialog";
const Layout = (props) => {
  const [isToggleAllowed, setIsToggleAllowed] = useState(true);
  useEffect(() => {
    props.history.listen(() => {
      if (props.isRefreshDialogVisible) {
        props.dispatch(actions.refreshDialogVisible(false));
      }
      if (props.alertModal.show) {
        props.dispatch(actions.alertModal({ show: false }));
      }
    });
    // window.addEventListener("resize", handeWindowWidthResize, false);
    // return () => {
    //   window.removeEventListener("resize", handeWindowWidthResize);
    // };
  }, [props.alertModal]);
  const emptyRef = useRef(null);
  // const handeWindowWidthResize = () => {
  //   if (window.innerWidth < 900) {
  //     setIsToggleAllowed(true);
  //   } else {
  //     setIsToggleAllowed(false);
  //   }
  // };
  const closeAlertModal = () => {
    props.dispatch(actions.alertModal({ show: false }));
  };
  const setIsSideBarOpen = (isOpen) => {
    props.dispatch(actions.isSideBarOpen(isOpen));
  };
  const handleRefreshPress = (isVisible) => {
    props.dispatch(actions.refreshDialogVisible(isVisible));
    document.location.reload();
  };
  return (
    <>
      <AlertModal
        closeAlertModal={closeAlertModal}
        alertModal={props.alertModal}
      />
      <RefreshDialog
        handleRefreshPress={handleRefreshPress}
        visible={props.isRefreshDialogVisible}
      />
      <MovingSideBar
        isToggleAllowed={isToggleAllowed}
        emptyRef={emptyRef}
        isSideBarOpen={isToggleAllowed ? props.isSideBarOpen : true}
        setIsSideBarOpen={setIsSideBarOpen}
      />
      <Sidebar.Pusher>
        <Menu attached={"top"} className={styles.header}>
          {isToggleAllowed ? (
            <Menu.Item
              icon={<Icon name={"bars"} />}
              onClick={() =>
                props.dispatch(actions.isSideBarOpen(!props.isSideBarOpen))
              }
            />
          ) : null}
          <Menu.Menu position={"right"}>
            <Dropdown item icon={<Icon name={"angle down"} fitted />}>
              <Dropdown.Menu>
                <Dropdown.Item
                  onClick={() => {
                    auth.logout(() => {
                      props.history.push("/login");
                      props.dispatch({
                        type: "reset-app",
                      });
                    });
                  }}
                  text={"تسجيل خروج"}
                  icon={"log out"}
                />
              </Dropdown.Menu>
            </Dropdown>
          </Menu.Menu>
          <Ref innerRef={emptyRef}>
            <div></div>
          </Ref>
        </Menu>
        {props.children}
      </Sidebar.Pusher>
    </>
  );
};

export default connect(({ layout_reducer }) => {
  return {
    alertModal: layout_reducer.alertModal,
    isSideBarOpen: layout_reducer.isSideBarOpen,
    isRefreshDialogVisible: layout_reducer.isRefreshDialogVisible,
  };
})(withRouter(Layout));

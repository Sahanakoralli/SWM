import React from "react";
import Dustbin from "./Dustbin";
import DustbinTablet from "./DustbinTable";
import CustomDialog from "../helper/CustomDialog";
import DeleteDustbinDialog from "../helper/DeleteDustbinDialog";
import Navigation from "../admin/Navigation";

const DustbinList = () => {
  return (
    <>
      {/* <Dustbin /> */}
      {/* <Navigation /> */}
      <DustbinTablet />

      {/* <DeleteDustbinDialog binId={"BIN_001"} /> */}
    </>
  );
};

export default DustbinList;

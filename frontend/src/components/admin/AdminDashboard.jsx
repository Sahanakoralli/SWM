// import AddUserForm from "../components/AddUserForm";

import { Box } from "@chakra-ui/react";
import DustbinList from "../pages/DustbinList";
import AddDustbinForm from "./AddDustbinForm";
import Navigation from "./Navigation";
import MapProvider from "../maps/MapProvider";
import RouteCalulator from "../maps/RouteCalulator";
import UserList from "./UserList";
import UserDialog from "../helper/UserDialog";

export default function AdminDashboard() {
  return (
    <Box>
      {/* <Navigation /> */}
      {/* <DustbinList /> */}
      <MapProvider />
      {/* <RouteCalulator /> */}
      {/* <UserList /> */}
      {/* <UserDialog /> */}
    </Box>
  );
}

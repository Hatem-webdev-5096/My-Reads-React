import Tabs from "@mui/joy/Tabs";
import TabList from "@mui/joy/TabList";
import Tab, { tabClasses } from "@mui/joy/Tab";

import { useState } from "react";


const ActionTabs = (props) => {

    const [activeTab, setActiveTab] = useState("Login");

    const onLoginClick = () => {
        setActiveTab("Login");
        props.setShownFormToLogin();
    };

    const onSignupClick = () => {
        setActiveTab("Signup");
        props.setShownFormToSignup();
    };

  return (
    <Tabs aria-label="tabs" defaultValue={0}>
      <TabList
        variant="plain"
        sx={{
          "--List-padding": "0px",
          "--List-radius": "0px",
          "--ListItem-minHeight": "48px",
          [`& .${tabClasses.root}`]: {
            boxShadow: "none",
            fontWeight: "md",
            [`&.${tabClasses.selected}::before`]: {
              content: '""',
              display: "block",
              position: "absolute",
              left: "var(--ListItem-paddingLeft)", // change to `0` to stretch to the edge.
              right: "var(--ListItem-paddingRight)", // change to `0` to stretch to the edge.
              bottom: 0,
              height: 3,
              bgcolor: "primary.400",
            },
          },
        }}
      >
        <Tab onClick={onLoginClick}>Login</Tab>
        <Tab onClick={onSignupClick}>Signup</Tab>
      </TabList>
    </Tabs>
  );
};

export default ActionTabs;

import {
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Tab,
  TabIndicator,
} from "@chakra-ui/react";
import React, {useEffect} from 'react';
import Login from "../components/Authentication/Login";
import Signup from "../components/Authentication/Signup";
import { useNavigate } from "react-router-dom";
import "./styles.css";

const Homepage = () => {

  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userInfo"));

    if (user) navigate("/chats");
  }, [navigate]);

  return (
    <section>
        <div className="leaves">
            <div className="set">
                <div><img src={require("./Images/leaf_01.png")} alt=""/></div>
                <div><img src={require("./Images/leaf_02.png")} alt=""/></div>
                <div><img src={require("./Images/leaf_03.png")} alt=""/></div>
                <div><img src={require("./Images/leaf_04.png")} alt=""/></div>
                <div><img src={require("./Images/leaf_01.png")} alt=""/></div>
                <div><img src={require("./Images/leaf_02.png")} alt=""/></div>
                <div><img src={require("./Images/leaf_03.png")} alt=""/></div>
                <div><img src={require("./Images/leaf_04.png")} alt=""/></div>
            </div>
        </div>
        <img src={require("./Images/bg.jpg")} alt="" className="bg"/>
        <img src={require("./Images/girl.png")} alt="" className="girl"/>
        <img src={require("./Images/trees.png")} alt="" className="trees"/>
        <div className="login" >
        <Tabs position="relative" variant="unstyled">
            <TabList>
              <Tab width="50%"><h2>Log In</h2></Tab>
              <Tab width="50%"><h2>Sign Up</h2></Tab>
            </TabList>
            <TabIndicator
              mt="-1.5px"
              height="2px"
              bg="blue.500"
              borderRadius="1px"
            />
            <TabPanels>
              <TabPanel>
                <Login />
              </TabPanel>
              <TabPanel>
                <Signup />
              </TabPanel>
            </TabPanels>
          </Tabs>
      </div>
    </section>
  )
}

export default Homepage
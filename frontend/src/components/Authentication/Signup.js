import { Button } from "@chakra-ui/button";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/input";
import { VStack } from "@chakra-ui/layout";
import { useColorModeValue } from "@chakra-ui/react";
import { useToast } from "@chakra-ui/toast";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router";

const Signup = () => {
  const [showP, setShowP] = useState(false);
  const [showC, setShowC] = useState(false);
  const handleClickP = () => setShowP(!showP);
  const handleClickC = () => setShowC(!showC);
  
  const toast = useToast();
  const navigate = useNavigate();

  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [confirmpassword, setConfirmpassword] = useState();
  const [password, setPassword] = useState();
  const [pic, setPic] = useState();
  const [picLoading, setPicLoading] = useState(false);

  const sub_btn = useColorModeValue('#00B5D8', '#6B46C1');
  const txt = useColorModeValue('#1A202C', '#171923');

  const submitHandler = async () => {
    setPicLoading(true);
    if (!name || !email || !password || !confirmpassword) {
      toast({
        title: "Please Fill all the Feilds",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setPicLoading(false);
      return;
    }
    if (password !== confirmpassword) {
      toast({
        title: "Passwords Do Not Match",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }
    console.log(name, email, password, pic);
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const { data } = await axios.post(
        `/api/user`,
        {
          name,
          email,
          password,
          pic,
        },
        config
      );
      console.log(data);
      toast({
        title: "Registration Successful",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      localStorage.setItem("userInfo", JSON.stringify(data));
      setPicLoading(false);
      navigate("/chats");
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: error.response.data.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setPicLoading(false);
    }
  };

  const postDetails = (pics) => {
    setPicLoading(true);
    if (pics === undefined) {
      toast({
        title: "Please Select an Image!",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }
    console.log(pics);
    if (pics.type === "image/jpeg" || pics.type === "image/png") {
      const data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", "TalkZone");
      data.append("cloud_name", "harshk0056");
      fetch("https://api.cloudinary.com/v1_1/harshk0056/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          setPic(data.url.toString());
          console.log(data.url.toString());
          setPicLoading(false); 
        })
        .catch((err) => {
          console.log(err);
          setPicLoading(false);
        });
    } else {
      toast({
        title: "Please Select an Image!",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setPicLoading(false);
      return;
    }
  };

  return (
      <VStack spacing="5px">
      <FormControl id="first-name" isRequired>
        <FormLabel color={txt}>Name</FormLabel>
        <Input
          color={txt}
          borderColor="#4A5568"
          focusBorderColor="#DD6B20"
          _placeholder={{color: '#DD6B20'}}
          placeholder="Enter Your Name"
          onChange={(e) => setName(e.target.value)}
        />
      </FormControl>
      <FormControl id="new-email" isRequired>
        <FormLabel color={txt}>Email Address</FormLabel>
        <Input
          color={txt}
          borderColor="#4A5568"
          focusBorderColor="#DD6B20"
          _placeholder={{color: '#DD6B20'}}
          type="email"
          placeholder="Enter Your Email Address"
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormControl>
      <FormControl id="new-password" isRequired>
        <FormLabel color={txt}>Password</FormLabel>
        <InputGroup size="md">
          <Input
            color={txt}
            borderColor="#4A5568"
            focusBorderColor="#DD6B20"
            _placeholder={{color: '#DD6B20'}}
            type={showP ? "text" : "password"}
            placeholder="Enter Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <InputRightElement width="4.5rem">
            <Button bg="#ED8936" color={txt} h="1.75rem" size="sm" onClick={handleClickP}>
              {showP ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <FormControl id="confirm-password" isRequired>
        <FormLabel color={txt}>Confirm Password</FormLabel>
        <InputGroup size="md">
          <Input
            color={txt}
            borderColor="#4A5568"
            focusBorderColor="#DD6B20"
            _placeholder={{color: '#DD6B20'}}
            type={showC ? "text" : "password"}
            placeholder="Confirm password"
            onChange={(e) => setConfirmpassword(e.target.value)}
          />
          <InputRightElement width="4.5rem">
            <Button bg="#ED8936" color={txt} h="1.75rem" size="sm" onClick={handleClickC}>
              {showC ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <FormControl id="pic">
        <FormLabel color={txt}>Upload your Picture</FormLabel>
        <Input
          color={txt}
          borderColor="#4A5568"
          focusBorderColor="#DD6B20"
          _placeholder={{color: '#DD6B20'}}
          type="file"
          p={1.5}
          accept="image/*"
          onChange={(e) => postDetails(e.target.files[0])}
        />
      </FormControl>
      <Button
        _hover={{}}
        bg={sub_btn}
        width="100%"
        style={{ marginTop: 15 }}
        onClick={submitHandler}
        isLoading={picLoading}
      >
        Sign Up
      </Button>
    </VStack>
  );
};

export default Signup;

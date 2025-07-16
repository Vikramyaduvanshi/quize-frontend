import { useRef, useState } from "react";
import { Button, Input, HStack } from "@chakra-ui/react";
import { api } from "../Util/api"; 

export function Createtopics({ setflag,setagainfetch }) {
let inputref=useRef()
  async function handlesubmit(e) {
    e.preventDefault(); 
    if (!inputref.current.value.trim()) return; 
    let res= await api.post("/topics", { name:inputref.current.value });
    setagainfetch((pre)=> !pre)
    setflag((pre) => !pre); 
     
  }
console.log("create topic rendring")

  return (
    <>
      <HStack w="full" maxW="sm">
        <Input ref={inputref}
        border="1px solid black"
          _placeholder={{ color: "inherit" }}
          
          name="name"
          
          flex="1"
          placeholder="Enter topic name"
          css={{ "--focus-color": "lime" }}
        />
        <Button onClick={handlesubmit} bg="bg.subtle" variant="outline">
          Create
        </Button>
      </HStack>
    </>
  );
}

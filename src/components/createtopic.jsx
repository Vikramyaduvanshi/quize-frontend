import { useRef, useState } from "react";
import { Button, Input, HStack } from "@chakra-ui/react";
import { api } from "../Util/api"; 

export function Createtopics({ setflag,setagainfetch }) {
  const [name, settopic] = useState("");
  const timerid = useRef(null);

  async function handlesubmit(e) {
    e.preventDefault(); 
    if (!name.trim()) return; 
    let res= await api.post("/topics", { name });
  
    setagainfetch((pre)=> !pre)
    setflag((pre) => !pre); 
    settopic(""); 

  }

  function handlechannge(e) {
    clearTimeout(timerid.current);
    let { value } = e.target;
    timerid.current = setTimeout(() => {
      settopic(value);
    }, 500); 
  }

  return (
    <>
      <HStack w="full" maxW="sm">
        <Input 
        border="1px solid black"
          _placeholder={{ color: "inherit" }}
          onChange={handlechannge}
          name="name"
          value={name}
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

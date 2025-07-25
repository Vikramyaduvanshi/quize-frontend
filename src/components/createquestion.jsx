import { useRef, useState } from "react";
import { Button, Input, VStack } from "@chakra-ui/react";
import { api } from "../Util/api"; 

export function Creaquestion({ topicid ,settopicid}) {
  const [questiondata, setquestion] = useState({question:"", answer:'', difficulty:""});


  async function handlesubmit(e) {
    e.preventDefault(); 
console.log("handle submit", questiondata)
  let res=  await api.post(`/questions/${topicid}`, questiondata);
  if(res.data.success){
    alert("question uploaded successfully")
  }else{
    alert(res.data.message)
  }
    settopicid(null);   
  }

  function handlechannge(e) {
    let { value,name } = e.target;  
  
 setquestion({...questiondata, [name]:value});
 
  }

  return (
    <>
      <VStack w="full" maxW="sm" m="5" justifyContent="center" alignItems="center">
        <Input  p="2" css={{ "--focus-color": "lime" }}
          onChange={handlechannge}
          name="question"
         value={questiondata.question}
          flex="2"
          placeholder="Enter Question"
        />
        <Input p="2" css={{ "--focus-color": "lime" }}
          onChange={handlechannge}
          name="answer"
         value={questiondata.answer}
          flex="1"
          placeholder="Enter Answer"
        />
        <Input p="2" css={{ "--focus-color": "lime" }}
          onChange={handlechannge}
          name="difficulty"
         value={questiondata.difficulty}
          flex="1"
          placeholder="Enter Difficulty"
        />
        <Button onClick={handlesubmit} bg="bg.subtle" variant="outline">
          Create
        </Button>
      </VStack>
    </>
  );
}

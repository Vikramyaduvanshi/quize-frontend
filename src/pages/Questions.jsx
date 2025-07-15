import { Card ,Flex,Input, InputGroup, Kbd,Button, Menu, Portal,Spinner,Text,VStack, Accordion,Stack} from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { LuSearch } from "react-icons/lu"
import { useDispatch, useSelector } from "react-redux";
import { cleardifficulty, clearfiltered, fetchquestion, setdifficulty, setpage, settopic } from "../redux/questionslice";




export function Questions(){
let dispatch= useDispatch();
let {error,loading,page,topic,difficulty,limit,hashmore,questions,filteredquestion}=useSelector((state)=>state. questions)
let changeidref=useRef();
let loader=useRef();
const [inputTopic, setInputTopic] = useState("");
let isinitialmount=true;
useEffect(()=>{
if(questions.length==0){
    dispatch(fetchquestion({page,topic,difficulty,limit}))
    console.log("fetch data")
}
},[])

useEffect(()=>{
  if(!isinitialmount && questions.length>0){
dispatch(fetchquestion({page,topic,difficulty,limit}))
  }
  isinitialmount=false;
},[page])


function handlechange(e) {
 let value=e.target.value
 setInputTopic(value)
  if (changeidref.current) clearTimeout(changeidref.current);

  changeidref.current = setTimeout(() => {
    dispatch(settopic(value));
  }, 1000);
}

console.log("rendering")

useEffect(()=>{

if(!topic && !difficulty){

  dispatch(clearfiltered())
}else{
 
  dispatch(fetchquestion({page,topic,difficulty,limit}))
}
},[topic,difficulty])


useEffect(() => {
  const observer = new IntersectionObserver(([entry]) => {
    if (hashmore && entry.isIntersecting) {
      dispatch(setpage(1));
    }
  }, {
    threshold: 1
  });

  const currentLoader = loader.current;
  if (currentLoader) {
    observer.observe(currentLoader);
  }

  return () => {
    if (currentLoader) {
      observer.unobserve(currentLoader);
    }
  };
}, [hashmore]);



if (loading) {
    return (
      <VStack colorScheme="teal">
        <Spinner color="teal.600" />
        <Text color="teal.600">Loading...</Text>
      </VStack>
    );
  }

    return (


        <>
 <Flex margin="5" justifyContent="center" gap="4" alignItems="center" >
       <Card.Root>
            <Card.Body>
                <InputGroup  flex="1" startElement={<LuSearch />} endElement={<Kbd>⌘K</Kbd>}>
    <Input value={inputTopic}  onChange={handlechange}  placeholder="Search topics" />
  </InputGroup>
            </Card.Body>
        </Card.Root>

<Menu.Root>
  <Menu.Trigger asChild>
    <Button size="sm" px="4" py="2" focusRing="outside">
      Select Difficulty
    </Button>
  </Menu.Trigger>
  <Portal>
    <Menu.Positioner>
      <Menu.Content>
        <Menu.Item value ="all" onClick={(e) => dispatch(cleardifficulty(''))}>All Question</Menu.Item>
        <Menu.Item value ="easy" onClick={(e) => dispatch(setdifficulty("easy"))}>Easy</Menu.Item>
        <Menu.Item value ="midium" onClick={(e) => dispatch(setdifficulty("midium"))}>Medium</Menu.Item>
        <Menu.Item value ="hard" onClick={(e) => dispatch(setdifficulty("hard"))}>Hard</Menu.Item>
      </Menu.Content>
    </Menu.Positioner>
  </Portal>
</Menu.Root>
 </Flex>



{filteredquestion.length > 0 ? (
<Flex direction="column" alignItems="center" justifyContent="center">
      <Accordion.Root type="single" collapsible style={{ width: "100%", maxWidth: "600px" }}>
    {filteredquestion.map((item, index) => (
      <Accordion.Item key={index} value={String(index)}>
        <Accordion.ItemTrigger>
          <Stack gap="1">
            <Text>{item.question}</Text>
            <Text fontSize="sm" color="fg.muted">
              Click to see the answer
            </Text>
          </Stack>
        </Accordion.ItemTrigger>
        <Accordion.ItemContent>
          <Accordion.ItemBody>{item.answer}</Accordion.ItemBody>
        </Accordion.ItemContent>
      </Accordion.Item>
    ))}
  </Accordion.Root>
</Flex>
) : (
 <Flex  justifyContent="center" alignItems="center" direction="column">
  <Accordion.Root type="single" collapsible style={{ width: "100%", maxWidth: "600px" }}>
    {questions.map((item, index) => (
      <Accordion.Item key={index} value={String(index)} style={{ width: "100%" }}>
        <Accordion.ItemTrigger>
          <Stack gap="1">
            <Text>{item.question}</Text>
            <Text fontSize="sm" color="fg.muted">
              Click to see the answer
            </Text>
          </Stack>
        </Accordion.ItemTrigger>
        <Accordion.ItemContent>
          <Accordion.ItemBody>{item.answer}</Accordion.ItemBody>
        </Accordion.ItemContent>
      </Accordion.Item>
    ))}
  </Accordion.Root>
</Flex>

)}

<div ref={loader} style={{ textAlign: "center", margin: "1rem" }}>
        {hashmore ? (
          loading ? <Spinner
            size="lg"
            color="colorPalette.600"
            colorPalette={colorPalette}
          />:<Text color="gray.500">"  "</Text>
        ) : (
          <Text color="green.500">✅ No more data available</Text>
        )}
      </div>

        </>
    )
}
import { Flex, Heading, Spinner, Text, VStack, Button,HStack ,InputGroup,Card,Input,Kbd} from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearFilteredUsers, fetchUser, setemail, setFilteredUsers, setpage } from "../redux/userslice";
import { useNavigate } from "react-router-dom";
import { LuSearch } from "react-icons/lu"
import "../App.css"
export function Users() {
 
  const navigate = useNavigate();
  const loader = useRef();
  const dispatch = useDispatch();
let vouunceid=useRef(null)
  const isInitialMount = useRef(true); 

  const { page, email, limit, error, loading, hasmore, users,filteredUser } = useSelector((state) => state.users);

  useEffect(() => {
    if (users.length === 0) {
      dispatch(fetchUser({ email, page, limit }));
    }
  }, []);

 
  useEffect(() => {
    if (!isInitialMount.current && page > 1) {
      dispatch(fetchUser({ email, page, limit }));
    }
    isInitialMount.current = false;
  }, [page]);


  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && hasmore) {
          dispatch(setpage(1));
        }
      },
      { threshold: 1 }
    );

    if (loader.current) observer.observe(loader.current);
    return () => {
      if (loader.current) observer.unobserve(loader.current);
    };
  }, [hasmore]);

  if (loading && users.length === 0) {
    return (
      <VStack colorScheme="teal">
        <Spinner color="teal.600" />
        <Text color="teal.600">Loading...</Text>
      </VStack>
    );
  }

function handlechange(e){
if(vouunceid.current){
  clearTimeout(vouunceid.current)
}
let {value}= e.target
let searchvalue= value.trim().toLowerCase();
vouunceid.current=setTimeout(()=>{
if(!searchvalue){
  dispatch(clearFilteredUsers())
}
else{
  
let filtered= users.filter((v)=>v.email.toLowerCase().includes(searchvalue))
if(filtered.length>0){
dispatch(setFilteredUsers(filtered))
}else{
  dispatch(setemail(value))
dispatch(fetchUser({email:searchvalue}))
}
}

},1000)


}

  return (
    <>

 <HStack margin="5" justifyContent="center" gap="2rem">
     <Card.Root width="320px">
  <Card.Body>
     <InputGroup flex="1" startElement={<LuSearch />} endElement={<Kbd>⌘K</Kbd>}>
     <Input onChange={handlechange} placeholder="Search Topics" border="1px solid black"  css={{ "--focus-color": "lime" }}/>
   </InputGroup>
  </Card.Body>
     </Card.Root>
 
  </HStack>


      <Flex
  gap="4"
  wrap="wrap"
  mx="auto"
  my={4}
  justifyContent="center"
  alignItems="center"
>
  {(filteredUser.length > 0 ? filteredUser : users).map((v, index) => (
    <VStack
      key={index}
      p={4}
      boxShadow="md"
      borderRadius="md"
      border="1px solid #ccc"
    >
      <Heading size="md">{v.email}</Heading>
      <Button
          colorScheme="teal"
        onClick={() => navigate(`/fulldetails/${v._id}`)}
      >
        Full details
      </Button>
    </VStack>
  ))}
</Flex>


      <div ref={loader} style={{ textAlign: "center", margin: "1rem" }}>
        {hasmore ? (
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
  );
}

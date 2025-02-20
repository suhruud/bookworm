import React, { useCallback, useEffect, useState } from "react";
import { Col, Container, Row, Button, Card, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import Navigationbar from "./Navigationbar";
import { useNavigate } from 'react-router-dom';
function Library() 
{

    const navigate=useNavigate();
    const isLoggedIn=sessionStorage.getItem("IsLoggedIn");
    const [tran, setTran] = useState('p')
    const UserId=sessionStorage.getItem("UserId");
    let [data, setData] = useState([]);
    let [filteredData, setFilteredData] = useState([]);
    let [filteredData2, setFilteredData2] = useState([]);

    useEffect(() => {

        fetch("http://localhost:8080/crud/products")
            .then(res => res.json())
            .then((result) => { setData(result); setFilteredData(result); setFilteredData2(result); });
   
    }, [])

    const onButton = (val) => {
        // console.log(event.target.value)
        if (val=="buy"){
            console.log(val);
            setFilteredData(data);
            setFilteredData2(data);
            setTran('p')
        }
        else{
            console.log("inside else")
            setFilteredData2(data.filter((elem) => elem.isRentable == true));
            setFilteredData(data.filter((elem) => elem.isRentable == true));
            setTran('r');
            
        }

    };
    const onFilterLang = (val) => {
                
                console.log(val)
            switch (val) {

                    case 1: setFilteredData(filteredData2.filter((elem) =>  elem.productLanguage=='1'));
                              break;
                    case 5: setFilteredData(filteredData2.filter((elem) => elem.productLanguage=='5')); 
                             break;
                    case 7: setFilteredData(filteredData2.filter((elem) => elem.productLanguage =='7')); 
                             break;
                    case 3: setFilteredData(filteredData2.filter((elem) => elem.productLanguage =='3'));  
                            break;
                    case 0: setFilteredData(filteredData2);
                             break;
                     default: setFilteredData=[];
                
                } 
              
    };


   

    
    const submitHandler = (id) => 
    {
        if(isLoggedIn)
        {
            const cart = { 'productId': id, 'userId': UserId, 'isSelected': 'Y' }
            const url = "http://localhost:8080/crud/addtocart"
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(cart)
            };
            fetch(url, requestOptions)
                .then(res => res.json())
                .then((result) => { alert(result) })
        }   
        else
        {
            var z = window.confirm("Please Log In First!");
            if(z)
            navigate("/Login");
            if(z==false)
            navigate('/Library');
        }

    }




    const rentHandler = () => {





    }














    return (
        <><Navigationbar/>
        <Container fluid style={{ textAlign: 'left' }}>
            <Row style={{ padding: '10px' }}>
                <Col xs={2}><h2><b>bookWorm</b></h2></Col>
                <Col xs={4}><h2>Books to Sell</h2></Col>
                <Col xs={4}>
                    <div class="btn-group" >
                        <Button variant="light" id="bt1" onClick={()=>onButton("buy")} value="buy" class="button">&nbsp;&nbsp;&nbsp;Buy&nbsp;&nbsp;&nbsp;</Button>
                        <Button variant="light" id="bt2" onClick={()=>onButton("rent")} value="rent" class="button">&nbsp;&nbsp;&nbsp;Rent&nbsp;&nbsp;&nbsp;</Button>

                    </div>
                </Col>
                {isLoggedIn?<Col xs={2}><Link to="/Cart"> <Button variant="primary" style={{ align: 'right' }}>Visit Cart{'>'}</Button></Link></Col>:''}
            </Row>
            <Row>
                <Col xs={2}><h2><b>

                    <Container style={{ paddingTop: '50px' }}>
                        <Row style={{ paddingBottom: "20px" }}>
                            <Button variant="light" onClick={(e)=>onFilterLang(0)} value={0}><h5 style={{ textAlign: 'left' }}><b>All Books</b></h5></Button>
                            {/* <button class="btn btn-primary" onClick={(e)=>onFilterLang(0)} value={0} type="button"><b>ALL</b></button> */}
                           
                        </Row>
                        <Row style={{ paddingBottom: "20px" }}>
                            <Button variant="light" onClick={(e)=>onFilterLang(1)} value={1}><h5 style={{ textAlign: 'left' }}><b>English</b></h5></Button>
                            {/* <button class="btn btn-primary" onClick={(e)=>onFilterLang(1)} value={1} type="button"><b>English</b></button> */}

                        </Row>
                        <Row style={{ paddingBottom: "20px" }}>
                            <Button variant="light" onClick={(e)=>onFilterLang(5)} value={5}><h5 style={{ textAlign: 'left' }}><b>Hindi</b></h5></Button>
                        </Row>
                        <Row style={{ paddingBottom: "20px" }}>
                            <Button variant="light" onClick={(e)=>onFilterLang(3)} value={3}><h5 style={{ textAlign: 'left' }}><b>Marathi</b></h5></Button>
                        </Row>
                        <Row style={{ paddingBottom: "20px" }}>
                            <Button variant="light" onClick={(e)=>onFilterLang(7)} value={7}><h5 style={{ textAlign: 'left' }}><b>Kokani</b></h5></Button>
                            {/* <button class="btn btn-primary" onClick={(e)=>onFilterLang(7)} value={7} type="button"><b>Kokani</b></button> */}
                        </Row>
                    </Container>
                </b></h2></Col>
                <Col xs={9}><h2>
                    <Container fluid>
                        {/* <Row>
                <img src={Bookcases} alt="displayimg"></img>
            </Row> */}
                        <Row>
                            {filteredData.map(book => (

                                <Col xs={3} style={{ paddingBottom: "20px" }}>
                                    <Card >
                                        {/* <Card.Img variant="top" src={book.productImage+"/190px280"} /> */}
                                        <img style={{ paddingLeft: "10px" }} src={"../images/" + book.productImage} width="170px" height="250px"></img>
                                        {/* keep image size horizontal 190 px */}
                                        <Card.Body>
                                            <Link to={"/Description/" + book.productId} style={{ textDecorationLine: "none" }}>
                                                <Card.Title><b>{book.productName}</b></Card.Title>
                                            </Link>
                                            {tran=='p'?
                                            (<div style={{ paddingLeft: "0px" }} >
                                                  <Card.Title><Button variant="primary" onClick={() => { submitHandler(book.productId) }} >Add to Cart</Button></Card.Title>
                                              </div>):(<div style={{ paddingLeft: "15px" }} className="mx-auto">
                                                <Button variant="primary" href={"/Description/" + book.productId}>Rent</Button>
                                              </div>)}
                                                
                                        </Card.Body>
                                    </Card>
                                </Col>

                            ))}
                        </Row>
                    </Container>
                </h2></Col>
            </Row>
        </Container></>
    );
}





export default Library;
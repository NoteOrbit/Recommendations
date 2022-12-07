import Alert from 'react-bootstrap/Alert';
import { LineChart, Line, YAxis, XAxis, CartesianGrid, Tooltip, Legend , ResponsiveContainer} from 'recharts';
import React from 'react';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import CollapsibleExample from './Navbar'

function GridExample() {
  return (
    <>
    
    <Row xs={1} md={2} className="g-4">
      {Array.from({ length: 4 }).map((_, idx) => (
        <Col>
          <Card>
            <Card.Img variant="top" src="holder.js/100px160" />
            <Card.Body>
              <Card.Title>Card title</Card.Title>
              <Card.Text>
                This is a longer card with supporting text below as a natural
                lead-in to additional content. This content is a little bit
                longer.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        
      ))}
    </Row>
    </>
  );
}




// class LineRechartComponent extends React.Component {

//     data = [
//         {
//             "name": "Jan 2019",
//             "Product A": 3432,
//             "Procuct B": 2342
//         },
//         {
//             "name": "Feb 2019",
//             "Product A": 2342,
//             "Procuct B": 3246
//         },
//         {
//             "name": "Mar 2019",
//             "Product A": 4565,
//             "Procuct B": 4556
//         },
//         {
//             "name": "Apr 2019",
//             "Product A": 6654,
//             "Procuct B": 4465
//         },
//         {
//             "name": "May 2019",
//             "Product A": 8765,
//             "Procuct B": 4553
//         }
//     ]

//     render() {
//         return (
//             <center>
//             <ResponsiveContainer width="80%" height={400}>
//             <LineChart data={this.data}
//                 margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
//                 <CartesianGrid strokeDasharray="3 3" />
//                 <XAxis dataKey="name" />
//                 <YAxis />
//                 <Tooltip />
//                 <Legend />
//                 <Line type="monotone" dataKey="Product A" stroke="#0095FF" />
//                 <Line type="monotone" dataKey="Procuct B" stroke="#FF0000" />
//             </LineChart>
//             </ResponsiveContainer>
//             </center>
//         )
//     };
// }


function About() {
  return (
    <>
    <CollapsibleExample/>
    <div role="alert" class="alert">
    <Alert variant="info">
      <Alert.Heading>TEST VERSIONS</Alert.Heading>
      <p>
      Versions is not complete
      </p>
      <hr />
      <p className="mb-0">
        make by NoteChu
      </p>
    </Alert>
    </div>
    {/* <LineRechartComponent/> */}
    <center>
    <GridExample/>
    </center>
    </>
  );
}

export default About;
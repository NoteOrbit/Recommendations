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
            <Card.Body>
              <Card.Title>Recommendations item</Card.Title>
              <Card.Text>
                {idx}
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        
      ))}
    </Row>
    </>
  );
}




class LineRechartComponent extends React.Component {

    data = [
        {
            "name": "Jan 2019",
            "test A": 3432,
            "test B": 2342
        },
        {
            "name": "Feb 2019",
            "test A": 2342,
            "test B": 3246
        },
        {
            "name": "Mar 2019",
            "test A": 4565,
            "test B": 4556
        },
        {
            "name": "Apr 2019",
            "test A": 6654,
            "test B": 4465
        },
        {
            "name": "May 2019",
            "test A": 8765,
            "test B": 4553
        }
    ]

    render() {
        return (
            <center>
            <ResponsiveContainer width="80%" height={400}>
            <LineChart data={this.data}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="test A" stroke="#0095FF" />
                <Line type="monotone" dataKey="test B" stroke="#FF0000" />
            </LineChart>
            </ResponsiveContainer>
            </center>
        )
    };
}


function About() {
  return (
    <>
    <CollapsibleExample/>
    <LineRechartComponent/>
    <div role="alert" class="alert">
    <Alert variant="info">
      <Alert.Heading>TEST VERSIONS</Alert.Heading>
      <p>
      Versions is not complete
      </p>
      <hr />
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
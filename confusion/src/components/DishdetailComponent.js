import React, { Component } from 'react';
import { Card, CardImg, CardBody, CardTitle, CardText, Modal, ModalHeader, ModalBody, Form, FormGroup, Input, Breadcrumb, BreadcrumbItem,
    Button, Row, Col, Label } from 'reactstrap';
import { Control, LocalForm, Errors } from 'react-redux-form';
import { Link } from 'react-router-dom';

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);

const DishDetail = (props) => {
    
    if (props.dish != null) {

        return (
        <div className="container">
            <div className="row">
                <Breadcrumb>
                    <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                    <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                </Breadcrumb>
                <div className="col-12">
                    <h3>{props.dish.name}</h3>
                    <hr/>
                </div>                
            </div>
            <div className="row">
                <div className="col-12 col-md-5 m-1">
                    <RenderDish dish={props.dish} />
                </div>
                <div className="col-12 col-md-5 m-1">
                    <RenderComments comments={props.comments} />
                </div>
            </div>
        </div>
    );
    }
    else {
        return(
        <div></div>
        );
    }
}

function RenderDish({dish}) {
    if (dish != null) {
    
        return(
            <div key={dish.id} className='col-12 col-md-5 m-1'>
                <Card>
                <CardImg width='100%' src={dish.image} alt={dish.name} />
                    <CardBody>
                        <CardTitle>{dish.name}</CardTitle>
                        <CardText>{dish.description}</CardText>
                    </CardBody>
                </Card>
            </div>
        );
    }
    else {
        return(
            <div></div>
        );
    }           
}

function RenderComments({comments}) {
    if (comments != null) {
        
        return (
            <div className= "col-12 col-md-5 m-1">
                <h4>Comments</h4>
                <ul className= "list-unstyled">
                {comments.map(function(comments){
                    return (
                        <li key= {comments.id}>
                            <p>{comments.comment}</p>
                            <p>--{comments.author}, 
                            {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comments.date)))}
                            </p>
                        </li>
                    );
                })}
                </ul>
            </div>
            );                
    }
    else {
        return(
            <div></div>
        );
    }
}

class CommentForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            rating: '',
            name: '',
            comment: '',
            touched: {
                rating: false,
                yourname: false,
                comment: false
            }
        }

        this.toggleNav = this.toggleNav.bind(this);
        this.state = {
          isNavOpen: false,
          isModalOpen: false
        };

        this.toggleModal = this.toggleModal.bind(this);

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
    }

    toggleNav() {
        this.setState({
            isNavOpen: !this.state.isNavOpen
        });
    }
  
    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }

    handleSubmit(values) {
        console.log("current state is : " + JSON.stringify(values));
        alert("current state is : " + JSON.stringify(values));
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });    
    }

    render(){
       
        return(
            <React.Fragment>
                <Button outline onClick={this.toggleCommentFormModal}>
                    <span className="fa fa-comments fa-lg"></span> Submit Comment
                </Button>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                <ModalBody>
                <Form onSubmit={this.handleLogin}>
                        <FormGroup>
                            <Label htmlFor="rating">Rating</Label>
                            <Control.select model=".rating" name="rating" className="form-control">
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
                            </Control.select>
                        </FormGroup>
                        <FormGroup>
                        <Label htmlFor="name" md={2}>Your name</Label>
                        <Col md={10}>
                            <Control.text model=".name" id="name" name="name"
                                placeholder="Your name"
                                className="form-control"
                                validators={{
                                    required, minLength: minLength(3), maxLength: maxLength(15)
                                }}
                                 />
                            <Errors
                                className="text-danger"
                                model=".firstname"
                                show="touched"
                                messages={{
                                    required: 'Required',
                                    minLength: 'Must be greater than 3 characters',
                                    maxLength: 'Must be 15 characters or less'
                                }}
                             />
                        </Col>
                        </FormGroup>
                        <FormGroup>
                        <Label htmlFor="comment" md={2}>Comment</Label>
                            <Col md={10}>
                                <Control.textarea model=".comment" id="comment" name="comment"
                                    rows="8"
                                    className="form-control" />
                            </Col>
                        </FormGroup>
                        <Button type="submit" value="submit" color="primary">Submit Comment</Button>
                    </Form>                    
                </ModalBody>
                </Modal>
            </React.Fragment>
        );
    }
}

    export default DishDetail;
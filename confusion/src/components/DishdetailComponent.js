import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody,
    CardTitle } from 'reactstrap';

class Dishdetail extends Component {
    
    constructor(props) {
        super(props);
        }
    
    renderDish(dish) {
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
                )
            }
            
        }
    
    renderComments(dish) {
        if (dish != null) {
            
            return (
                <div>
                    <h4>Comments</h4>
                    {dish.comments.map(function(name, index){
                    return (
                        <div className="list-unstyled">
                        <p>{dish.comments[index].comment}</p>
                        <p>--{dish.comments[index].author}, 
                        {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(dish.comments.date)))}
                        </p>
                        </div>
                        );
                    })}
                </div>
                    )                
            }
            else {
                return(
                    <div></div>
                )
            }
        }
    
    render() {
        return ( 
            <div className='container'>
                <div className='row'>
                    {this.renderDish(this.props.selectedDish)}
                    {this.renderComments(this.props.selectedDish)}
                </div>
            </div>
        );
    }
}
    export default Dishdetail;
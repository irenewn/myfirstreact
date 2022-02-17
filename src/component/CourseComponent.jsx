import React from 'react';
import CourseDataService from '../CourseDataService';
import {Formik, Form, Field, ErrorMessage} from 'formik';

const INSTRUCTOR = 'nds'

export default class CourseComponent extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            id: this.props.match.params.id,
            description: ''
        }
        this.onSubmit = this.onSubmit.bind(this)
        this.validate = this.validate.bind(this)
    }

    componentDidMount(){
        console.log(this.state.id)
        if (this.state.id == -1){
            return
        }
    }

    validate(values){
        let errors = {};
        if(!values.description){
            errors.description = 'Enter description'
        }else if(values.description.length < 5){
            errors.description = 'Enter atleast 5 Characters in Description'
        }
        return errors;
    }

    onSubmit(values){
        let username = INSTRUCTOR
        let course = {
            id: this.state.id,
            description: values.description,
            targetDate: values.targetDate,
        }

        if(this.state.id === -1){
            CourseDataService.createCourse(username, course).then(
                () => this.props.history.push('/courses')
            )
        }else{
            CourseDataService.updateCourse(username, this.state.id, course).then(
                () => this.props.history.push('/courses')
            )
        }
        console.log(values);
    }

    render() {
        let {description,id} = this.state
        return(
            <div>
                <h3>Course</h3>
                <div className="container">
                    <Formik
                        initialValues={{id, description}}
                        onSubmit={this.onSubmit}
                        validateOnChange={false}
                        validateOnBlur={false}
                        validate={this.validate}
                        enableReinitialize={true}>
                            {
                                (props) => (
                                    <Form>
                                        <ErrorMessage name="description" component="div" className="alert alert-warning"/>
                                        <fieldset className="form-group">
                                            <label>id</label>
                                            <Field className="form-control" type="text" name="id" disabled/>
                                        </fieldset>
                                        <fieldset className="form-group">
                                            <label>id</label>
                                            <Field className="form-control" type="text" name="description" />
                                        </fieldset>
                                        <button className="btn btn-success" type="submit">Save</button>
                                    </Form>
                                )
                            }
                    </Formik>
                </div>
            </div>
        )
    }
}
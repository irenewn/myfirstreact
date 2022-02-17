import React from 'react';
import CourseDataService from '../CourseDataService';
import {Modal, Form, Input, Button} from 'antd';
import 'antd/dist/antd.css';

class ListCourseComponent extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            courses: [],
            message: null,
            isModalVisible: false,
        }
        this.refreshCourses = this.refreshCourses.bind(this)
        this.deleteCourseClicked = this.deleteCourseClicked.bind(this)
        this.updateCourseClicked = this.updateCourseClicked.bind(this)
        this.addCourseClicked = this.addCourseClicked.bind(this)
        this.showModal = this.showModal.bind(this)
        this.handleOk = this.handleOk.bind(this)
        this.handleCancel = this.handleCancel.bind(this)
    }

    showModal() {
        console.log('button clicked')
        this.setState({isModalVisible: true})
    };

    handleOk() {
        this.setState({isModalVisible: false})
    };

    handleCancel(){
        this.setState({isModalVisible: false})
    };

    componentDidMount(){
        this.refreshCourses();
    }

    refreshCourses(){
        CourseDataService.retrieveAllCourses().then(
            response => {
                console.log(response);
                this.setState({courses: response.data})
            }
        )
    }

    deleteCourseClicked(id){
        CourseDataService.deleteCourse(id).then(
            response => {
                this.setState({message: `Delete of course ${id} Successfull`})
                this.refreshCourses()
            }
        )
    }

    updateCourseClicked(id){
        console.log('update' + id)
        this.props.history.push(`/courses/${id}`, {state:{id}})
    }

    addCourseClicked(){
        console.log('submit clicked')
        this.setState({isModalVisible: false})
        this.props.history.push(`/courses/-1`)
    }

    clickCounter(){
        if(typeof(Storage) !== 'undefined'){
            if(sessionStorage.clickcount){
                sessionStorage.clickcount = Number(sessionStorage.clickcount)+1;
            }else{
                sessionStorage.clickcount = 1;
            }
            document.getElementById("result").innerHTML = "You have clicked the button" + sessionStorage.clickcount + "time (s) in this session";
        }else{
            document.getElementById("result").innerHTML = "Sorry, your browser does not support web storage.....";
        }
    }
    
    render() {
        return(
            <div className="container">
                <h1>All Courses</h1>
                {this.state.message && <div class="alert alert-success">{this.state.message}</div>}
                <div className="container">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Description</th>
                                <th>Update</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.courses.map(
                                course => 
                                <tr key={course.id}>
                                    <td>{course.id}</td>
                                    <td>{course.description}</td>
                                    <td><button className="btn btn-success" onClick={() => this.updateCourseClicked(course.id)}>Update</button></td>
                                    <td><button className="btn btn-warning" onClick={() => this.deleteCourseClicked(course.id)}>Delete</button></td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                    <div className="row">
                        <button className="btn btn-success" onClick={this.showModal}>Add</button>
                        <Modal title="Basic Modal" visible={this.state.isModalVisible} onOk={this.handleOk} onCancel={this.handleCancel}>
                            <Form
                            name="basic"
                            labelCol={{ span: 8 }}
                            wrapperCol={{ span: 16 }}
                            initialValues={{ remember: true }}
                            autoComplete="off"
                            >
                            <Form.Item
                                label="id"
                                name="id"
                            >
                                <Input disabled/>
                            </Form.Item>

                            <Form.Item
                                label="description"
                                name="description"
                                rules={[{ required: true, message: 'Please input description' }]}
                            >
                                <Input />
                            </Form.Item>

                            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                                <Button type="primary" onClick={()=> this.addCourseClicked()}>
                                Submit
                                </Button>
                            </Form.Item>
                            </Form>
                        </Modal>
                        <button onClick={this.clickCounter} type="button">Click this</button>
                        <div id={this.clickCounter.id="result"}></div>
                    </div>
                </div>
            </div>
        )
    }
}

export default ListCourseComponent;
import React from 'react'
import { Form, Input, Checkbox, Button } from 'antd';
//import { gql, graphql } from 'react-apollo'
//import history from '../lib/history'
//import { storageLogin } from '../lib/state'
const FormItem = Form.Item;
// const addUserMutation = gql`
// mutation addUserMutation($name: String!, $email: String!, $password: String!) {
//     addUser(input: {
//       	name: $name
//       	email: $email
//       	password: $password
//     }) {
//       	error
//       	msg
// 		token
// 		user {
// 			id
// 			name
// 			email
// 			password
// 		}
//     }
//   }
// `

class RegistrationForm extends React.Component {
  state = {
    confirmDirty: false,
    autoCompleteResult: [],
  };
  constructor(props) {
	  super(props)
	  console.log(this.props)
  }
  handleSubmit = (e) => {
	e.preventDefault()
    this.props.form.validateFieldsAndScroll(async (err, values) => {
        console.log(values)
	}); 
  }
  handleConfirmBlur = (e) => {
    const value = e.target.value;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  }
  checkPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue('password')) {
      callback('Two passwords that you enter is inconsistent!');
    } else {
      callback();
    }
  }
  checkConfirm = (rule, value, callback) => {
    const form = this.props.form;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  }


  render() {
    const { getFieldDecorator } = this.props.form;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 6 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 14 },
      },
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 14,
          offset: 6,
        },
      },
    };

    return (
      <Form onSubmit={this.handleSubmit}>
		{/* NAME */}        
		<FormItem
          {...formItemLayout}
          label="Name"
          hasFeedback
        >
          {getFieldDecorator('name', {
            rules: [{ required: true, message: 'Please input your name!', whitespace: true }],
          })(
            <Input />
          )}
        </FormItem>
        {/* NAME */}
        {/* USERNAME */}        
		<FormItem
          {...formItemLayout}
          label="Username"
          hasFeedback
        >
          {getFieldDecorator('username', {
            rules: [{ required: true, message: 'Please input your username!', whitespace: false }],
          })(
            <Input />
          )}
        </FormItem>
        {/* USERNAME */}
        {/* E-MAIL */}        
        <FormItem
          {...formItemLayout}
          label="E-mail"
          hasFeedback
        >
          {getFieldDecorator('email', {
            rules: [{
              type: 'email', message: 'The input is not valid E-mail!',
            }, {
              required: true, message: 'Please input your E-mail!',
            }],
          })(
            <Input />
          )}
        </FormItem>
        {/* E-MAIL */}
        {/* CONFIRM E-MAIL */}        
        <FormItem
          {...formItemLayout}
          label="Confirm E-mail"
          hasFeedback
        >
          {getFieldDecorator('email', {
            rules: [{
              type: 'email', message: 'The input is not valid E-mail!',
            }, {
              required: true, message: 'Please input your E-mail!',
            }],
          })(
            <Input />
          )}
        </FormItem>
        {/* CONFIRM E-MAIL */}
        {/* PASSWORD */}        
        <FormItem
          {...formItemLayout}
          label="Password"
          hasFeedback
        >
          {getFieldDecorator('password', {
            rules: [{
              required: true, message: 'Please input your password!',
            }, {
              validator: this.checkConfirm,
            }],
          })(
            <Input type="password" />
          )}
        </FormItem>
        {/* PASSWORD */}
        {/* CONFIRM PASSWORD */}        
        <FormItem
          {...formItemLayout}
          label="Confirm Password"
          hasFeedback
        >
          {getFieldDecorator('confirm', {
            rules: [{
              required: true, message: 'Please confirm your password!',
            }, {
              validator: this.checkPassword,
            }],
          })(
            <Input type="password" onBlur={this.handleConfirmBlur} />
          )}
        </FormItem>
        {/* CONFIRM PASSWORD */}

        {/* AGREEMENT */}
        <FormItem {...tailFormItemLayout} style={{ marginBottom: 8 }}>
          {getFieldDecorator('agreement', {
            valuePropName: 'checked',
          })(
            <Checkbox>I have read the <a href="">agreement</a></Checkbox>
          )}
        </FormItem>
        {/* AGREEMENT */}
        {/* BUTTON */}        
        <FormItem {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">Register</Button>
        </FormItem>
        {/* BUTTON */}
                    
      </Form>
    );
  }
}
const WrappedRegistrationForm = Form.create()(RegistrationForm);


export default WrappedRegistrationForm
import React, { Component } from 'react'
import { Card, Button, Modal, Form, Input } from 'antd';
import { HeartTwoTone, HeartFilled, EditOutlined, DeleteOutlined, MailOutlined, PhoneOutlined, GlobalOutlined } from '@ant-design/icons';

const layout = {
    labelCol: {
        span: 8,
    },
    wrapperCol: {
        span: 12,
    },
};

const validateMessages = {
    required: '${label} is required!',
    types: {
        email: 'Your input is not a valid email!'
    }
};

class User extends Component {
    constructor(props) {
        super(props);
        this.state = {
            liked: false,
            isModalVisible: false,
            flag: false,
        };

        this.likeToggle = this.likeToggle.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.showModal = this.showModal.bind(this);
        this.onFinish = this.onFinish.bind(this);
        this.onFinishFailed = this.onFinishFailed.bind(this);
    }

    likeToggle = () => {
        this.setState((prevState) => ({
            liked: !prevState.liked
        }));
    };

    showModal = () => {
        this.setState({ isModalVisible: true });
    };

    handleCancel = () => {
        this.setState({ isModalVisible: false });
        this.setState({ flag: false });
    };

    onFinish = (values) => {
        this.setState({ flag: true });
        if (this.state.flag) {
            this.props.updateInfo(this.props.user.id, values);
            this.setState({ isModalVisible: false, flag: false });
        }
        console.log('Success:', values);
    };

    onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    render() {
        const { user, deleteUser } = this.props;
        const { liked, isModalVisible } = this.state;
        console.log(this.state)
        return (
            <div>
                <Card className="cards"
                    cover={
                        <div className="cardCover">
                            <img className="avatar"
                                src={`https://avatars.dicebear.com/v2/avataaars/${user.username}.svg?options[mood][]=happy`}
                                alt="Avatar">
                            </img>
                        </div>
                    }
                    actions={[
                        <Button type="link" onClick={this.likeToggle}>
                            {liked ?
                                <HeartFilled className="heart" /> :
                                <HeartTwoTone twoToneColor="rgb(243, 101, 101)" />
                            }
                        </Button>,
                        <Button type="link" onClick={this.showModal}>
                            <EditOutlined />
                        </Button>,
                        <Button type="link" id="deleteBtn"
                            onClick={() => {
                                deleteUser(user.id);
                            }}
                        >
                            <DeleteOutlined />
                        </Button>,
                    ]}
                >
                    <h2 className="name">{user.name}</h2>
                    <div className="infoBlock">
                        <p>
                            <span className="infoIcon">
                                <MailOutlined />
                            </span>
                            {user.email}
                        </p>
                    </div>
                    <div className="infoBlock">
                        <p>
                            <span className="infoIcon">
                                <PhoneOutlined />
                            </span>
                            {user.phone}
                        </p>
                    </div>
                    <div className="infoBlock">
                        <p>
                            <span className="infoIcon">
                                <GlobalOutlined />
                            </span>
                            http://{user.website}
                        </p>
                    </div>
                </Card>

                <Modal title="Basic Modal"
                    footer={[<Button style={{}} key="cancel" onClick={this.handleCancel}> Cancel </Button>]}
                    visible={isModalVisible} onCancel={this.handleCancel}>
                    <Form
                        {...layout}
                        name="basic"
                        initialValues={{
                            name: user.name,
                            email: user.email,
                            phone: user.phone,
                            website: user.website
                        }}
                        validateMessages={validateMessages}
                        onFinish={this.onFinish}
                        onFinishFailed={this.onFinishFailed}
                    >
                        <Form.Item label="Name" name="name"
                            rules={[
                                {
                                    required: true
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item label="Email" name="email"
                            rules={[
                                {
                                    required: true,
                                    type: 'email'
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item label="Phone" name="phone"
                            rules={[
                                {
                                    required: true
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item label="Website" name="website"
                            rules={[
                                {
                                    required: true
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <Button style={{ right: -345, bottom: -67 }} type="primary" htmlType="submit">OK</Button>
                    </Form>
                </Modal>
            </div>
        )
    }
}

export default User
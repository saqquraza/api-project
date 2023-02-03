import { Col, Form, Input, Modal, Row } from 'antd'
import { useForm } from 'antd/es/form/Form';
import TextArea from 'antd/es/input/TextArea';
import axios from 'axios';
import React, { useEffect, useState } from 'react'

interface Props {
    onClose: () => void;
    open: boolean;
    modalTitle: string;
    id?: string;
    isEditMode?: boolean;
    fetchData: () => Promise<void>;
  }
  

  const ApiUserModal: React.FC<Props> = ({
    onClose,
    open,
    id,
    isEditMode,
    fetchData
  }) => {
    const [form] = useForm();
    const [userDetails, setUserDetails] = useState<any>({});


const fetchUserDetailsById = async () => {
   
    if (id) {
      try {
        const clientNotesResp = await axios.get(`https://blue-journalist-bbrpv.ineuron.app:4000/user/${id}`);
        setUserDetails(clientNotesResp.data.data);
      } catch (err: any) {
        console.error(false);
  } 
    }
  };

  useEffect(() => {
    if (id && id !== '0') {
      fetchUserDetailsById();
    }
  }, [id]);

  console.log(userDetails);

//   useEffect(() => {
//     if (isEditMode ) {
//       form.setFieldValue("dateAndTime", moment(clientNotesDetails?.dateAndTime));
//       form.setFieldValue("clientDescription", clientNotesDetails?.clientDescription);
//     }
//   }, [ isEditMode]);

    return (
            <Modal
                title="User Info"
                open={open}
                onCancel={()=>onClose()}
            >
                <Form
                    layout="vertical"
                //   onFinish={isEditMode && id ? handleEditClienGoals : handleSubmit}
                //   form={form}
                >
                    <Row gutter={[20, 0]}>
                        <Col xs={24} >
                            <Form.Item label="First Name" name={"firstName"} rules={[{ required: true, message: 'Please enter First name!' }]}>
                                <Input
                                    placeholder="Enter first name"
                                />
                            </Form.Item>
                        </Col>
                        <Col xs={24} >
                            <Form.Item label="last Name" name={"lastName"} rules={[{ required: true, message: 'Please enter support details!' }]}>
                                <Input
                                    placeholder="Enter last Names"
                                />
                            </Form.Item>
                        </Col>
                        <Col xs={24} >
                            <Form.Item label="age" name={"age"} rules={[{ required: true, message: 'Please enter support details!' }]}>
                                <Input
                                    placeholder="Enter age"
                                />
                            </Form.Item>
                        </Col>
                        <Col xs={24} >
                            <Form.Item label="phoneNumber" name={"phoneNumber"} rules={[{ required: true, message: 'Please enter support details!' }]}>
                                <Input
                                    placeholder="Enter phoneNumber"
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>

            </Modal>
        
    )
}

export default ApiUserModal
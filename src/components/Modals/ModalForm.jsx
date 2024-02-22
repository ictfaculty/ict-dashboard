import React, { useState } from 'react';
import { Button, Form, Input, Modal } from 'antd';

import { PlusOutlined, UploadOutlined } from '@ant-design/icons';
import { message, Upload } from 'antd';
import TextArea from 'antd/es/input/TextArea';

const ModalForm = () => {
    const [isModalOpen, setIsModalOpen] = useState(true);
    const [form] = Form.useForm();
    const onFinish = (values) => {
        console.log('Received values of form: ', values);
        console.log('Uploaded files:', values.fileList);
    };
    const normFile = (e) => {
        console.log('upload event:', e);
        if (Array.isArray(e)) {
            return e;
        }
        return e?.fileList;
    };

    const handleOk = () => {
        form.submit();
        const formValues = form.getFieldsValue();
        form.resetFields();
        setIsModalOpen(false)
        console.log(formValues);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            <Modal className='modal' title="Добавить новости" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <Form
                    form={form}
                    onFinish={onFinish}
                    className='py-3'
                >
                    <Form.Item name='title' label="Название">
                        <Input />
                    </Form.Item>
                    <Form.Item name='description' label="Описание">
                        <TextArea rows={6} />
                    </Form.Item>
                    <Form.Item label="Upload" valuePropName="fileList" getValueFromEvent={normFile}>
                        <Upload action="http://77.95.1.235:8585/news" maxCount={1} listType="picture-card">
                            <button
                                style={{
                                    border: 0,
                                    background: 'none',
                                }}
                                type="button"
                            >
                                <PlusOutlined />
                                <div
                                    style={{
                                        marginTop: 8,
                                    }}
                                >
                                    Upload
                                </div>
                            </button>
                        </Upload>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};

export default ModalForm;

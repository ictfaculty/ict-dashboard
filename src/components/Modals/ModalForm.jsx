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
                        <TextArea rows={4} />
                    </Form.Item>
                    {/* Добавьте аналогичные правила и для других полей, если необходимо */}
                </Form>
            </Modal>
        </>
    );
};

export default ModalForm;

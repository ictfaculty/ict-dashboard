import React, { useState } from 'react';
import { Button, Form, Input, Modal, message } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { useDispatch } from 'react-redux';
import { addAds } from '../../store/features/ads/adsSlice';

const ModalAdd = () => {
    const dispatch = useDispatch();
    const [isModalOpen, setIsModalOpen] = useState(true);
    const [form] = Form.useForm();

    const handleOk = () => {
        form.submit();
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const onFinish = (values) => {
        // console.log(values);
        const formData = new FormData();
        formData.append('title', values.title); // Append title from form values
        formData.append('description', values.description);

        dispatch(addAds(formData)); // Dispatch addAds action with form data
        setIsModalOpen(false);
    };

    return (
        <Modal className='modal' title="Добавить обьявлений" visible={isModalOpen} onOk={handleOk} onCancel={handleCancel} footer={null}>
            <Form form={form} onFinish={onFinish} className='py-3'>
                <Form.Item name='title' label="Название" rules={[{ required: true, message: 'Please enter the title' }]}>
                    <Input />
                </Form.Item>
                <Form.Item name='description' label="Описание" rules={[{ required: true, message: 'Please enter the description' }]}>
                    <TextArea rows={6} />
                </Form.Item>
                <div className="flex justify-start gap-[30px]">
                    <Button onClick={handleCancel}>Отмена</Button>
                    <Button type="primary" htmlType="submit">Добавить</Button>
                </div>
            </Form>
        </Modal>
    );
};

export default ModalAdd;

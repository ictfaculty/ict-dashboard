import React, { useState } from 'react';
import { Button, Form, Input, Modal, Switch, message } from 'antd';
import { PlusOutlined, UploadOutlined } from '@ant-design/icons';
import { Upload } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { useDispatch } from 'react-redux';
import { addNews } from '../../store/features/news/newsSlice';

const ModalForm = () => {
    const dispatch = useDispatch();

    const [isModalOpen, setIsModalOpen] = useState(true);
    const [form] = Form.useForm();
    const [file, setFile] = useState(null); // State to store the selected file

    const handleOk = () => {
        form.submit();
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const onFinish = (values) => {
        if (!file) {
            message.error('Please select an image file.');
            return;
        }

        const formData = new FormData();
        formData.append('file', file); // Append the selected file
        formData.append('title', values.title); // Append title from form values
        formData.append('description', values.description); // Append description from form values

        dispatch(addNews(formData)); // Dispatch addNews action with form data
        setIsModalOpen(false);
    };

    const normFile = (e) => {
        if (Array.isArray(e)) {
            return e;
        }
        return e && e.fileList;
    };

    return (
        <>
            <Modal className='modal' title="Добавить новости" visible={isModalOpen} onOk={handleOk} onCancel={handleCancel} footer={null}>
                <Form form={form} onFinish={onFinish} className='py-3'>
                    <Form.Item name='title' label="Название" rules={[{ required: true, message: 'Please enter the title' }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name='description' label="Описание" rules={[{ required: true, message: 'Please enter the description' }]}>
                        <TextArea rows={6} />
                    </Form.Item>
                    <Form.Item label="Фото" name="file" getValueFromEvent={(e) => normFile(e)}>
                        <Upload maxCount={1} listType="picture" beforeUpload={(file) => { setFile(file); return false; }}>
                            <Button icon={<UploadOutlined />}>Выбрать файл</Button>
                        </Upload>
                    </Form.Item>
                    <div className="flex justify-start gap-[30px]">
                        <Button onClick={handleCancel}>Отмена</Button>
                        <Button type="primary" htmlType="submit">Добавить</Button>
                    </div>
                </Form>
            </Modal>
        </>
    );
};

export default ModalForm;

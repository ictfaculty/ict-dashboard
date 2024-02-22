import React, { useState } from 'react';
import { Button, Form, Input, Modal, Switch } from 'antd';

import { PlusOutlined, UploadOutlined } from '@ant-design/icons';
import { message, Upload } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { useDispatch } from 'react-redux';
import { addNews } from '../../store/features/news/newsSlice';

const ModalForm = () => {
    const dispatch = useDispatch()

    const [isModalOpen, setIsModalOpen] = useState(true);
    const [form] = Form.useForm();

    const normFile = (e) => {
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
        dispatch(addNews(formValues))
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };


    return (
        <>
            <Modal className='modal' title="Добавить новости" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <Form
                    form={form}
                    className='py-3'
                >
                    <Form.Item name='title' label="Название">
                        <Input />
                    </Form.Item>
                    <Form.Item name='description' label="Описание">
                        <TextArea rows={6} />
                    </Form.Item>
                    <div className="flex justify-start gap-[30px]">
                        <Form.Item label="Фото" name="file" getValueFromEvent={normFile}>
                            <Upload maxCount={1} listType="picture-card">
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
                                        Загрузить
                                    </div>
                                </button>
                            </Upload>
                        </Form.Item>
                        <Form.Item label="Состояние" name="is_active">
                            <Switch
                                // defaultChecked
                            />
                        </Form.Item>
                    </div>
                </Form>
            </Modal>
        </>
    );
};

export default ModalForm;

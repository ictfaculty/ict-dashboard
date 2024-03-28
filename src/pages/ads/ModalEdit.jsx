import React, { useEffect, useState } from 'react';
import { Button, Form, Input, Modal, message, Upload } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { useDispatch, useSelector } from 'react-redux';
import { editNews } from '../../store/features/news/newsSlice';
import { editAds } from '../../store/features/ads/adsSlice';

const ModalEdit = () => {
    const adsInfo = useSelector(ads => ads.ads.adsObj)
    console.log(adsInfo);
    const dispatch = useDispatch();
    const [form] = Form.useForm();

    const [isModalOpen, setIsModalOpen] = useState(true);

    useEffect(() => {
        form.setFieldsValue({
            title: adsInfo.title,
            description: adsInfo.description,
        });
    }, [adsInfo, form]);

    const handleOk = () => {
        form.submit();
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const onFinish = (values) => {
        const formData = new FormData();
    
        formData.append('title', values.title);
        formData.append('description', values.description);
        formData.append('id', adsInfo.id);
    
        dispatch(editAds({ formData, id: adsInfo.id }));
        setIsModalOpen(false);
    };


    return (
        <Modal title="Редактировать новость" visible={isModalOpen} onOk={handleOk} onCancel={handleCancel} footer={null}>
            <Form form={form} onFinish={onFinish} className='py-3'>
                <Form.Item name='title' label="Название" rules={[{ required: true, message: 'Please enter the title' }]}>
                    <Input />
                </Form.Item>
                <Form.Item name='description' label="Описание" rules={[{ required: true, message: 'Please enter the description' }]}>
                    <TextArea rows={6} />
                </Form.Item>
                <div className="flex justify-start gap-[30px]">
                    <Button onClick={handleCancel}>Отмена</Button>
                    <Button type="default" htmlType="submit">Сохранить</Button>
                </div>
            </Form>
        </Modal>
    );
};

export default ModalEdit;

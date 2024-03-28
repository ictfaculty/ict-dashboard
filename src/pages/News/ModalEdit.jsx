import React, { useEffect, useState } from 'react';
import { Button, Form, Input, Modal, message, Upload } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { UploadOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { addNews, editNews } from '../../store/features/news/newsSlice';

const ModalEdit = () => {
    const newsInfo = useSelector(news => news.news.newsObj)
    console.log(newsInfo);
    const dispatch = useDispatch();
    const [form] = Form.useForm();

    const [fileList, setFileList] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(true);
    const [file, setFile] = useState(null);

    useEffect(() => {
        form.setFieldsValue({
            title: newsInfo.title,
            description: newsInfo.description,
        });


        if (newsInfo.image_url) {
            setFileList([{
                uid: '-1',
                name: 'image.png',
                status: 'done',
                url: newsInfo.image_url,
            }]);
        }
    }, [newsInfo, form]);

    const handleOk = () => {
        form.submit();
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const onFinish = (values) => {
        if (!fileList.length) {
            message.error('Please select an image file.');
            return;
        }
    
        const formData = new FormData();
        // Assuming you want to upload the first file in the list
        if (fileList[0].originFileObj) {
            formData.append('file', fileList[0].originFileObj);
        }
    
        formData.append('title', values.title);
        formData.append('description', values.description);
        // Assuming newsInfo.id contains the ID of the news being edited
        formData.append('id', newsInfo.id); // Make sure this is how your backend expects to receive the ID
    
        dispatch(editNews({ formData, id: newsInfo.id }));
        setIsModalOpen(false);
    };

    const normFile = (e) => {
        console.log('Upload event:', e);
        if (Array.isArray(e)) {
            return e;
        }
        return e && e.fileList;
    };

    const handleChange = ({ fileList: newFileList }) => {
        setFileList(newFileList);
        if (newFileList.length && newFileList[0].originFileObj) {
            setFile(newFileList[0].originFileObj);
        }
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
                <Form.Item label="Фото" name="file" valuePropName="fileList" getValueFromEvent={normFile}>
                    <Upload
                        listType="picture"
                        fileList={fileList}
                        beforeUpload={() => false} // Prevent automatic upload
                        onChange={handleChange}>
                        <Button icon={<UploadOutlined />}>Выбрать файл</Button>
                    </Upload>
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

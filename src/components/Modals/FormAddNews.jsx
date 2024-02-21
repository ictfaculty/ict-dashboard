import React from 'react'

const FormAddNews = () => {
    return (

        <Form className='py-3'>
            <Form.Item label="Название">
                <Input />
            </Form.Item>
            <Form.Item label="Описание">
                <TextArea rows={4} />
            </Form.Item>
            {/* <Upload {...props}>
                        <Button style={{ background: 'inherit' }} icon={<UploadOutlined />}>Click to Upload</Button>
                    </Upload> */}
            <Form.Item label="Фото" valuePropName="fileList" getValueFromEvent={normFile}>
                <Upload maxCount={1} action="/upload.do" listType="picture-card">
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
        </Form>

    )
}

export default FormAddNews
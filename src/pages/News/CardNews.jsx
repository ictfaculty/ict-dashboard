import React from 'react';
import { DeleteOutlined, EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import { Avatar, Card, Switch } from 'antd';
const { Meta } = Card;
const CardNews = (props) => (
    <Card
        style={{
            width: 300,
            marginBottom: '20px',
        }}
        cover={
            <img
                className='h-[190px] object-fill '
                alt="example"
                src={props.img}
            />
        }
        actions={[
            <DeleteOutlined
                key="delete"
                onClick={() =>props.onClickDelete()}
            />,
            <EditOutlined key="edit" />,
        ]}
    >
        <div className="max-h-[75px] overflow-auto">
            <Meta
                avatar={<Avatar src={props.img} />}
                title={props.title}
                description={props.description}
            />
        </div>
        <Switch
            value={props.isActive}
            size='small'
        />
    </Card>
);
export default CardNews;
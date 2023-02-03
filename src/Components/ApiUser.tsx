import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ColumnsType } from 'antd/es/table';
import { Space } from 'antd';
import CommonTable from '../Common/CommonTable';
import { DeleteOutlined } from '@ant-design/icons';
import ApiUserModal from './ApiUserModal';

interface DataTypes{
    key:string;
    age:any;
    createdAt?:any;
    firstName:string;
    lastName:string;
    phoneNumber:any;
    updatedAt?:any;
    viewDetails: string;
    delete: string;
}

const ApiUser = () => {
  const [dataApi, setData] = useState<any>([]);
  const [error, setError] = useState(null);
  const [isAddModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState<{
    isOpen: boolean;
    id: string;
  }>({ isOpen: false, id: "0" });


  const fetchData = async () => {
      
    try {
      const result = await axios.get('https://blue-journalist-bbrpv.ineuron.app:4000/users');
      setData(result.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

console.log(dataApi)

const columns: ColumnsType<DataTypes> = [
    {
      title: "First Name",
      dataIndex: "firstName",
      key: "firstName",
      render: (text) => <p>{text}</p>,
    },
    {
      title: "Last Name",
      dataIndex: "lastName",
      key: "lastName",
      render: (text) => <p>{text}</p>,
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
      render: (text) => <p>{text}</p>,
    },
    {
      title: "Phone Number",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
      render: (text) => <p>{text}</p>,
    },
    {
        title: "Created At",
        dataIndex: "createdAt",
        key: "createdAt",
        render:(text) => <p>{text}</p>
      },
    {
        title: "Updated At",
        dataIndex: "updatedAt",
        key: "updatedAt",
        render:(text) => <p>{text}</p>
      },
      {
        title: " ",
        key: "viewDetails",
        render: (_, { viewDetails }) => (
          <>
            <Space size="middle">
              <p
                style={{
                  color: "#4B62BA",
                  textDecoration: "underline",
                  cursor: "pointer",
                  margin: 0,
                }}
                onClick={() =>{
                  setIsEditModalOpen({ isOpen: true, id: viewDetails })
                  console.log(viewDetails)
                }}
              >
                View Details
              </p>
            </Space>
          </>
        ),
      },
    //   {
    //     title: " ",
    //     key: "delete",
    //     render: (_, { viewDetails }) => (
    //           <>
    //             <Space
    //               size="middle"
    //               style={{ cursor: "pointer", color: "#D62828" }}
    //             >
    //               {/* <DeleteOutlined onClick={() => onDelete(viewDetails)} /> */}
    //             </Space>
    //           </>
    //     ),
    //   },

]

const data:DataTypes[]=dataApi.map((data:any)=>{
    return{
        key:`${data._id}`,
        firstName:data?.firstName,
        lastName:data?.lastName,
        age:data?.age,
        phoneNumber:data?.phoneNumber,
        createdAt:data?.createdAt,
        updatedAt:data?.updatedAt,
        viewDetails: `${data._id}`,
        delete: `${data._id}`,
    }
})



  return (
    <>
    <CommonTable columns={columns} data={data} />
    <ApiUserModal
    open={isAddModalOpen}
    onClose={()=>setIsModalOpen(false)}
    modalTitle="Add new user"
    fetchData={fetchData}

    />
    <ApiUserModal
    open={isAddModalOpen}
    onClose={() => setIsEditModalOpen({ isOpen: false, id: "0" })}
    modalTitle="Add new user"
    isEditMode={true}
    id={isEditModalOpen.id}
    fetchData={fetchData}

    />
    </>
  );
};

export default ApiUser;

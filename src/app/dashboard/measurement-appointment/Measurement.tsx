'use client'
import { Modal, Table } from 'antd'
import { ColumnsType } from 'antd/es/table'
import Breadcrumb from 'components/Dashboard/Breadcrumbs/Breadcrumb'
import DefaultLayout from 'components/Dashboard/DefaultLayout'
import React, { useState } from 'react'
import { FaRegEye } from 'react-icons/fa'
import { IAppointment } from 'types/types'


const Measurement = ({ appointments , title }: { appointments: IAppointment[] , title: string }) => {
   const [isModalOpen, setIsModalOpen] = useState(false);
   const [selectedAppointment, setSelectedAppointment] = useState<IAppointment | null>(null);
   const sortedAppointments = [...appointments].sort((a, b) => {
   const dateA = new Date(a.preferredDate).getTime();
   const dateB = new Date(b.preferredDate).getTime();
   return dateB - dateA;
   });
   const showModal = (record: IAppointment) => {
      setSelectedAppointment(record);
      setIsModalOpen(true);
   };

   const handleCancel = () => {
      setIsModalOpen(false);
      setSelectedAppointment(null);
   };

   const columns: ColumnsType<IAppointment> = [
      {
         title: "Name",
         dataIndex: "firstname",
         key: "firstname",
         width: 200,
      },
      {
         title: "Email",
         dataIndex: "email",
         key: "email",
         width: 250,
      },
      {
         title: "Phone Number",
         dataIndex: "phoneNumber",
         key: "phoneNumber",
         width: 150,
      },
      {
         title: "Area",
         dataIndex: "area",
         key: "area",
         width: 200,
      },
      {
         title: "Approximate Area",
         dataIndex: "selectRooms",
         key: "selectRooms",
         width: 100,
      },
      {
         title: "Preferred Time",
         dataIndex: "preferredTime",
         key: "preferredTime",
         width: 120,
      },
      {
         title: "Preferred Date",
         dataIndex: "preferredDate",
         key: "preferredDate",
         width: 180,
         render: (date: string) => new Date(date).toLocaleDateString(),
      },
      {
         title: "View",
         dataIndex: "view",
         key: "view",
         width: 100,
         render: (_: unknown, record: IAppointment) => (
            <button onClick={() => showModal(record)}>
               <FaRegEye />
            </button>
         ),
      },
   ];
   return (
      <DefaultLayout>
         <Breadcrumb pageName={title} />
         {appointments && appointments.length > 0 ? (
            <>
               <Table
                  dataSource={sortedAppointments}
                  columns={columns}
                  rowKey="id"
                  pagination={false}
                  scroll={{ y: 500 }}
               />
               <Modal title="Appointment Details" open={isModalOpen} onCancel={handleCancel} footer={null}>
                  {selectedAppointment && (
                     <div className='space-y-3'>
                        <p><strong>Name:</strong> {selectedAppointment.firstname}</p>
                        <p><strong>Email:</strong> {selectedAppointment.email}</p>
                        <p><strong>Phone Number:</strong> {selectedAppointment.phoneNumber}</p>
                        <p><strong>WhatsApp Number:</strong> {selectedAppointment.whatsappNumber || "-"}</p>
                        <p><strong>Area:</strong> {selectedAppointment.area || "-"}</p>
                        <p><strong>Rooms:</strong> {selectedAppointment.selectRooms || "-"}</p>
                        <p><strong>Preferred Time:</strong> {selectedAppointment.preferredTime || "-"}</p>
                        <p><strong>Preferred Date:</strong> {selectedAppointment.preferredDate
                           ? new Date(selectedAppointment.preferredDate).toLocaleDateString()
                           : "-"}
                        </p>
                        <p><strong>Find Us:</strong> {selectedAppointment.findUs || "-"}</p>
                        <p><strong>Comment:</strong> {selectedAppointment.comment || "-"}</p>
                        <p>
                           <strong>Contact Method:</strong>{" "}
                           {selectedAppointment.contactMethod
                              ? Object.entries(selectedAppointment.contactMethod)
                                 .filter(([value]) => value)
                                 .map(([key]) => key.charAt(0).toUpperCase() + key.slice(1))
                                 .join(", ")
                              : "-"}
                        </p>
                     </div>
                  )}
               </Modal>
            </>
         ) : (
            <p className="text-primary dark:text-white">No products found</p>
         )}
      </DefaultLayout>
   )
}

export default Measurement
import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Input, Select, message, Tabs, Card, Tag, Spin } from 'antd';

const { TabPane } = Tabs;
const { Option } = Select;

const HostelManagement = () => {
  const [hostels, setHostels] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [bookingModalVisible, setBookingModalVisible] = useState(false);
  const [form] = Form.useForm();

  // Fetch data from API
  const fetchData = async () => {
    setLoading(true);
    try {
      const [hostelsResponse, roomsResponse] = await Promise.all([
        fetch('http://127.0.0.1:5000/api/hostels'),
        fetch('http://127.0.0.1:5000/api/rooms')
      ]);

      if (!hostelsResponse.ok || !roomsResponse.ok) {
        throw new Error('Failed to fetch data');
      }

      const hostelsData = await hostelsResponse.json();
      const roomsData = await roomsResponse.json();

      // Ensure we have arrays even if the response structure is different
      setHostels(Array.isArray(hostelsData?.hostels) ? hostelsData.hostels : []);
      setRooms(Array.isArray(roomsData?.rooms) ? roomsData.rooms : []);

    } catch (error) {
      message.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleBookingSubmit = async (values) => {
    try {
      const response = await fetch('http://127.0.0.1:5000/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error('Booking failed');
      }

      message.success('Booking created successfully');
      setBookingModalVisible(false);
      form.resetFields();
      fetchData(); // Refresh data
    } catch (error) {
      message.error(error.message);
    }
  };

  // Safe status renderer
  const renderStatus = (status) => {
    if (!status) return <Tag color="default">UNKNOWN</Tag>;
    
    const statusLower = status.toLowerCase();
    let color = 'default';
    
    if (statusLower === 'active' || statusLower === 'available') color = 'green';
    else if (statusLower === 'pending') color = 'orange';
    else if (statusLower === 'inactive' || statusLower === 'occupied') color = 'red';
    
    return (
      <Tag color={color}>
        {status?.toUpperCase?.() || 'UNKNOWN'}
      </Tag>
    );
  };

  // Table columns
  const hostelColumns = [
    { title: 'ID', dataIndex: 'id', key: 'id' },
    { title: 'Name', dataIndex: 'name', key: 'name' },
    { title: 'Location', dataIndex: 'location', key: 'location' },
    { 
      title: 'Status', 
      dataIndex: 'status', 
      key: 'status',
      render: renderStatus
    },
  ];

  const roomColumns = [
    { title: 'Room Number', dataIndex: 'room_number', key: 'room_number' },
    { 
      title: 'Hostel', 
      key: 'hostel',
      render: (_, record) => hostels.find(h => h.id === record.hostel_id)?.name || 'N/A'
    },
    { title: 'Capacity', dataIndex: 'capacity', key: 'capacity' },
    { 
      title: 'Status', 
      dataIndex: 'status', 
      key: 'status',
      render: renderStatus
    },
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Hostel Management</h1>
      
      <Tabs defaultActiveKey="hostels">
        <TabPane tab="Hostels" key="hostels">
          <Card 
            title="Hostel List" 
            extra={<Button type="primary">Add Hostel</Button>}
          >
            <Table 
              columns={hostelColumns} 
              dataSource={hostels}
              rowKey="id"
              loading={loading}
              locale={{
                emptyText: loading ? <Spin /> : 'No hostels found'
              }}
            />
          </Card>
        </TabPane>

        <TabPane tab="Rooms" key="rooms">
          <Card 
            title="Room Management"
            extra={<Button type="primary">Add Room</Button>}
          >
            <Table 
              columns={roomColumns} 
              dataSource={rooms}
              rowKey="id"
              loading={loading}
              locale={{
                emptyText: loading ? <Spin /> : 'No rooms found'
              }}
            />
          </Card>
        </TabPane>

        <TabPane tab="Bookings" key="bookings">
          <Card 
            title="Booking Management"
            extra={
              <Button 
                type="primary" 
                onClick={() => setBookingModalVisible(true)}
              >
                Create Booking
              </Button>
            }
          >
            <Table 
              columns={[
                { title: 'Student ID', dataIndex: 'student_id', key: 'student_id' },
                { title: 'Room', dataIndex: 'room_id', key: 'room_id' },
                { 
                  title: 'Status', 
                  dataIndex: 'status', 
                  key: 'status',
                  render: renderStatus
                },
              ]}
              dataSource={[]} // Empty until you implement bookings
              rowKey="id"
              loading={loading}
              locale={{
                emptyText: loading ? <Spin /> : 'No bookings found'
              }}
            />
          </Card>
        </TabPane>
      </Tabs>

      {/* Booking Modal */}
      <Modal
        title="Create Booking"
        visible={bookingModalVisible}
        onCancel={() => setBookingModalVisible(false)}
        onOk={() => form.submit()}
      >
        <Form form={form} layout="vertical" onFinish={handleBookingSubmit}>
          <Form.Item name="student_id" label="Student ID" rules={[{ required: true }]}>
            <Input />
          </Form.Item>

          <Form.Item name="hostel_id" label="Hostel" rules={[{ required: true }]}>
            <Select placeholder="Select hostel">
              {hostels.map(hostel => (
                <Option key={hostel.id} value={hostel.id}>
                  {hostel.name}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item name="room_id" label="Room" rules={[{ required: true }]}>
            <Select placeholder="Select room">
              {rooms.map(room => (
                <Option key={room.id} value={room.id}>
                  {room.room_number} (Capacity: {room.capacity})
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default HostelManagement;
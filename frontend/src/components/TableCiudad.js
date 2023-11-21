import React, { useEffect, useState } from 'react'
import axios from 'axios';
import baseUrl from '../utils/baseUrl';
import { Button, Col, ConfigProvider, Form, Input, Modal, Popconfirm, Row, Select, Table, Tooltip, message } from 'antd';
import { 
	EyeOutlined, DeleteOutlined, SmileOutlined, EditOutlined, FileDoneOutlined,CheckOutlined
} from '@ant-design/icons';
const { Option } = Select;


const TableCiudad = ({pais, ciudad, setCiudad}) => {

    //Variables de editar Ciudad
    const [ciudadEdit, setCiudadEdit] = useState(false);
    const [ciudadEditData, setCiudadEditData] = useState([]);

    //Variables de ver Ciudad
    const [ciudadOne, setCiudadOne] = useState({})
    const [ciudadVer, setCiudadVer] = useState(false)

    //Variables de crear Ciudad
    const [ciudadCrear, setCiudadCrear] = useState({})
    const [ciudadCrearVer, setCiudadCrearVer] = useState(false)


    const getCiudad = async() =>{
        try {
            const url = `${baseUrl}/api/ciudades/`
            const response = await axios.get(url)
            setCiudad(response.data)
        } catch (error) {
            console.log(error);
        }
    }

    //Columns Table
    const columns = [
        {
          title: 'Name',
          dataIndex: 'name',
          key: 'name',
          width: 500,
        },
        {
          title: 'País',
          dataIndex: 'pais_id',
          key: 'pais_id',
          render: (pais_id) => pais_id?.name ==  null ? `No se encontro el pais` : pais_id?.name ,
          width: 500,
        },
        {
            title: 'Opciones',
            width: 500,
            render: (record) => {
              return (
                <>
                <Tooltip title="Ver Ciudad">
                                <Button 
                    type="primary" 
                    className="shadow-sm mr-2" 
                    icon={<EyeOutlined />} 
                    onClick={ () => ShowCiudad(record) } 
                />
                </Tooltip>
                  <Tooltip title="Editar Ciudad">
                                  <Button 
                      type="" 
                      className="bg-success shadow-sm mr-2" 
                      icon={<EditOutlined />} 
                      onClick={ () => EditCiudad(record) }  
                      style={{  color: '#000'}}
                    />
                  </Tooltip>
                  <Tooltip title="Eliminar Ciudad">
                    <Popconfirm 
                      placement="bottom" 
                      title={"¿Desea eliminar la ciudad?"} 
                      onConfirm={ () => EliminarCiudad(record)} 
                      okText="Si, eliminar" 
                      cancelText="No" >
                      <Button type="" className="shadow-sm bg-danger mr-2" icon={<DeleteOutlined style={{  color: '#fff'}} />} />
                    </Popconfirm>
                  </Tooltip>
                 
                </>
              );
            }
            
          }
    ];


    //Editar Ciudad

    const EditCiudad = async(record) => {
        setCiudadEdit(true)
        setCiudadEditData({...record})
        
    }

    const handleCancel = () => {
        setCiudadEdit(false);
        setCiudadEditData([])
    };

    const handleChange = (e) => {
        setCiudadEditData( (pre) => {
          return { ...pre, pais_id: e}
        })
    }

    const formSuccess = async() => {
        try {
            const {uid, 
                name,
                pais_id,
            } = ciudadEditData;
            const url = `${baseUrl}/api/ciudades/actualizarciudad/${uid}`
            const response = await axios.put(url,{name,pais_id})
            setCiudadEditData([])
            message.success({ content: 'Se actualizo la información de la ciudad', duration: 5,
                style: { marginTop: '60px' },
            });
            setCiudadEdit(false);
            getCiudad()
        } catch (error) {
            console.log(error);
        }
    }

    const customizeRenderEmpty = () => (
        <div style={{ textAlign: 'center' }}>
          <SmileOutlined style={{ fontSize: 20 }} />
          <p>No se ha encontrado ningún pais</p>
        </div>
    );


    // Ver Ciudad
    const ShowCiudad = async (record) => {
        setCiudadVer(true)
        setCiudadOne({...record})
    }

    const handleCancelShowCiudad = () => {
        setCiudadVer(false);
        setCiudadOne({})
    };

    //Eliminar Ciudad

    const EliminarCiudad = async (record) => {
        try {
            const url = `${baseUrl}/api/ciudades/borrarciudad/${record.uid}`;
            await axios.delete(url)
            message.success({ content: 'Se elimino la ciudad correctamente', duration: 5,
              style: { marginTop: '60px' },
            });
            getCiudad()
          } catch (error) {
            console.error("Error: ", {error});
            message.error('Error, por favor intentelo de nuevo', 4);
          }
    }

    //Crear Ciudad
    const CrearCiudad = async (data) => {
        try {
            const {
                name,
                pais_id,
            } = data;
            const url = `${baseUrl}/api/ciudades/crearciudad`
            const response = await axios.post(url,{name,pais_id})
            setCiudadCrear({})
            message.success({ content: 'Se agrego la información de la ciudad', duration: 5,
                style: { marginTop: '60px' },
            });
            setCiudadCrearVer(false);
            getCiudad()
        } catch (error) {
            console.error("Error: ", {error});
            message.error('Error, por favor intentelo de nuevo', 4);
        }
    }

    const handleCancelShowCiudadPost = () => {
        setCiudadCrearVer(false);
        setCiudadCrear({})
    };

    const ShowCiudadPost = () => {
        setCiudadCrearVer(true);
    };


  return (
    <>
        <Row>
            <Col xs={12} sm={12} md={12} lg={12}>
            <h1 className="">Tabla de Ciudades</h1>
            </Col>

            <Col xs={12} sm={12} md={12} lg={12}>
                <Button class="btn-primary btn-lg" onClick={() => ShowCiudadPost()}>Crear Ciudad</Button>
            </Col>
       </Row>
        <Row gutter={16} type="flex">
            <Col sm={24} md={24} lg={24}>
                <Table dataSource={ciudad} columns={columns} />
            </Col>
        </Row>

        {/* Editar Ciudad */}
        {
            ciudadEdit !== false ?
                <>
                    <Modal title="Editar Ciudad" 
                        open={ciudadEdit}
                        onCancel={handleCancel}
                        style={{ minWidth: '80%'}}
                        footer={null}
                    >
                        <Form 
                            id='miformulario'
                            layout="vertical" 
                            onFinish={formSuccess}
                        >
                            <Col xs={0} sm={0} md={0} lg={0} xl={0}>
                            <Form.Item 
                                    name="uid" 
                                    label="uid" 
                                    initialValue={ciudadEditData?.uid}
                                    hasFeedback
                                >
                                <Input />
                            </Form.Item>
                            </Col>
                            <Row className='mt-3'>
                                <Col xs={11} sm={11} md={11} lg={11} xl={11}>
                                <ConfigProvider renderEmpty={customizeRenderEmpty}>
                                    <Form.Item
                                        name='pais_id'
                                        label='Seleccione Pais'
                                        hasFeedback
                                        >
                                    <Select
                                        value={ciudadEditData.pais_id.name} 
                                        placeholder="Paises"
                                        optionFilterProp="children"
                                        onChange={handleChange}
                                    >
                                        {
                                            pais ?
                                            pais.map( (pais)=>(
                                                <Option key={pais.uid} value={pais.uid} > 
                                                    {pais.name} 
                                                </Option>
                                            ))
                                            : 'No hay productos'
                                        }
                                    </Select>
                                    <Input size='small' style={{display: 'none'} } /> 
                                    </Form.Item>
                                </ConfigProvider>
                                </Col>
                            </Row>
                            <Row className='mt-3'>
                                <Col xs={11} sm={11} md={11} lg={11} xl={11}>
                                    <Form.Item
                                        name='name'
                                        label='Cambiar Nombre'
                                        hasFeedback
                                    >
                                        <Input size='small' value={ciudadEditData.name} 
                                            onChange={ (e) => {
                                                setCiudadEditData( (pre) => {
                                                return { ...pre, name: e.target.value}
                                            })
                                            }}/> 
                                        <Input size='small' style={{display: 'none'} } /> 
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row className='mt-3'>
                                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                    <Form.Item>
                                        <Button htmlType="submit" block
                                        //  loading={loading}
                                            style={{ backgroundColor: '#137689', color: '#fff'}}>
                                            Actualizar
                                        </Button>
                                    </Form.Item>
                                </Col>
                            </Row>
                        </Form>
                    </Modal>
                </>
            : null
        }

        {/* Ver Ciudad */}
        {
            ciudadVer !== false ?
                <>
                    <Modal title="Ver Ciudad" 
                        open={ciudadVer}
                        onCancel={handleCancelShowCiudad}
                        style={{ minWidth: '80%'}}
                        footer={null}
                    >
                        <h3>{`Nombre del Pais: ${ciudadOne?.pais_id?.name}`}</h3>
                        <br></br>
                        <h3>{`Nombre del Ciudad: ${ciudadOne?.name}`}</h3>
                    </Modal>
                </>
            : null
        }

        {/* Crear Ciudades */}

        {
            ciudadCrearVer !== false ? 
                <>
                    <Modal title="Crear Ciudad" 
                        open={ciudadCrearVer}
                        onCancel={handleCancelShowCiudadPost}
                        style={{ minWidth: '80%'}}
                        footer={null}
                    >
                        <Form 
                            id='miformulario'
                            layout="vertical" 
                            onFinish={CrearCiudad}
                        >
                            <Row className='mt-3'>
                                <Col xs={11} sm={11} md={11} lg={11} xl={11}>
                                <ConfigProvider renderEmpty={customizeRenderEmpty}>
                                    <Form.Item
                                        name='pais_id'
                                        label='Seleccione Pais'
                                        hasFeedback
                                        >
                                        <Select
                                            placeholder="Paises"
                                            optionFilterProp="children"
                                        >
                                            {
                                                pais ?
                                                pais.map( (pais)=>(
                                                    <Option key={pais.id} value={pais.uid} > 
                                                        {pais.name} 
                                                    </Option>
                                                ))
                                                : 'No hay productos'
                                            }
                                        </Select>
                                    </Form.Item>
                                </ConfigProvider>
                                </Col>
                            </Row>
                            <Row className='mt-3'>
                                <Col xs={11} sm={11} md={11} lg={11} xl={11}>
                                    <Form.Item
                                        name='name'
                                        label='Nombre de la Ciudad'
                                        hasFeedback
                                    >
                                        <Input size='small' /> 
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row className='mt-3'>
                                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                    <Form.Item>
                                        <Button htmlType="submit" block
                                            style={{ backgroundColor: '#137689', color: '#fff'}}>
                                            Agregar
                                        </Button>
                                    </Form.Item>
                                </Col>
                            </Row>
                        </Form>
                    </Modal>
                </>
            : null
        }

    </>
    
  )
}

export default TableCiudad
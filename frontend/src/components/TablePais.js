import React, { useEffect, useState } from 'react'
import baseUrl from '../utils/baseUrl'
import axios from 'axios'
import { Button, Col, Form, Input, Modal, Popconfirm, Row, Table, Tooltip, message } from 'antd';
import { DeleteOutlined, EditOutlined, EyeOutlined } from '@ant-design/icons';

const TablePais = ({pais,SetPais }) => {

    //Variables de crear Pais
    const [PaisCrear, setPaisCrear] = useState({})
    const [PaisCrearVer, setPaisCrearVer] = useState(false)

    //Variables de ver Ciudad
    const [PaisOne, setPaisOne] = useState({})
    const [PaisVer, setPaisVer] = useState(false)
    
    //Variables de editar Pais
    const [PaisEdit, setPaisEdit] = useState(false);
    const [PaisEditData, setPaisEditData] = useState([]);

    //Funcion para ver todo los Paises
    const getPais = async() => {
        try {
            const url = `${baseUrl}/api/paises/`
            const response = await axios.get(url)
            SetPais(response.data)
        } catch (error) {
            console.log(error);
        }
    }

    //Crear Ciudad
    const CrearPais = async (data) => {
        try {
            const {
                name,
                capital,
            } = data;
            const url = `${baseUrl}/api/paises/crearpais`
            const response = await axios.post(url,{name,capital})
            setPaisCrear({})
            message.success({ content: 'Se agrego la información del pais', duration: 5,
                style: { marginTop: '60px' },
            });
            setPaisCrearVer(false);
            getPais()
        } catch (error) {
            console.error("Error: ", {error});
            message.error('Error, por favor intentelo de nuevo', 4);
        }
    }

    const handleCancelShowPaisPost = () => {
        setPaisCrearVer(false);
        setPaisCrear({})
    };

    const ShowPaisPost = () => {
        setPaisCrearVer(true);
    };

    // Ver Ciudad
    const ShowPais = async (record) => {
        setPaisVer(true)
        setPaisOne({...record})
    }

    const handleCancelShowPais = () => {
        setPaisVer(false);
        setPaisOne({})
    };

    //Editar Ciudad

    const EditPais = async(record) => {
        setPaisEdit(true)
        setPaisEditData({...record})
        
    }

    const handleCancel = () => {
        setPaisEdit(false);
        setPaisEditData([])
    };

    const formSuccess = async() => {
        try {
            const {uid, 
                name,
                capital,
            } = PaisEditData;

            console.log(name, capital);
            const url = `${baseUrl}/api/paises/actualizarpais/${uid}`
            const response = await axios.put(url,{name,capital})
            setPaisEditData([])
            message.success({ content: 'Se actualizo la información del pais', duration: 5,
                style: { marginTop: '60px' },
            });
            setPaisEdit(false);
            getPais()
        } catch (error) {
            console.log(error);
        }
    }
    
    //Eliminar Pais

    const EliminarPais = async (record) => {
        try {
            const url = `${baseUrl}/api/paises/borrarpais/${record.uid}`;
            await axios.delete(url)
            message.success({ content: 'Se elimino la pais correctamente', duration: 5,
              style: { marginTop: '60px' },
            });
            getPais()
          } catch (error) {
            console.error("Error: ", {error});
            message.error('Error, por favor intentelo de nuevo', 4);
          }
    }


    const columns = [
        {
          title: 'Name',
          dataIndex: 'name',
          key: 'name',
          width: 500,
        },
        {
          title: 'Capital',
          dataIndex: 'capital',
          key: 'capital',
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
                    onClick={ () => ShowPais(record) } 
                />
                </Tooltip>
                <Tooltip title="Editar Ciudad">
                                  <Button 
                      type="" 
                      className="bg-success shadow-sm mr-2" 
                      icon={<EditOutlined />} 
                      onClick={ () => EditPais(record) }  
                      style={{  color: '#000'}}
                    />
                </Tooltip>
                <Tooltip title="Eliminar Pais">
                    <Popconfirm 
                      placement="bottom" 
                      title={"¿Desea eliminar la Pais?"} 
                      onConfirm={ () => EliminarPais(record)} 
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

  return (
    <>
        <Row>
            <Col xs={12} sm={12} md={12} lg={12}>
            <h1 className="">Tabla de Paises</h1>
            </Col>

            <Col xs={12} sm={12} md={12} lg={12}>
                <Button class="btn-primary btn-lg" onClick={() => ShowPaisPost()}>Crear Ciudad</Button>
            </Col>
       </Row>
        <Row gutter={16} type="flex">
            <Col sm={24} md={24} lg={24}>
                <Table dataSource={pais} columns={columns} />
            </Col>
        </Row>

        {/* Crear Ciudades */}

        {
            PaisCrearVer !== false ? 
                <>
                    <Modal title="Crear Pais" 
                        open={PaisCrearVer}
                        onCancel={handleCancelShowPaisPost}
                        style={{ minWidth: '80%'}}
                        footer={null}
                    >
                        <Form 
                            id='miformulario'
                            layout="vertical" 
                            onFinish={CrearPais}
                        >
                            <Row className='mt-3'>
                                <Col xs={11} sm={11} md={11} lg={11} xl={11}>
                                    <Form.Item
                                        name='name'
                                        label='Nombre de la Pais'
                                        hasFeedback
                                    >
                                        <Input /> 
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row className='mt-3'>
                                <Col xs={11} sm={11} md={11} lg={11} xl={11}>
                                    <Form.Item
                                        name='capital'
                                        label='Nombre de la Capital'
                                        hasFeedback
                                    >
                                        <Input /> 
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

        {/* Ver Ciudad */}
        {
            PaisVer !== false ?
                <>
                    <Modal title="Ver Ciudad" 
                        open={PaisVer}
                        onCancel={handleCancelShowPais}
                        style={{ minWidth: '80%'}}
                        footer={null}
                    >
                        <h3>{`Nombre del Pais: ${PaisOne?.name}`}</h3>
                        <br></br>
                        <h3>{`Nombre del Capital: ${PaisOne?.capital}`}</h3>
                    </Modal>
                </>
            : null
        }

                {/* Editar Ciudad */}
        {
            PaisEdit !== false ?
                <>
                    <Modal title="Actualizar Pais" 
                        open={PaisEdit}
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
                                        initialValue={PaisEditData?.uid}
                                        hasFeedback
                                    >
                                    <Input />
                                </Form.Item>
                            </Col>
                            <Row className='mt-3'>
                                <Col xs={11} sm={11} md={11} lg={11} xl={11}>
                                    <Form.Item 
                                        name='name'
                                        label='Nombre del Pais'
                                        hasFeedback
                                    >
                                        <Input size='small' value={PaisEditData.name}
                                            onChange={ (e) => {
                                                setPaisEditData( (pre) => {
                                                return { ...pre, name: e.target.value}
                                            })
                                            }}
                                        /> 
                                        <Input size='small' style={{display: 'none'} } /> 
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row className='mt-3'>
                                <Col xs={11} sm={11} md={11} lg={11} xl={11}>
                                    <Form.Item
                                        name='capital'
                                        label='Nombre de la Capital'
                                        hasFeedback
                                    >
                                        <Input size='small' value={PaisEditData.capital}
                                            onChange={ (e) => {
                                                setPaisEditData( (pre) => {
                                                return { ...pre, capital: e.target.value}
                                            })
                                            }}
                                        /> 
                                        <Input size='small' style={{display: 'none'} } /> 
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row className='mt-3'>
                                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                    <Form.Item>
                                        <Button htmlType="submit" block
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
    </>
  )
}

export default TablePais
import './App.css';
import { useState, useEffect } from "react";
import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.css';
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit';
import filterFactory, { selectFilter } from 'react-bootstrap-table2-filter';
import Dropdown from 'react-bootstrap/Dropdown';


const fetchList = async () => {
  const [list, fields] = await Promise.all([
    fetch("https://b24-lf4tii.bitrix24.com/rest/1/ftwm235sbmtt10wo/crm.lead.list.json"),
    fetch("https://b24-lf4tii.bitrix24.com/rest/1/ftwm235sbmtt10wo/crm.lead.fields.json"),
  ]);
  const listJson = await list.json();
  const fieldsJson = await fields.json();
  return { list: listJson.result, fields: fieldsJson.result };
}

const fetchItem = async (id) => {
  const res = await fetch(`https://b24-lf4tii.bitrix24.com/rest/1/ftwm235sbmtt10wo/crm.lead.get.json?ID=${id}`);
  const json = await res.json();
  return json.result;
}

const getFieldValueLabel = (item, key, fields) => {
  return fields[key].items.find(i => i.ID == item[key]).VALUE;
}

const EDUCATION_FIELD_KEY = 'UF_CRM_1661669458993';
const GENDER_FIELD_KEY = 'UF_CRM_1661669651915';

function App() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchList().then(({ list, fields }) => {
      // work on list
      for (let i = 0; i < list.length; i++) {
        fetchItem(list[i].ID).then(item => {
          setProducts(oldValue => [...oldValue, {
            id: item.ID,
            name: item.NAME,
            email: item.EMAIL[0].VALUE,
            company: item.COMPANY_TITLE,
            phone: item.PHONE[0].VALUE,
            birthdate: new Date(item.BIRTHDATE).toLocaleDateString('en-GB'),
            position: item.POST,
            currency: item.CURRENCY_ID,
            status: item.STATUS_ID,
            education: getFieldValueLabel(item, EDUCATION_FIELD_KEY, fields),
            gender: getFieldValueLabel(item, GENDER_FIELD_KEY, fields),
          }])
        })
      }
    });
  }, [fetchList]);

  const additionalColumns = {
    birthdate: 'Birth Date',
    position: 'Position',
    currency: 'Currency',
    status: 'Status',
    education: 'Education',
    gender: 'Gender',
  };

  const columns = [
    { dataField: 'name', text: 'Name', sort: true },
    { dataField: 'email', text: 'Email', sort: true },
    { dataField: 'company', text: 'Company', sort: true },
    { dataField: 'phone', text: 'Phone', sort: true },
    {
      dataField: 'action',
      text: 'Action',
      formatter: (_, row) => {
        return (
          <Dropdown>
            <Dropdown.Toggle>
              More Info
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {Object.keys(additionalColumns).map(key => (
                <Dropdown.Item key={key}>
                  <b>{additionalColumns[key]}</b>: {row[key]}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
        )
      },
    },
  ];

  const defaultSorted = [{
    dataField: 'name',
    order: 'desc'
  }];

  const pagination = paginationFactory({
    page: 1,
    sizePerPage: 4,
    lastPageText: '>>',
    firstPageText: '<<',
    nextPageText: '>',
    prePageText: '<',
    showTotal: true,
    alwaysShowAllBtns: true,
    sizePerPageList: [
      { text: '4', value: 4 },
      { text: '10', value: 10 },
      { text: 'All', value: products.length },
    ],
  });

  const { SearchBar, ClearSearchButton } = Search;

  return (
    <div className="App main-wrapper d-flex align-middle justify-items-center ">
      <div className="card mx-auto ">
        <h1>Genesis System Group</h1>
        <ToolkitProvider
          bootstrap4
          keyField='id'
          data={products}
          columns={columns}
          search>
          {
            props => (
              <div className="container">
                <div className="row justify-content-between align-items-end">
                  <div className="col-4 ">
                    <div className="col flex-fill bd-highlight">
                      <SearchBar {...props.searchProps} />
                      <ClearSearchButton {...props.searchProps} />
                    </div>
                  </div>
                </div>
                <hr />
                <BootstrapTable
                  defaultSorted={defaultSorted}
                  pagination={pagination}
                  {...props.baseProps}
                  filter={filterFactory()}
                  classes="table table-hover"
                />
              </div>
            )
          }
        </ToolkitProvider>
      </div >
    </div >
  );
}

export default App;

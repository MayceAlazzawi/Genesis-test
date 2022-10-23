import React from 'react'
import { useState } from 'react'
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
const Table = ({ data }) => {
  // console.log(data.result)  // shows 24 object
  const [lead, setLead] = useState()
  let newData = data.result;
  let ID;
  const { SearchBar, ClearSearchButton } = Search;
  const getting2 = async () => {
    await fetch(`https://b24-lf4tii.bitrix24.com/rest/1/ftwm235sbmtt10wo/crm.lead.get.json?ID=10`)
      .then(res => res.json())
      .then(result => {
        setLead(result)
        console.log(result);
      });
  }
  const gettingID = async () => {
    console.log(newData)
    if (typeof data.main !== "undefined") {
      for (let i = 0; i < newData.length; i++) {
        ID = newData[i].ID;
        console.log(ID)
        console.log("HEllo")
        // getting2(ID)
      }
    } else {
      console.log("hh")
    }
  }
  gettingID()

  return (
    <div>
      <table id="dtBasicExample" class="table table-striped flex  table-bordered table-sm" cellspacing="0" width="100%">
        <thead>
          <tr>
            <th class="th-sm">
              ID
            </th>
            <th class="th-sm">
              Full Name
            </th>
            <th class="th-sm">
              Phone
            </th>
            <th class="th-sm">
              Email
            </th>
            <th class="th-sm">
              Company
            </th>
            <th class="th-sm">
              action
            </th>
          </tr>
        </thead>
      </table>
    </div>
  )
}

export default Table